import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
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

import { useSession } from '@/contexts/SessionContext';
import { GOAL_BUTTONS } from '@/data/goals';
import { TECH_LABELS } from '@/data/techniques';
import { useColors } from '@/hooks/useColors';

const TAB_BAR_HEIGHT = Platform.OS === 'web' ? 84 : 50;

export default function PracticeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { sessions, streak, lastTech } = useSession();
  const totalSessions = sessions.length;

  function handleGoal(key: string) {
    void Haptics.selectionAsync();
    router.push(`/pick?goal=${key}`);
  }

  function handleQuickStart(tech: string) {
    void Haptics.selectionAsync();
    router.push(`/session?tech=${tech}`);
  }

  const topPad = Platform.OS === 'web' ? 67 : insets.top + 16;
  const bottomPad = TAB_BAR_HEIGHT + insets.bottom + 16;

  return (
    <LinearGradient
      colors={['#2C1F14', '#3A2618', '#2A1C10']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: topPad, paddingBottom: bottomPad },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.appTitle, { color: colors.primary }]}>Breathwork</Text>
        <Text style={[styles.appSub, { color: colors.dim }]}>
          Choose your intention
        </Text>

        <View style={[styles.statsRow, { borderColor: colors.border }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{streak}</Text>
            <Text style={[styles.statLabel, { color: colors.faint }]}>day streak</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{totalSessions}</Text>
            <Text style={[styles.statLabel, { color: colors.faint }]}>sessions</Text>
          </View>
        </View>

        {lastTech && (
          <Pressable
            style={({ pressed }) => [
              styles.quickStart,
              { borderColor: colors.primary, backgroundColor: pressed ? 'rgba(229,169,60,0.12)' : 'rgba(229,169,60,0.06)' },
            ]}
            onPress={() => handleQuickStart(lastTech)}
          >
            <Ionicons name="play-circle" size={22} color={colors.primary} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.quickStartLabel, { color: colors.dim }]}>Continue</Text>
              <Text style={[styles.quickStartTech, { color: colors.foreground }]}>
                {TECH_LABELS[lastTech] ?? lastTech}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.faint} />
          </Pressable>
        )}

        <Text style={[styles.sectionLabel, { color: colors.faint }]}>INTENTIONS</Text>

        <View style={styles.grid}>
          {GOAL_BUTTONS.map((btn) => {
            const isIonicons = btn.iconLib === 'Ionicons';
            return (
              <Pressable
                key={btn.key}
                style={({ pressed }) => [
                  styles.goalCard,
                  {
                    backgroundColor: pressed ? 'rgba(229,169,60,0.12)' : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => handleGoal(btn.key)}
              >
                {isIonicons ? (
                  <Ionicons
                    name={btn.icon as keyof typeof Ionicons.glyphMap}
                    size={26}
                    color={colors.primary}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={btn.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                    size={26}
                    color={colors.primary}
                  />
                )}
                <Text style={[styles.goalLabel, { color: colors.foreground }]}>{btn.label}</Text>
                <Text style={[styles.goalSub, { color: colors.faint }]} numberOfLines={2}>
                  {btn.sub}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 20 },
  appTitle: {
    fontSize: 34,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  appSub: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 32, fontFamily: 'Inter_600SemiBold' },
  statLabel: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  statDivider: { width: 1, height: 40, marginHorizontal: 16 },
  quickStart: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  quickStartLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', marginBottom: 2 },
  quickStartTech: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  sectionLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  goalCard: {
    width: '47%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    gap: 8,
    minHeight: 110,
  },
  goalLabel: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 4,
  },
  goalSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
  },
});
