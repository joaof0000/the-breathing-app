import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSession } from '@/contexts/SessionContext';
import { TECH_LABELS } from '@/data/techniques';
import { useColors } from '@/hooks/useColors';

const TAB_BAR_HEIGHT = Platform.OS === 'web' ? 84 : 50;

function formatDuration(secs: number): string {
  if (!secs || secs < 1) return '—';
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (dateStr === today.toISOString().slice(0, 10)) return 'Today';
  if (dateStr === yesterday.toISOString().slice(0, 10)) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function HeatmapDot({ count }: { count: number }) {
  const colors = useColors();
  const base = colors.card;
  const active = colors.primary;
  const intensity = count === 0 ? 0 : count === 1 ? 0.3 : count <= 2 ? 0.6 : 1;
  return (
    <View
      style={{
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: intensity === 0 ? base : active + Math.round(intensity * 255).toString(16).padStart(2, '0'),
        margin: 1.5,
      }}
    />
  );
}

export default function HistoryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { sessions, streak } = useSession();

  const topPad = Platform.OS === 'web' ? 67 : insets.top + 16;
  const bottomPad = TAB_BAR_HEIGHT + insets.bottom + 16;

  const grouped = useMemo(() => {
    const byDate: Record<string, typeof sessions> = {};
    const sorted = [...sessions].sort((a, b) => b.ts - a.ts);
    for (const s of sorted) {
      if (!byDate[s.date]) byDate[s.date] = [];
      byDate[s.date].push(s);
    }
    return Object.entries(byDate).sort((a, b) => b[0].localeCompare(a[0]));
  }, [sessions]);

  const heatmapDays = useMemo(() => {
    const days: number[] = [];
    const countMap: Record<string, number> = {};
    for (const s of sessions) {
      countMap[s.date] = (countMap[s.date] ?? 0) + 1;
    }
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push(countMap[key] ?? 0);
    }
    return days;
  }, [sessions]);

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
        <Text style={[styles.title, { color: colors.primary }]}>History</Text>

        <View style={[styles.statsRow, { borderColor: colors.border }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{streak}</Text>
            <Text style={[styles.statLabel, { color: colors.faint }]}>day streak</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{sessions.length}</Text>
            <Text style={[styles.statLabel, { color: colors.faint }]}>total sessions</Text>
          </View>
        </View>

        <View style={[styles.heatmapCard, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <Text style={[styles.heatmapTitle, { color: colors.dim }]}>30 days</Text>
          <View style={styles.heatmap}>
            {heatmapDays.map((count, i) => (
              <HeatmapDot key={i} count={count} />
            ))}
          </View>
        </View>

        {grouped.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: colors.dim }]}>No sessions yet</Text>
            <Text style={[styles.emptySub, { color: colors.faint }]}>
              Complete your first session to see it here
            </Text>
          </View>
        ) : (
          grouped.map(([date, records]) => (
            <View key={date} style={styles.dateGroup}>
              <Text style={[styles.dateLabel, { color: colors.faint }]}>{formatDate(date)}</Text>
              {records.map(r => (
                <View
                  key={r.id}
                  style={[styles.sessionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={styles.sessionLeft}>
                    <Text style={[styles.techName, { color: colors.foreground }]}>
                      {TECH_LABELS[r.tech] ?? r.tech}
                    </Text>
                    <Text style={[styles.sessionTime, { color: colors.faint }]}>{r.time}</Text>
                  </View>
                  <Text style={[styles.sessionDur, { color: colors.dim }]}>
                    {formatDuration(r.dur)}
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 20 },
  title: {
    fontSize: 34,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
    marginBottom: 20,
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
  heatmapCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  heatmapTitle: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  heatmap: { flexDirection: 'row', flexWrap: 'wrap' },
  emptyState: { alignItems: 'center', marginTop: 48 },
  emptyTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold', marginBottom: 8 },
  emptySub: { fontSize: 14, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  dateGroup: { marginBottom: 20 },
  dateLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  sessionLeft: { flex: 1 },
  techName: { fontSize: 15, fontFamily: 'Inter_500Medium', marginBottom: 2 },
  sessionTime: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  sessionDur: { fontSize: 14, fontFamily: 'Inter_500Medium' },
});
