// Shared streaming JSON text extractor
// Extracts readable text from partial Gemini streaming JSON responses

const FIELDS = ['reading', 'overallMessage', 'connections', 'narrative', 'advice', 'caution'];

export function extractStreamingReadable(text, fallback = '星象正在汇聚...') {
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const parts = [];

  for (const field of FIELDS) {
    if (field === 'reading') {
      // "reading" can appear multiple times (one per card)
      const readings = [...clean.matchAll(new RegExp(`"${field}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 'g'))];
      readings.forEach(m => parts.push(m[1]));
      const partial = clean.match(new RegExp(`"${field}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)$`));
      if (partial) parts.push(partial[1] + '...');
    } else {
      const full = clean.match(new RegExp(`"${field}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
      if (full) { parts.push(full[1]); continue; }
      const partial = clean.match(new RegExp(`"${field}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)$`));
      if (partial) parts.push(partial[1] + '...');
    }
  }

  return parts.join('\n\n').replace(/\\n/g, '\n').replace(/\\"/g, '"') || fallback;
}
