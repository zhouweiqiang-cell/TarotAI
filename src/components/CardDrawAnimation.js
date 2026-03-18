import React, { useRef, useEffect, useState, useMemo } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import TarotCardImage from './TarotCardImage';

const CARD_W = 100;
const CARD_H = 160;
const STACK_COUNT = 7;

/**
 * CardDrawAnimation — full draw ceremony
 * 1. Stack of face-down cards shuffle around
 * 2. One card draws up from the stack (face down)
 * 3. Card flips to reveal
 * 4. Card lands on the table with a bounce
 */
export default function CardDrawAnimation({ card, isReversed, onComplete, theme }) {
  const [phase, setPhase] = useState('shuffle');

  // Shuffle anims for each card in the stack
  const shuffleAnims = useRef(
    Array.from({ length: STACK_COUNT }, () => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      rotate: new Animated.Value(0),
    }))
  ).current;

  // Stack fade out when transitioning to draw
  const stackOpacity = useRef(new Animated.Value(1)).current;

  // The chosen card animations
  const chosenY = useRef(new Animated.Value(0)).current;
  const chosenScale = useRef(new Animated.Value(0.9)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;
  const landScale = useRef(new Animated.Value(1.15)).current;
  const landRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    runAnimation();
  }, []);

  async function runAnimation() {
    // ── Phase 1: Shuffle — face-up cards fan out and regroup (2s) ──
    const shuffleRound = () =>
      Animated.parallel(
        shuffleAnims.map((a, i) => {
          const offset = (i - Math.floor(STACK_COUNT / 2));
          return Animated.parallel([
            Animated.timing(a.x, { toValue: offset * 20 + (Math.random() - 0.5) * 30, duration: 280, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
            Animated.timing(a.y, { toValue: (Math.random() - 0.5) * 24, duration: 280, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
            Animated.timing(a.rotate, { toValue: (Math.random() - 0.5) * 18, duration: 280, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
          ]);
        })
      );

    const gather = () =>
      Animated.parallel(
        shuffleAnims.map((a, i) => {
          const offset = (i - Math.floor(STACK_COUNT / 2)) * 2.5;
          return Animated.parallel([
            Animated.timing(a.x, { toValue: offset, duration: 220, useNativeDriver: true }),
            Animated.timing(a.y, { toValue: 0, duration: 220, useNativeDriver: true }),
            Animated.timing(a.rotate, { toValue: offset * 0.4, duration: 220, useNativeDriver: true }),
          ]);
        })
      );

    for (let i = 0; i < 4; i++) {
      await anim(shuffleRound());
      await anim(gather());
    }

    // Fade out the stack
    await anim(Animated.timing(stackOpacity, { toValue: 0, duration: 300, useNativeDriver: true }));

    // ── Phase 2: Draw — card back rises from center (0.8s) ──
    setPhase('draw');
    await anim(
      Animated.parallel([
        Animated.timing(chosenY, { toValue: -120, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
        Animated.timing(chosenScale, { toValue: 1.05, duration: 800, useNativeDriver: true }),
      ])
    );
    await delay(300);

    // ── Phase 3: Flip (1s) ──
    setPhase('flip');
    await anim(
      Animated.spring(flipAnim, { toValue: 1, friction: 8, tension: 50, useNativeDriver: true })
    );
    await delay(500);

    // ── Phase 4: Land on table ──
    setPhase('land');
    await anim(
      Animated.parallel([
        Animated.spring(landScale, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(landRotate, { toValue: 3, duration: 150, useNativeDriver: true }),
          Animated.spring(landRotate, { toValue: 0, friction: 4, tension: 80, useNativeDriver: true }),
        ]),
        Animated.timing(chosenY, { toValue: 0, duration: 400, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
      ])
    );

    await delay(400);
    setPhase('done');
    onComplete?.();
  }

  // Flip interpolations
  const backRotateY = flipAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: ['0deg', '90deg', '90deg'] });
  const backOp = flipAnim.interpolate({ inputRange: [0, 0.49, 0.5], outputRange: [1, 1, 0] });
  const frontRotateY = flipAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: ['-90deg', '-90deg', '0deg'] });
  const frontOp = flipAnim.interpolate({ inputRange: [0, 0.5, 0.51], outputRange: [0, 0, 1] });
  const flipScale = flipAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.1, 1] });

  const showStack = phase === 'shuffle';
  const showChosen = !showStack;

  return (
    <View style={styles.container}>
      {/* Shuffling stack — face-down card backs */}
      {showStack && (
        <Animated.View style={[styles.stackArea, { opacity: stackOpacity }]}>
          {shuffleAnims.map((a, i) => {
            const rot = a.rotate.interpolate({ inputRange: [-20, 20], outputRange: ['-20deg', '20deg'] });
            return (
              <Animated.View
                key={i}
                style={[
                  styles.stackCard,
                  { zIndex: i, transform: [{ translateX: a.x }, { translateY: a.y }, { rotate: rot }] },
                ]}
              >
                <TarotCardImage showBack width={CARD_W} height={CARD_H} theme={theme} />
              </Animated.View>
            );
          })}
        </Animated.View>
      )}

      {/* Chosen card — draw / flip / land */}
      {showChosen && (
        <Animated.View
          style={[
            styles.chosenCard,
            {
              transform: [
                { translateY: chosenY },
                { scale: Animated.multiply(chosenScale, landScale) },
                { rotate: landRotate.interpolate({ inputRange: [-10, 10], outputRange: ['-10deg', '10deg'] }) },
              ],
            },
          ]}
        >
          {/* Back */}
          <Animated.View style={[styles.face, { opacity: backOp, transform: [{ perspective: 800 }, { rotateY: backRotateY }, { scale: flipScale }] }]}>
            <TarotCardImage showBack width={CARD_W} height={CARD_H} theme={theme} />
          </Animated.View>
          {/* Front */}
          <Animated.View style={[styles.face, { opacity: frontOp, transform: [{ perspective: 800 }, { rotateY: frontRotateY }, { scale: flipScale }] }]}>
            <TarotCardImage card={card} isReversed={isReversed} width={CARD_W} height={CARD_H} theme={theme} />
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
}

function anim(animation) { return new Promise(resolve => animation.start(resolve)); }
function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', height: CARD_H + 100 },
  stackArea: { width: CARD_W + 140, height: CARD_H, alignItems: 'center', justifyContent: 'center' },
  stackCard: { position: 'absolute' },
  chosenCard: { width: CARD_W, height: CARD_H },
  face: { position: 'absolute', width: CARD_W, height: CARD_H, backfaceVisibility: 'hidden' },
});
