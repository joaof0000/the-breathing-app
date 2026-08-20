import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

import { BreathRing, type PhaseType } from '@/components/BreathRing';
import NostrilIndicator from '@/components/NostrilIndicator';
import TechInfoDrawer from '@/components/TechInfoDrawer';
import { useSession } from '@/contexts/SessionContext';
import { NOSTRIL_TECHS, TECH_LABELS, TECH_INFO, getPhaseColor, getPhases } from '@/data/techniques';
import { useColors } from '@/hooks/useColors';
import { useAudioTones } from '@/hooks/useAudioTones';
import { useLang, type Lang } from '@/hooks/useLang';

const TOTAL_ROUNDS = 3;
const VOLUME_KEY = 'breathwork_mobile_volume_v1';
const VOICE_KEY  = 'breathwork_mobile_voice_v1';

const ALL_TECHS = Object.keys(TECH_LABELS).filter(t => t !== 'custom' && getPhases(t).length > 0);

/** Map a phase class + name to a short spoken cue. */
function getVoiceLabel(cls: string, name: string): string {
  const n = name.toLowerCase();
  if (n.includes('hum'))                                              return 'Hum';
  if (n.includes('inhale') || n.includes('breathe in'))              return 'Breathe in';
  if (n.includes('exhale') || n.includes('breathe out'))             return 'Breathe out';
  if (n.includes('hold') || n.includes('retention') || n.includes('lock')) return 'Hold';
  if (n.includes('rest') || n.includes('recov'))                     return 'Rest';
  // cls fallback
  switch (cls) {
    case 'p-inhale': case 'p-ice':   return 'Breathe in';
    case 'p-exhale': case 'p-fire':  return 'Breathe out';
    case 'p-hold':   case 'p-hold2': return 'Hold';
    default:                          return '';
  }
}

