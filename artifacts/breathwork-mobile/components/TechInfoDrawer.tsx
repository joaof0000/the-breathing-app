import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Path } from 'react-native-svg';

import { getPhases, NOSTRIL_TECHS, TECH_INFO } from '@/data/techniques';
import { useColors } from '@/hooks/useColors';
import { useLang, type Lang } from '@/hooks/useLang';

interface Props {
  tech: string;
  visible: boolean;
  onClose: () => void;
}

/** Renders bold text for segments wrapped in **…** */
function StyledText({ text, style }: { text: string; style: object }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <Text style={style}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Text key={i} style={{ fontFamily: 'Inter_600SemiBold' }}>
            {part}
          </Text>
        ) : (
          part
        ),
      )}
    </Text>
  );
}

type NostrilState = 'left' | 'right' | 'both' | null;

function getNostrilState(phaseName: string): NostrilState {
  const lower = phaseName.toLowerCase();
  if (lower.includes('both')) return 'both';
  if (lower.includes('left') && lower.includes('right')) return 'both';
  if (lower.includes('left')) return 'left';
  if (lower.includes('right')) return 'right';
  return null;
}

const COMPACT: Record<Lang, { in: string; ex: string; hold: string; l: string; r: string; both: string }> = {
  en: { in: 'In',    ex: 'Ex',    hold: 'Hold', l: 'L',    r: 'R',    both: 'Both' },
  pt: { in: 'Insp.', ex: 'Exp.',  hold: 'Reter',l: 'E',    r: 'D',    both: 'Ambas' },
  es: { in: 'Inh.',  ex: 'Exh.',  hold: 'Ret.', l: 'Izq.', r: 'Der.', both: 'Ambas' },
};

const SEQ_TITLE: Record<Lang, string> = {
  en: 'Nostril sequence',
  pt: 'Sequência de narinas',
  es: 'Secuencia de fosas',
};

function shortLabel(name: string, lang: Lang): string {
  const c = COMPACT[lang];
  // Strip "Set N — keyword: " prefixes (Nine Purification sets)
  let s = name.replace(/^Set \d+ — \w+:\s*/i, '').replace(/^Set \d+ — /i, '');
  // Strip emotion/intent suffix after ' — ' for nine purification phases
  s = s.replace(/\s+—\s+\w[\w\s.]*$/, '');
  // Normalise word order: "Exhale Both" / "Inhale Both" etc.
  s = s
    .replace(/Both Nostrils/i, c.both)
    .replace(/Both/i, c.both)
    .replace(/Inhale/i, c.in)
    .replace(/Exhale/i, c.ex)
    .replace(/Hold/i, c.hold)
    .replace(/Left Nostril/i, c.l)
    .replace(/Right Nostril/i, c.r)
    .replace(/ — Left\b/i, ` ${c.l}`)
    .replace(/ — Right\b/i, ` ${c.r}`)
    .replace(/\bLeft\b/i, c.l)
    .replace(/\bRight\b/i, c.r)
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*—\s*/g, ' ')
    .trim();
  return s;
}

