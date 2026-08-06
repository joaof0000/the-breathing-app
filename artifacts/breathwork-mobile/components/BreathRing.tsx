import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 240;
const STROKE = 11;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export type PhaseType = 'inhale' | 'exhale' | 'hold' | 'idle';

interface BreathRingProps {
  phaseColor: string;
  phaseDuration: number;
  isRunning: boolean;
  phaseKey: string;
  bgColor: string;
  dimColor: string;
  phaseType?: PhaseType;
}

export function BreathRing({
  phaseColor,
  phaseDuration,
  isRunning,
  phaseKey,
  bgColor,
  dimColor,
  phaseType = 'idle',
}: BreathRingProps) {
  const progress   = useSharedValue(0);
  const scale      = useSharedValue(1);
  const glowOpacity = useSharedValue(0.08);

  // ── Progress arc ───────────────────────────────────────────────────────────
  const arcProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  // ── Outer glow ring ────────────────────────────────────────────────────────
  const glowProps = useAnimatedProps(() => ({
    opacity: glowOpacity.value,
  }));

  // ── Wrapper scale (the breathing motion) ──────────────────────────────────
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // ── Drive the progress arc ─────────────────────────────────────────────────
  useEffect(() => {
    cancelAnimation(progress);
    progress.value = 0;

    if (!isRunning || phaseDuration <= 0) return;

    // Inhale: ease-in (slow start, accelerates to full)
    // Exhale: ease-out (starts quick, slows to empty)
    // Hold: pure linear
    const easing =
      phaseType === 'inhale' ? Easing.bezier(0.35, 0, 0.65, 1)
      : phaseType === 'exhale' ? Easing.bezier(0.35, 0, 0.65, 1)
      : Easing.linear;

    progress.value = withTiming(1, { duration: phaseDuration * 1000, easing });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseKey, isRunning]);

  // ── Drive the scale & glow ────────────────────────────────────────────────
  useEffect(() => {
    cancelAnimation(scale);
    cancelAnimation(glowOpacity);

    if (!isRunning) {
      // Idle: gentle organic pulse — the ring breathes on its own
      scale.value = withRepeat(
        withSequence(
          withTiming(1.06, { duration: 2400, easing: Easing.inOut(Easing.quad) }),
          withTiming(0.97, { duration: 2400, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        false,
      );
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.18, { duration: 2400, easing: Easing.inOut(Easing.quad) }),
          withTiming(0.06, { duration: 2400, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        false,
      );
      return;
    }

    // Active: scale to match breathing direction over the full phase duration
    const targetScale =
      phaseType === 'inhale' ? 1.09
      : phaseType === 'exhale' ? 0.93
      : phaseType === 'hold' ? 1.04
      : 1;

    const targetGlow =
      phaseType === 'inhale' ? 0.28
      : phaseType === 'exhale' ? 0.10
      : 0.18;

    const scaleEasing =
      phaseType === 'inhale' ? Easing.out(Easing.quad)
      : phaseType === 'exhale' ? Easing.in(Easing.quad)
      : Easing.inOut(Easing.quad);

    scale.value = withTiming(targetScale, {
      duration: phaseDuration * 1000,
      easing: scaleEasing,
    });

    glowOpacity.value = withTiming(targetGlow, { duration: 600, easing: Easing.out(Easing.quad) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseKey, isRunning, phaseType]);

  const cx = SIZE / 2;
  const cy = SIZE / 2;

  return (
    <Animated.View style={[{ width: SIZE, height: SIZE }, containerStyle]}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Outer glow ring — breathes with the phase */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={RADIUS + 16}
          stroke={phaseColor}
          strokeWidth={3}
          fill="none"
          animatedProps={glowProps}
        />

        {/* Second subtle halo */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={RADIUS + 28}
          stroke={phaseColor}
          strokeWidth={1.5}
          fill="none"
          animatedProps={glowProps}
        />

        {/* Track */}
        <Circle
          cx={cx}
          cy={cy}
          r={RADIUS}
          stroke={bgColor}
          strokeWidth={STROKE}
          fill="none"
        />

        {/* Progress arc */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={RADIUS}
          stroke={phaseColor}
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          animatedProps={arcProps}
          strokeLinecap="round"
          rotation={-90}
          originX={cx}
          originY={cy}
        />

        {/* Inner accent ring — soft phase color echo */}
        <Circle
          cx={cx}
          cy={cy}
          r={RADIUS - STROKE / 2 - 10}
          stroke={phaseColor}
          strokeWidth={2}
          fill="none"
          opacity={0.14}
        />
      </Svg>
    </Animated.View>
  );
}
