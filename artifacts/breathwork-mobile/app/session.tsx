import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
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

import { BreathRing } from '@/components/BreathRing';
import NostrilIndicator from '@/components/NostrilIndicator';
import { useSession } from '@/contexts/SessionContext';
import { NOSTRIL_TECHS, TECH_LABELS, getPhaseColor, getPhases } from '@/data/techniques';
import { useColors } from '@/hooks/useColors';
import { useAudioTones } from '@/hooks/useAudioTones';

const TOTAL_ROUNDS = 3;

const ALL_TECHS = Object.keys(TECH_LABELS).filter(t => t !== 'custom' && getPhases(t).length > 0);

export default function SessionScreen() {
  const { tech: techParam } = useLocalSearchParams<{ tech?: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { recordSession } = useSession();

  const [selectedTech, setSelectedTech] = useState(techParam ?? 'box');
  const phases = getPhases(selectedTech);

  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [roundNum, setRoundNum] = useState(1);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const { playPhase, playDone, stopHum } = useAudioTones({ muted: isMuted });

  const sessionStartRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPhase = phases[phaseIndex];
  const phaseKey = `${phaseIndex}-${roundNum}`;
  const phaseColor = currentPhase ? getPhaseColor(currentPhase.cls, colors as unknown as Record<string, string>) : colors.primary;
  const secondsRemaining = currentPhase ? Math.max(0, currentPhase.s - secondsElapsed) : 0;

  // Play tone at the start of each phase
  useEffect(() => {
    if (!isRunning || !currentPhase) return;
    playPhase(currentPhase.cls, currentPhase.name, currentPhase.s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseIndex, isRunning, selectedTech]);

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
    setSecondsElapsed(prev => {
      const next = prev + 1;
      return next;
    });
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
          const dur = sessionStartRef.current ? Math.round((Date.now() - sessionStartRef.current) / 1000) : 0;
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
      if (dur >= 5) {
        void recordSession(selectedTech, dur);
      }
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

  const topPad = Platform.OS === 'web' ? 67 : insets.top + 8;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom + 20;

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
        <Pressable
          onPress={() => setIsMuted(m => !m)}
          style={({ pressed }) => [styles.muteBtn, { opacity: pressed ? 0.5 : 1 }]}
          hitSlop={12}
        >
          <Ionicons
            name={isMuted ? 'volume-mute' : 'volume-medium'}
            size={22}
            color={isMuted ? colors.faint : colors.primary}
          />
        </Pressable>
      </View>

      <View style={styles.ringSection}>
        <BreathRing
          phaseColor={isRunning || isComplete ? phaseColor : colors.faint}
          phaseDuration={currentPhase?.s ?? 4}
          isRunning={isRunning}
          phaseKey={phaseKey}
          bgColor={colors.card}
          dimColor={colors.primary}
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

      {!isComplete && (
        <View style={[styles.controlRow, { paddingBottom: bottomPad }]}>
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
          <Text style={[styles.pickerLabel, { color: colors.faint }]}>TECHNIQUE</Text>
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
  muteBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
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
});