function NostrilSequenceDiagram({ tech, colors, lang }: { tech: string; colors: ReturnType<typeof useColors>; lang: Lang }) {
  if (!NOSTRIL_TECHS.includes(tech)) return null;
  // Only show phases that have an active nostril side
  const phases = getPhases(tech).filter(p => getNostrilState(p.name) !== null);
  if (phases.length === 0) return null;

  return (
    <View style={[styles.sequence, { borderColor: 'rgba(229,169,60,0.18)', backgroundColor: 'rgba(229,169,60,0.05)' }]}>
      <Text style={[styles.sequenceTitle, { color: colors.primary }]}>{SEQ_TITLE[lang]}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sequenceScroll}>
        {phases.map((phase, index) => {
          const state = getNostrilState(phase.name);
          const leftActive = state === 'left' || state === 'both';
          const rightActive = state === 'right' || state === 'both';
          const activeColor = state === 'both' ? '#C9A84C' : state === 'left' ? '#6B8AB5' : '#D4854A';
          return (
            <View key={`${phase.name}-${index}`} style={styles.sequenceStep}>
              <Text style={[styles.sequenceLabel, { color: colors.dim }]} numberOfLines={2}>
                {shortLabel(phase.name, lang)}
              </Text>
              <View style={styles.sequencePair}>
                <View style={[styles.sequenceBadge, {
                  borderColor: leftActive ? activeColor : 'rgba(255,255,255,0.18)',
                  backgroundColor: leftActive ? `${activeColor}22` : 'rgba(255,255,255,0.03)',
                }]}>
                  <Text style={[styles.sequenceBadgeText, { color: leftActive ? activeColor : 'rgba(255,255,255,0.25)' }]}>{COMPACT[lang].l}</Text>
                </View>
                <Svg viewBox="0 0 30 50" width={18} height={30}>
                  <Path d="M15 5 C 6 5 3 18 3 28 C 3 38 8 44 15 44 C 22 44 27 38 27 28 C 27 18 24 5 15 5 Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
                  <Line x1="15" y1="5" x2="15" y2="44" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
                </Svg>
                <View style={[styles.sequenceBadge, {
                  borderColor: rightActive ? activeColor : 'rgba(255,255,255,0.18)',
                  backgroundColor: rightActive ? `${activeColor}22` : 'rgba(255,255,255,0.03)',
                }]}>
                  <Text style={[styles.sequenceBadgeText, { color: rightActive ? activeColor : 'rgba(255,255,255,0.25)' }]}>{COMPACT[lang].r}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default function TechInfoDrawer({ tech, visible, onClose }: Props) {
  const colors = useColors();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const info = TECH_INFO[tech];

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const backdropOpacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.65],
  });

  const bottomPad = Platform.OS === 'web' ? 24 : insets.bottom + 8;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Animated.View
        style={[styles.backdrop, { opacity: backdropOpacity }]}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: '#1C130A',
            borderColor: 'rgba(229,169,60,0.15)',
            paddingBottom: bottomPad,
            transform: [{ translateY }],
          },
        ]}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        {/* Handle + close */}
        <View style={styles.handleRow}>
          <View style={[styles.handle, { backgroundColor: colors.border }]} />
          <Pressable
            onPress={onClose}
            hitSlop={12}
            style={({ pressed }) => [styles.closeBtn, { opacity: pressed ? 0.5 : 1 }]}
          >
            <Ionicons name="close" size={22} color={colors.dim} />
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces
        >
          {!info ? (
            <Text style={[styles.noInfo, { color: colors.dim }]}>
              No information available for this technique.
            </Text>
          ) : (
            <>
              {/* Title */}
              <Text style={[styles.title, { color: colors.primary }]}>{info.title}</Text>

              {/* Intro paragraphs */}
              {info.intro.map((para, i) => (
                <StyledText
                  key={i}
                  text={para}
                  style={[styles.introPara, { color: colors.foreground, marginTop: i > 0 ? 8 : 0 }]}
                />
              ))}

              <NostrilSequenceDiagram tech={tech} colors={colors} lang={lang} />

              {/* Sections */}
              {info.sections?.map((sec, si) => (
                <View key={si} style={styles.section}>
                  {sec.title ? (
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>{sec.title}</Text>
                  ) : null}
                  {sec.steps.map((step, i) => (
                    <View key={i} style={styles.stepRow}>
                      <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
                      <StyledText
                        text={step}
                        style={[styles.stepText, { color: colors.foreground }]}
                      />
                    </View>
                  ))}
                </View>
              ))}

              {/* Tip */}
              {info.tip ? (
                <View style={[styles.callout, { borderColor: 'rgba(229,169,60,0.3)', backgroundColor: 'rgba(229,169,60,0.07)' }]}>
                  <Ionicons name="bulb-outline" size={14} color={colors.primary} style={{ marginTop: 1 }} />
                  <StyledText
                    text={info.tip}
                    style={[styles.calloutText, { color: colors.dim }]}
                  />
                </View>
              ) : null}

              {/* Warning */}
              {info.warn ? (
                <View style={[styles.callout, { borderColor: 'rgba(220,80,60,0.35)', backgroundColor: 'rgba(220,80,60,0.08)' }]}>
                  <Ionicons name="warning-outline" size={14} color="#DC5040" style={{ marginTop: 1 }} />
                  <StyledText
                    text={info.warn}
                    style={[styles.calloutText, { color: '#DC9090' }]}
                  />
                </View>
              ) : null}

              {/* Timeline */}
              {info.feel !== '—' ? (
                <View style={[styles.timeline, { borderColor: 'rgba(229,169,60,0.18)', backgroundColor: 'rgba(229,169,60,0.05)' }]}>
                  <View style={styles.timelineRow}>
                    <View style={styles.timelineItem}>
                      <Text style={[styles.timelineLabel, { color: colors.faint }]}>FEEL IT</Text>
                      <Text style={[styles.timelineValue, { color: colors.primary }]}>{info.feel}</Text>
                    </View>
                    <View style={[styles.timelineDivider, { backgroundColor: 'rgba(229,169,60,0.2)' }]} />
                    <View style={styles.timelineItem}>
                      <Text style={[styles.timelineLabel, { color: colors.faint }]}>SEE RESULTS</Text>
                      <Text style={[styles.timelineValue, { color: colors.primary }]}>{info.see}</Text>
                    </View>
                  </View>
                  {info.note ? (
                    <Text style={[styles.timelineNote, { color: colors.dim }]}>{info.note}</Text>
                  ) : null}
                </View>
              ) : null}
            </>
          )}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '82%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 4,
    position: 'relative',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    top: 8,
    padding: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  noInfo: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
  },
  title: {
    fontSize: 19,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
    lineHeight: 26,
  },
  introPara: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Inter_400Regular',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 21,
  },
  callout: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: 'flex-start',
  },
  calloutText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  timeline: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timelineItem: {
    flex: 1,
    gap: 4,
  },
  timelineLabel: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
  },
  timelineValue: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  timelineDivider: {
    width: 1,
    height: 32,
  },
  timelineNote: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
    marginTop: 10,
  },
  sequence: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
  },
  sequenceTitle: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  sequenceScroll: {
    paddingHorizontal: 14,
    gap: 12,
  },
  sequenceStep: {
    width: 92,
    alignItems: 'center',
  },
  sequenceLabel: {
    minHeight: 28,
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    lineHeight: 14,
    textAlign: 'center',
  },
  sequencePair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  sequenceBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sequenceBadgeText: {
    fontSize: 9,
    fontFamily: 'Inter_600SemiBold',
  },
});
