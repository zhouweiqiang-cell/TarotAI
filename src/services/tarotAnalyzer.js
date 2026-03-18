import { getTexts } from './i18n';

// ═══════════════════════════════════════════
// Cloudflare Worker proxy — Gemini key 存在 Worker 里，源码不含任何 key
// ═══════════════════════════════════════════
const WORKER_URL = 'https://tarot-proxy.zhouweiqiang.workers.dev/';

const API_KEYS = {
  qwen: 'YOUR_DASHSCOPE_API_KEY',
  glm:  'YOUR_ZHIPUAI_API_KEY',
};

// ═══════════════════════════════════════════
// Provider routing
// ═══════════════════════════════════════════
function getProvider(model) {
  if (model.startsWith('qwen')) return 'qwen';
  if (model.startsWith('glm'))  return 'glm';
  return 'gemini';
}

// ═══════════════════════════════════════════
// Gemini — 全部走 Worker
// ═══════════════════════════════════════════
function getGeminiUrl(model, stream) {
  return `${WORKER_URL}?model=${model}&stream=${stream}`;
}

function buildGeminiBody(prompt) {
  return {
    contents: [{ parts: [{ text: prompt }] }],
  };
}

// ═══════════════════════════════════════════
// OpenAI-compatible (Qwen / GLM)
// ═══════════════════════════════════════════
const OPENAI_ENDPOINTS = {
  qwen: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
  glm:  'https://open.bigmodel.cn/api/paas/v4/chat/completions',
};

function buildOpenAIBody(prompt, model, stream) {
  return {
    model,
    stream,
    messages: [{ role: 'user', content: prompt }],
  };
}

function getOpenAIHeaders(provider) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEYS[provider]}`,
  };
}

// ═══════════════════════════════════════════
// Parsing
// ═══════════════════════════════════════════
function cleanAndParse(text) {
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(clean);
}

function processGeminiSSE(buffer) {
  const lines = buffer.split('\n');
  const remaining = lines.pop() || '';
  let newText = '';
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    const jsonStr = line.slice(6).trim();
    if (!jsonStr || jsonStr === '[DONE]') continue;
    try {
      const chunk = JSON.parse(jsonStr);
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (parts) for (const p of parts) { if (p.text && !p.thought) newText += p.text; }
    } catch {}
  }
  return { remaining, newText };
}

function processOpenAISSE(buffer) {
  const lines = buffer.split('\n');
  const remaining = lines.pop() || '';
  let newText = '';
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    const jsonStr = line.slice(6).trim();
    if (!jsonStr || jsonStr === '[DONE]') continue;
    try {
      const delta = JSON.parse(jsonStr).choices?.[0]?.delta?.content;
      if (delta) newText += delta;
    } catch {}
  }
  return { remaining, newText };
}

// ═══════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════

/**
 * @param {Array} cards  - [{ card, isReversed, position }]
 * @param {string} question
 * @param {string} model
 * @param {string} lang
 * @param {string} style - 'mystical' | 'psychological' | 'practical'
 * @param {Function} onText - streaming callback
 * @param {string} tone - 'formal' | 'friendly' | 'humorous' | 'blunt' | 'gentle'
 */
export function analyzeSpreadStream(cards, question, model, lang, style, onText, tone) {
  const t = getTexts(lang);
  const prompt = t.buildPrompt(question, cards, style, tone);
  const provider = getProvider(model);
  return provider === 'gemini'
    ? geminiStream(prompt, model, onText)
    : openaiStream(prompt, model, provider, onText);
}

export async function analyzeSpread(cards, question, model, lang, style, tone) {
  const t = getTexts(lang);
  const prompt = t.buildPrompt(question, cards, style, tone);
  const provider = getProvider(model);
  return provider === 'gemini'
    ? geminiNonStream(prompt, model)
    : openaiNonStream(prompt, model, provider);
}

// ─── Gemini stream ───
function geminiStream(prompt, model, onText) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', getGeminiUrl(model, true));
    xhr.setRequestHeader('Content-Type', 'application/json');
    let fullText = '', buffer = '', lastLen = 0;

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 3 || xhr.readyState === 4) {
        buffer += xhr.responseText.slice(lastLen);
        lastLen = xhr.responseText.length;
        const { remaining, newText } = processGeminiSSE(buffer);
        buffer = remaining;
        if (newText) { fullText += newText; onText(fullText); }
      }
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) { reject(new Error(`API 请求失败 (${xhr.status})`)); return; }
        const { newText } = processGeminiSSE(buffer + '\n');
        if (newText) fullText += newText;
        if (!fullText) { reject(new Error('API 返回数据为空')); return; }
        try { resolve(cleanAndParse(fullText)); } catch { reject(new Error('返回数据格式错误')); }
      }
    };
    xhr.onerror = () => reject(new Error('网络请求失败'));
    xhr.send(JSON.stringify(buildGeminiBody(prompt)));
  });
}

// ─── OpenAI stream ───
function openaiStream(prompt, model, provider, onText) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', OPENAI_ENDPOINTS[provider]);
    for (const [k, v] of Object.entries(getOpenAIHeaders(provider))) xhr.setRequestHeader(k, v);
    let fullText = '', buffer = '', lastLen = 0;

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 3 || xhr.readyState === 4) {
        buffer += xhr.responseText.slice(lastLen);
        lastLen = xhr.responseText.length;
        const { remaining, newText } = processOpenAISSE(buffer);
        buffer = remaining;
        if (newText) { fullText += newText; onText(fullText); }
      }
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) { reject(new Error(`API 请求失败 (${xhr.status})`)); return; }
        const { newText } = processOpenAISSE(buffer + '\n');
        if (newText) fullText += newText;
        if (!fullText) { reject(new Error('API 返回数据为空')); return; }
        try { resolve(cleanAndParse(fullText)); } catch { reject(new Error('返回数据格式错误')); }
      }
    };
    xhr.onerror = () => reject(new Error('网络请求失败'));
    xhr.send(JSON.stringify(buildOpenAIBody(prompt, model, true)));
  });
}

// ─── Gemini non-stream ───
async function geminiNonStream(prompt, model) {
  const res = await fetch(getGeminiUrl(model, false), {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildGeminiBody(prompt)),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'API 请求失败');
  const text = data.candidates?.[0]?.content?.parts?.find(p => p.text && !p.thought)?.text;
  if (!text) throw new Error('API 返回数据为空');
  return cleanAndParse(text);
}

// ─── OpenAI non-stream ───
async function openaiNonStream(prompt, model, provider) {
  const res = await fetch(OPENAI_ENDPOINTS[provider], {
    method: 'POST', headers: getOpenAIHeaders(provider),
    body: JSON.stringify(buildOpenAIBody(prompt, model, false)),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'API 请求失败');
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('API 返回数据为空');
  return cleanAndParse(text);
}
