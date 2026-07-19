import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { GOALS } from '@/data/goals';
import { useColors } from '@/hooks/useColors';

const PHASE_ACCENT_COLORS = [
  '#6A9E7F',
  '#8E7A9C',
  '#C4A882',
];

export default function PickScreen() {
  const { goal } = useLocalSearchParams<{ goal?: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const goalData = goal ? GOALS[goal] : null;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom + 20;

  function handlePick(tech: string) {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/session?tech=${tech}`);
  }

  if (!goalData) {
    return (
      <LinearGradient colors={['#2C1F14', '#2A1C10']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.foreground, fontFamily: 'Inter_400Regular' }}>Goal not found</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#2C1F14', '#3A2618', '#2A1C10']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.5 : 1 }]}
          hitSlop={12}
        >
          <Ionicons name="chevron-back" size={28} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.goalLabel, { color: colors.dim }]}>Your intention</Text>
        <Text style={[styles.goalTitle, { color: colors.foreground }]}>{goalData.label}</Text>

        <Text style={[styles.sectionLabel, { color: colors.faint }]}>CHOOSE A TECHNIQUE</Text>

        {goalData.choices.map((choice, idx) => (
          <Pressable
            key={choice.tech}
            style={({ pressed }) => [
              styles.techCard,
              {
                backgroundColor: pressed ? 'rgba(229,169,60,0.10)' : colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => handlePick(choice.tech)}
          >
            <View style={[styles.accentBar, { backgroundColor: PHASE_ACCENT_COLORS[idx % PHASE_ACCENT_COLORS.length] }]} />
            <View style={styles.techInfo}>
              <Text style={[styles.techName, { color: colors.foreground }]}>{choice.name}</Text>
              <Text style={[styles.techDesc, { color: colors.dim }]}>{choice.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.faint} />
          </Pressable>
        ))}

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Text style={[styles.orLabel, { color: colors.faint }]}>Or jump straight into any technique</Text>
        <Pressable
          style={({ pressed }) => [
            styles.browseBtn,
            {
              borderColor: colors.border,
              backgroundColor: pressed ? 'rgba(229,169,60,0.08)' : 'transparent',
            },
          ]}
          onPress={() => {
            void Haptics.selectionAsync();
            router.push('/session?tech=box');
          }}
        >
          <Ionicons name="grid-outline" size={18} color={colors.dim} />
          <Text style={[styles.browseBtnText, { color: colors.dim }]}>Browse all techniques</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  scroll: { paddingHorizontal: 24 },
  goalLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 1,
    marginBottom: 6,
  },
  goalTitle: {
    fontSize: 26,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 32,
    lineHeight: 34,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  techCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    marginBottom: 12,
    overflow: 'hidden',
  },
  accentBar: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 16,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  techInfo: {
    flex: 1,
    paddingLeft: 14,
  },
  techName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
  },
  techDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 19,
  },
  divider: {
    height: 1,
    marginVertical: 28,
  },
  orLabel: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginBottom: 14,
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  browseBtnText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
});
