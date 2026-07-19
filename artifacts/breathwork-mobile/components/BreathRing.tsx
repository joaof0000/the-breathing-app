import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 240;
const STROKE = 14;
const INNER_RING = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface BreathRingProps {
  phaseColor: string;
  phaseDuration: number;
  isRunning: boolean;
  phaseKey: string;
  bgColor: string;
  dimColor: string;
}

export function BreathRing({
  phaseColor,
  phaseDuration,
  isRunning,
  phaseKey,
  bgColor,
  dimColor,
}: BreathRingProps) {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  useEffect(() => {
    cancelAnimation(progress);
    progress.value = 0;
    if (isRunning && phaseDuration > 0) {
      progress.value = withTiming(1, {
        duration: phaseDuration * 1000,
        easing: Easing.linear,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseKey, isRunning]);

  const cx = SIZE / 2;
  const cy = SIZE / 2;

  return (
    <View style={{ width: SIZE, height: SIZE }}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <Circle
          cx={cx}
          cy={cy}
          r={RADIUS}
          stroke={bgColor}
          strokeWidth={STROKE}
          fill="none"
        />
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={RADIUS}
          stroke={phaseColor}
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation={-90}
          originX={cx}
          originY={cy}
        />
        <Circle
          cx={cx}
          cy={cy}
          r={RADIUS - STROKE / 2 - 8}
          stroke={dimColor}
          strokeWidth={INNER_RING}
          fill="none"
          opacity={0.3}
        />
      </Svg>
    </View>
  );
}