export default function SessionScreen() {
  const { tech: techParam } = useLocalSearchParams<{ tech?: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { recordSession } = useSession();

  const [selectedTech, setSelectedTech] = useState(techParam ?? 'box');
  const phases = getPhases(selectedTech);

  const [isRunning, setIsRunning]           = useState(false);
  const [phaseIndex, setPhaseIndex]         = useState(0);
  const [roundNum, setRoundNum]             = useState(1);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isComplete, setIsComplete]         = useState(false);
  const [totalSeconds, setTotalSeconds]     = useState(0);
  const [infoOpen, setInfoOpen]             = useState(false);

  // ── Audio & voice settings ──────────────────────────────────────────────────
  const [volume, setVolume]           = useState(70);      // 0–100
  const volumeBeforeMute              = useRef(70);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Load persisted settings once on mount
  useEffect(() => {
    (async () => {
      try {
        const [vol, voice] = await Promise.all([
          AsyncStorage.getItem(VOLUME_KEY),
          AsyncStorage.getItem(VOICE_KEY),
        ]);
        if (vol !== null) {
          const v = Number(vol);
          setVolume(v);
          if (v > 0) volumeBeforeMute.current = v;
        }
        if (voice !== null) setVoiceEnabled(voice === 'true');
      } catch { /* non-fatal */ }
    })();
  }, []);

  const saveVolume = useCallback(async (v: number) => {
    setVolume(v);
    await AsyncStorage.setItem(VOLUME_KEY, String(v)).catch(() => {});
  }, []);

  const saveVoice = useCallback(async (on: boolean) => {
    setVoiceEnabled(on);
    await AsyncStorage.setItem(VOICE_KEY, String(on)).catch(() => {});
  }, []);

  const handleVolumeToggle = useCallback(() => {
    if (volume > 0) {
      volumeBeforeMute.current = volume;
      void saveVolume(0);
    } else {
      void saveVolume(volumeBeforeMute.current || 70);
    }
  }, [volume, saveVolume]);

  // Derive ionicon name from volume level
  const volumeIconName: React.ComponentProps<typeof Ionicons>['name'] =
    volume === 0   ? 'volume-mute'
    : volume < 40  ? 'volume-low'
    : volume < 75  ? 'volume-medium'
    : 'volume-high';

  const { playPhase, playDone, stopHum } = useAudioTones({ volume: volume / 100 });

  // ── Language picker ─────────────────────────────────────────────────────────
  const { lang, setLang } = useLang();
  const LANGS: { code: Lang; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'pt', label: 'PT' },
    { code: 'es', label: 'ES' },
  ];

  const sessionStartRef = useRef<number | null>(null);
  const intervalRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPhase    = phases[phaseIndex];
  const phaseKey        = `${phaseIndex}-${roundNum}`;

  const phaseType: PhaseType = (() => {
    if (!isRunning || !currentPhase) return 'idle';
    const cls = currentPhase.cls;
    if (cls === 'p-inhale' || cls === 'p-ice') return 'inhale';
    if (cls === 'p-exhale' || cls === 'p-fire') return 'exhale';
    if (cls === 'p-hold' || cls === 'p-hold2' || cls === 'p-ret') return 'hold';
    // Nostril phases: derive from name
    const n = currentPhase.name.toLowerCase();
    if (n.includes('inhale') || n.includes('breathe in')) return 'inhale';
    if (n.includes('exhale') || n.includes('breathe out')) return 'exhale';
    return 'hold';
  })();

  const phaseColor      = currentPhase
    ? getPhaseColor(currentPhase.cls, colors as unknown as Record<string, string>)
    : colors.primary;
  const secondsRemaining = currentPhase ? Math.max(0, currentPhase.s - secondsElapsed) : 0;

  // Play tone at the start of each phase
  useEffect(() => {
    if (!isRunning || !currentPhase) return;
    playPhase(currentPhase.cls, currentPhase.name, currentPhase.s);
  }, [phaseIndex, isRunning, selectedTech, playPhase]);

  // Speak phase name when voice cues are on
  useEffect(() => {
    if (!isRunning || !currentPhase || !voiceEnabled) return;
    const label = getVoiceLabel(currentPhase.cls, currentPhase.name);
    if (!label) return;
    void Speech.stop().catch(() => {});
    Speech.speak(label, { rate: 0.85, pitch: 1.0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseIndex, isRunning, selectedTech, voiceEnabled]);

  // Stop speech whenever session stops
  useEffect(() => {
    if (!isRunning) void Speech.stop().catch(() => {});
  }, [isRunning]);

  // Play completion chime
  useEffect(() => {
    if (!isComplete) return;
    playDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  function stopTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const tick = useCallback(() => {
    setSecondsElapsed(prev => prev + 1);
    setTotalSeconds(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const phase = getPhases(selectedTech)[phaseIndex];
    if (!phase) return;

    if (secondsElapsed >= phase.s) {
      const nextPhaseIndex = phaseIndex + 1;
      if (nextPhaseIndex < phases.length) {
        setPhaseIndex(nextPhaseIndex);
        setSecondsElapsed(0);
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        const nextRound = roundNum + 1;
        if (nextRound <= TOTAL_ROUNDS) {
          setPhaseIndex(0);
          setRoundNum(nextRound);
          setSecondsElapsed(0);
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          stopTimer();
          setIsRunning(false);
          setIsComplete(true);
          const dur = sessionStartRef.current
            ? Math.round((Date.now() - sessionStartRef.current) / 1000)
            : 0;
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          void recordSession(selectedTech, dur);
        }
      }
    }
  }, [secondsElapsed, phaseIndex, roundNum, isRunning, selectedTech, phases, recordSession]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isRunning, tick]);

  function handleBegin() {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    sessionStartRef.current = Date.now();
    setPhaseIndex(0);
    setRoundNum(1);
    setSecondsElapsed(0);
    setTotalSeconds(0);
    setIsComplete(false);
    setIsRunning(true);
  }

  function handleStop() {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    stopHum();
    stopTimer();
    setIsRunning(false);
    if (sessionStartRef.current) {
      const dur = Math.round((Date.now() - sessionStartRef.current) / 1000);
      if (dur >= 5) void recordSession(selectedTech, dur);
      sessionStartRef.current = null;
    }
  }

  function handleReset() {
    stopHum();
    setIsComplete(false);
    setIsRunning(false);
    setPhaseIndex(0);
    setRoundNum(1);
    setSecondsElapsed(0);
    setTotalSeconds(0);
  }

  function handleTechChange(tech: string) {
    if (isRunning) return;
    setSelectedTech(tech);
    setPhaseIndex(0);
    setRoundNum(1);
    setSecondsElapsed(0);
    setIsComplete(false);
  }

  const topPad    = Platform.OS === 'web' ? 67 : insets.top + 8;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom + 20;

  // ── Volume bar row (5 steps: 0, 25, 50, 75, 100) ───────────────────────────
  const VOL_STEPS = [20, 40, 60, 80, 100];
  const VolumeBars = (
    <View style={styles.volRow}>
      <Pressable onPress={handleVolumeToggle} hitSlop={8}>
        <Ionicons
          name={volumeIconName}
          size={18}
          color={volume === 0 ? colors.faint : colors.primary}
        />
      </Pressable>
      <View style={styles.volBars}>
        {VOL_STEPS.map(step => (
          <Pressable
            key={step}
            onPress={() => {
              const next = volume === step ? 0 : step;
              if (next > 0) volumeBeforeMute.current = next;
              void saveVolume(next);
            }}
            hitSlop={6}
            style={[
              styles.volBar,
              {
                backgroundColor: volume >= step ? colors.primary : colors.card,
                borderColor: volume >= step ? colors.primary : colors.border,
                height: 6 + (step / 100) * 10, // bars grow taller → left to right
              },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.volPct, { color: colors.faint }]}>{volume}%</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#1E1509', '#2C1F14', '#231910']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={[styles.header, { paddingTop: topPad }]}>
        <Pressable
          onPress={() => {
            if (isRunning) handleStop();
            router.back();
          }}
          style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.5 : 1 }]}
          hitSlop={12}
        >
          <Ionicons name="chevron-back" size={28} color={colors.primary} />
        </Pressable>

        <Text style={[styles.techName, { color: colors.foreground }]}>
          {TECH_LABELS[selectedTech] ?? selectedTech}
        </Text>

        <View style={styles.headerRight}>
          {TECH_INFO[selectedTech] && (
            <Pressable
              onPress={() => setInfoOpen(true)}
              style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.5 : 1 }]}
              hitSlop={12}
            >
              <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
            </Pressable>
          )}

          {/* Voice cues toggle */}
          <Pressable
            onPress={() => void saveVoice(!voiceEnabled)}
            style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.5 : 1 }]}
            hitSlop={12}
          >
            <Ionicons
              name={voiceEnabled ? 'mic' : 'mic-off-outline'}
              size={20}
              color={voiceEnabled ? colors.primary : colors.faint}
            />
          </Pressable>

          {/* Volume quick-toggle */}
          <Pressable
            onPress={handleVolumeToggle}
            style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.5 : 1, alignItems: 'flex-end' }]}
            hitSlop={12}
          >
            <Ionicons
              name={volumeIconName}
              size={22}
              color={volume === 0 ? colors.faint : colors.primary}
            />
          </Pressable>
        </View>
      </View>

      <TechInfoDrawer
        tech={selectedTech}
        visible={infoOpen}
        onClose={() => setInfoOpen(false)}
      />

      <View style={styles.ringSection}>
        <BreathRing
          phaseColor={isRunning || isComplete ? phaseColor : colors.faint}
          phaseDuration={currentPhase?.s ?? 4}
          isRunning={isRunning}
          phaseKey={phaseKey}
          bgColor={colors.card}
          dimColor={colors.primary}
          phaseType={phaseType}
        />
        <View style={styles.ringCenter}>
          {isComplete ? (
            <>
              <Ionicons name="checkmark" size={44} color={colors.primary} />
              <Text style={[styles.completeLabel, { color: colors.primary }]}>Complete</Text>
            </>
          ) : isRunning ? (
            <>
              <Text style={[styles.countdown, { color: colors.primary }]}>
                {secondsRemaining}
              </Text>
              <Text style={[styles.phaseName, { color: colors.dim }]} numberOfLines={2}>
                {currentPhase?.name}
              </Text>
              {NOSTRIL_TECHS.includes(selectedTech) && currentPhase && (
                <NostrilIndicator phaseName={currentPhase.name} />
              )}
            </>
          ) : (
            <>
              <Ionicons name="flower-outline" size={36} color={colors.faint} />
              <Text style={[styles.readyText, { color: colors.faint }]}>Ready</Text>
            </>
          )}
        </View>
      </View>

      {isRunning && (
        <View style={styles.roundRow}>
          {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.roundDot,
                {
                  backgroundColor: i < roundNum ? colors.primary : colors.card,
                  opacity: i === roundNum - 1 ? 1 : 0.5,
                  borderColor: colors.primary,
                },
              ]}
            />
          ))}
          <Text style={[styles.roundLabel, { color: colors.dim }]}>
            Round {roundNum} of {TOTAL_ROUNDS}
          </Text>
        </View>
      )}

      {isComplete && (
        <View style={styles.completeActions}>
          <Pressable
            style={({ pressed }) => [
              styles.actionBtn,
              { backgroundColor: pressed ? 'rgba(229,169,60,0.2)' : 'rgba(229,169,60,0.12)', borderColor: colors.primary },
            ]}
            onPress={handleBegin}
          >
            <Ionicons name="refresh" size={18} color={colors.primary} />
            <Text style={[styles.actionBtnText, { color: colors.primary }]}>Go Again</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.actionBtn,
              { backgroundColor: pressed ? 'rgba(196,168,130,0.15)' : 'transparent', borderColor: colors.dim },
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={18} color={colors.dim} />
            <Text style={[styles.actionBtnText, { color: colors.dim }]}>Home</Text>
          </Pressable>
        </View>
      )}

      {isRunning && (
        <View style={styles.runningVolRow}>
          {VolumeBars}
        </View>
      )}

      {!isComplete && (
        <View style={[styles.controlRow, { paddingBottom: isRunning ? bottomPad : 12 }]}>
          {isRunning ? (
            <Pressable
              style={({ pressed }) => [
                styles.stopBtn,
                { borderColor: colors.dim, backgroundColor: pressed ? 'rgba(196,168,130,0.15)' : 'transparent' },
              ]}
              onPress={handleStop}
            >
              <Ionicons name="stop" size={20} color={colors.dim} />
              <Text style={[styles.stopBtnText, { color: colors.dim }]}>Stop</Text>
            </Pressable>
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.beginBtn,
                { backgroundColor: pressed ? colors.accent : colors.primary },
              ]}
              onPress={handleBegin}
            >
              <Text style={[styles.beginBtnText, { color: colors.primaryForeground }]}>Begin</Text>
            </Pressable>
          )}
        </View>
      )}

      {!isRunning && !isComplete && (
        <View style={[styles.techPicker, { paddingBottom: bottomPad + 8 }]}>
          {/* Volume control */}
          <Text style={[styles.pickerLabel, { color: colors.faint }]}>TONE VOLUME</Text>
          {VolumeBars}

          {/* Language picker */}
          <Text style={[styles.pickerLabel, { color: colors.faint, marginTop: 16 }]}>LANGUAGE</Text>
          <View style={styles.langRow}>
            {LANGS.map(({ code, label }) => (
              <Pressable
                key={code}
                onPress={() => setLang(code)}
                style={[
                  styles.langChip,
                  {
                    backgroundColor: lang === code ? colors.primary : colors.card,
                    borderColor: lang === code ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.langChipText,
                    { color: lang === code ? colors.primaryForeground : colors.dim },
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Technique picker */}
          <Text style={[styles.pickerLabel, { color: colors.faint, marginTop: 16 }]}>TECHNIQUE</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.techScroll}
          >
            {ALL_TECHS.map(t => (
              <Pressable
                key={t}
                onPress={() => handleTechChange(t)}
                style={[
                  styles.techChip,
                  {
                    backgroundColor: t === selectedTech ? colors.primary : colors.card,
                    borderColor: t === selectedTech ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.techChipText,
                    { color: t === selectedTech ? colors.primaryForeground : colors.dim },
                  ]}
                >
                  {TECH_LABELS[t]}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    width: 36,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  techName: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
    flex: 1,
  },
  ringSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  countdown: {
    fontSize: 56,
    fontFamily: 'Inter_400Regular',
    lineHeight: 64,
  },
  phaseName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    maxWidth: 180,
  },
  readyText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
  },
  completeLabel: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 4,
  },
  roundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  roundDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  roundLabel: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginLeft: 4,
  },
  controlRow: {
    paddingHorizontal: 40,
    paddingTop: 8,
  },
  beginBtn: {
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
  },
  beginBtnText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
  },
  stopBtn: {
    flexDirection: 'row',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
  },
  stopBtnText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  completeActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 50,
    paddingVertical: 16,
    borderWidth: 1,
  },
  actionBtnText: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
  },
  techPicker: {
    paddingHorizontal: 20,
  },
  pickerLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
    marginBottom: 10,
    paddingLeft: 4,
  },
  techScroll: {
    paddingRight: 20,
    gap: 8,
  },
  techChip: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  techChipText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  // ── Mid-session volume row ──────────────────────────────────────────────────
  runningVolRow: {
    paddingHorizontal: 28,
    paddingBottom: 12,
  },
  // ── Volume bar row ──────────────────────────────────────────────────────────
  volRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingLeft: 4,
    marginBottom: 4,
  },
  volBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
    flex: 1,
  },
  volBar: {
    flex: 1,
    borderRadius: 3,
    borderWidth: 1,
    maxWidth: 32,
  },
  volPct: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    minWidth: 34,
    textAlign: 'right',
  },
  // ── Language picker ─────────────────────────────────────────────────────────
  langRow: {
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 4,
  },
  langChip: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  langChipText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
  },
});
