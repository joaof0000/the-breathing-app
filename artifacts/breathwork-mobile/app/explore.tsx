import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
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

import TechInfoDrawer from '@/components/TechInfoDrawer';
import { TECH_INFO, TECH_LABELS } from '@/data/techniques';
import { useColors } from '@/hooks/useColors';

const PHASE_ACCENT_COLORS = [
  '#6A9E7F',
  '#8E7A9C',
  '#C4A882',
];

const TECHNIQUES = Object.entries(TECH_INFO);

export default function ExploreScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [infoTech, setInfoTech] = useState<string | null>(null);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom + 20;

  function handlePick(tech: string) {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/session?tech=${tech}`);
  }

  function handleInfo(tech: string) {
    void Haptics.selectionAsync();
    setInfoTech(tech);
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
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={28} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.eyebrow, { color: colors.dim }]}>EXPLORE</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>All techniques</Text>
        <Text style={[styles.subtitle, { color: colors.dim }]}>
          Learn the rhythm and purpose of each practice before you begin.
        </Text>

        <View style={styles.list}>
          {TECHNIQUES.map(([tech, info], idx) => (
            <View
              key={tech}
              style={[
                styles.techCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.accentBar,
                  { backgroundColor: PHASE_ACCENT_COLORS[idx % PHASE_ACCENT_COLORS.length] },
                ]}
              />
              <Pressable
                style={({ pressed }) => [
                  styles.cardAction,
                  { opacity: pressed ? 0.72 : 1 },
                ]}
                onPress={() => handlePick(tech)}
                accessibilityRole="button"
                accessibilityLabel={`Start ${info.title}`}
              >
                <View style={styles.techInfo}>
                  <Text style={[styles.shortName, { color: colors.faint }]}>
                    {TECH_LABELS[tech] ?? tech}
                  </Text>
                  <Text style={[styles.techName, { color: colors.foreground }]}>
                    {info.title}
                  </Text>
                  <Text
                    style={[styles.techDesc, { color: colors.dim }]}
                    numberOfLines={2}
                  >
                    {info.intro[0]}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.faint}
                  style={{ marginLeft: 4 }}
                />
              </Pressable>
              <Pressable
                onPress={() => handleInfo(tech)}
                hitSlop={10}
                style={({ pressed }) => [styles.infoBtn, { opacity: pressed ? 0.5 : 1 }]}
                accessibilityRole="button"
                accessibilityLabel={`Learn more about ${info.title}`}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color={colors.dim}
                />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      <TechInfoDrawer
        tech={infoTech ?? ''}
        visible={infoTech !== null}
        onClose={() => setInfoTech(null)}
      />
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
  scroll: {
    paddingHorizontal: 24,
  },
  eyebrow: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 21,
    marginBottom: 28,
  },
  list: {
    gap: 12,
  },
  techCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 12,
    overflow: 'hidden',
  },
  cardAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  shortName: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  techName: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
    lineHeight: 23,
  },
  techDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 19,
  },
  infoBtn: {
    padding: 4,
  },
});