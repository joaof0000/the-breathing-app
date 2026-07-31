import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';

export type NostrilState = 'left' | 'right' | 'both' | null;

const MOON = '#6b8ab5';
const SUN = '#d4854a';
const GOLD = '#C9A84C';
const FAINT = 'rgba(255,255,255,0.18)';

export function getNostrilState(phaseName: string): NostrilState {
  const lower = phaseName.toLowerCase();
  if (lower.includes('both')) return 'both';
  if (lower.includes('left') && lower.includes('right')) return 'both';
  if (lower.includes('left')) return 'left';
  if (lower.includes('right')) return 'right';
  return null;
}

interface BadgeProps {
  label: 'L' | 'R';
  side: 'left' | 'right';
  state: NostrilState;
}

function NostrilBadge({ label, side, state }: BadgeProps) {
  const isActive = state === side || state === 'both';
  const isBoth = state === 'both';

  let borderColor = FAINT;
  let backgroundColor = 'rgba(255,255,255,0.03)';
  let textColor = FAINT;
  let shadowColor: string | undefined;

  if (isActive) {
    if (isBoth) {
      borderColor = GOLD;
      backgroundColor = 'rgba(201,168,76,0.12)';
      textColor = GOLD;
      shadowColor = 'rgba(201,168,76,0.4)';
    } else if (side === 'left') {
      borderColor = MOON;
      backgroundColor = 'rgba(107,138,181,0.18)';
      textColor = MOON;
      shadowColor = 'rgba(107,138,181,0.45)';
    } else {
      borderColor = SUN;
      backgroundColor = 'rgba(212,133,74,0.18)';
      textColor = SUN;
      shadowColor = 'rgba(212,133,74,0.45)';
    }
  }

  return (
    <View
      style={[
        styles.badge,
        { borderColor, backgroundColor },
        isActive && shadowColor
          ? { shadowColor, shadowOpacity: 0.6, shadowRadius: 6, shadowOffset: { width: 0, height: 0 }, elevation: 4 }
          : undefined,
        !isActive && styles.badgeClosed,
      ]}
    >
      <Text style={[styles.badgeLabel, { color: textColor }]}>{label}</Text>
    </View>
  );
}

interface NostrilIndicatorProps {
  phaseName: string;
}

export default function NostrilIndicator({ phaseName }: NostrilIndicatorProps) {
  const state = getNostrilState(phaseName);

  return (
    <View style={styles.row}>
      <NostrilBadge label="L" side="left" state={state} />
      <Svg viewBox="0 0 30 50" width={22} height={36} style={styles.noseSvg}>
        <Path
          d="M15 5 C 6 5 3 18 3 28 C 3 38 8 44 15 44 C 22 44 27 38 27 28 C 27 18 24 5 15 5 Z"
          fill="none"
          stroke={FAINT}
          strokeWidth="1.2"
        />
        <Line x1="15" y1="5" x2="15" y2="44" stroke={FAINT} strokeWidth="0.8" />
      </Svg>
      <NostrilBadge label="R" side="right" state={state} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeClosed: {
    opacity: 0.45,
  },
  badgeLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
  },
  noseSvg: {
    opacity: 0.7,
  },
});
