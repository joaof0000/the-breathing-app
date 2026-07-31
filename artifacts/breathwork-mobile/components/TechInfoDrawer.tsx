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

import { TECH_INFO } from '@/data/techniques';
import { useColors } from '@/hooks/useColors';

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

export default function TechInfoDrawer({ tech, visible, onClose }: Props) {
  const colors = useColors();
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
});
