import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  RIPENING_CHAMBERS,
  CLIMACTERIC_FRUITS,
  NON_CLIMACTERIC_FRUITS,
} from '../data';
import {Colors, Typography, Spacing, Radius, GlobalStyles, Shadows} from '../theme';
import {SectionHeader, Tag} from '../components/SharedComponents';

const STAGES = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'];

export default function RipeningScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <View style={[GlobalStyles.screen, {paddingTop: insets.top}]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.card} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {paddingBottom: insets.bottom + 80},
        ]}
        showsVerticalScrollIndicator={false}>
        <SectionHeader
          title="Ripening Chambers"
          subtitle="Ethylene / controlled atmosphere"
        />

        {/* Info banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>🌡️  About Ripening Chambers</Text>
          <Text style={styles.infoBody}>
            Ethylene gas treatment accelerates ripening of climacteric fruits.
            Temperature and gas concentration are tightly controlled per the
            S1–S7 ripening stage protocol.
          </Text>
        </View>

        {/* Active chambers */}
        {RIPENING_CHAMBERS.map(chamber => (
          <View key={chamber.id} style={styles.chamberCard}>
            <View style={styles.chamberHeaderRow}>
              <View>
                <View style={styles.idBadge}>
                  <Text style={styles.idText}>{chamber.id}</Text>
                </View>
                <Text style={styles.commodity}>{chamber.commodity}</Text>
                <Text style={styles.lotRef}>Lot: {chamber.lotNo}</Text>
              </View>
              <View style={styles.etaBox}>
                <Text style={styles.etaLabel}>Ready in</Text>
                <Text style={styles.etaValue}>{chamber.etaDays} days</Text>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              {[
                {icon: '📊', label: 'Stage',    value: `Stage ${chamber.stage}`},
                {icon: '💨', label: 'Ethylene', value: chamber.ethylene},
                {icon: '🌡️', label: 'Temp',     value: chamber.temperature},
              ].map(s => (
                <View key={s.label} style={styles.statBox}>
                  <Text style={styles.statIcon}>{s.icon}</Text>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* Stage progress */}
            <View style={styles.progressSection}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.progressTitle}>Ripening Progress</Text>
                <Text style={styles.progressPct}>{chamber.progress}%</Text>
              </View>
              <View style={styles.stageLabels}>
                {STAGES.map(s => (
                  <Text key={s} style={styles.stageLabel}>{s}</Text>
                ))}
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {width: `${chamber.progress}%`},
                  ]}
                />
              </View>
            </View>
          </View>
        ))}

        {/* Fruit suitability */}
        <View style={styles.fruitCard}>
          <Text style={styles.fruitTitle}>🍌  Ethylene Treatment Suitability</Text>

          <Text style={styles.climacLabel}>✅  Climacteric (Suitable)</Text>
          <View style={styles.tagRow}>
            {CLIMACTERIC_FRUITS.map(f => (
              <Tag
                key={f}
                text={f}
                color={Colors.accent}
                bg={Colors.accentLight}
                style={styles.tagGap}
              />
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.nonClimacLabel}>⛔  Non-Climacteric (Not Suitable)</Text>
          <View style={styles.tagRow}>
            {NON_CLIMACTERIC_FRUITS.map(f => (
              <Tag
                key={f}
                text={f}
                color={Colors.danger}
                bg={Colors.dangerLight}
                style={styles.tagGap}
              />
            ))}
          </View>

          <View style={styles.noticeBox}>
            <Text style={styles.noticeText}>
              Non-climacteric fruits do not respond to ethylene and must NOT be
              placed in ripening chambers.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {paddingHorizontal: Spacing.lg},
  infoBanner: {
    backgroundColor: Colors.ripeningLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.ripening + '22',
  },
  infoTitle: {
    fontSize: Typography.base, fontWeight: Typography.w800,
    color: Colors.ripening, marginBottom: 6,
  },
  infoBody: {
    fontSize: Typography.sm, color: Colors.muted, lineHeight: 18,
  },
  chamberCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  chamberHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  idBadge: {
    backgroundColor: Colors.ripeningLight,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  idText: {
    fontSize: Typography.sm, fontWeight: Typography.w700,
    color: Colors.ripening, fontVariant: ['tabular-nums'],
  },
  commodity: {
    fontSize: Typography['2xl'], fontWeight: Typography.w900, color: Colors.text,
  },
  lotRef: {fontSize: Typography.sm, color: Colors.muted, marginTop: 2},
  etaBox: {alignItems: 'flex-end'},
  etaLabel: {fontSize: Typography.sm, color: Colors.muted},
  etaValue: {
    fontSize: Typography.xl, fontWeight: Typography.w800, color: Colors.accent,
  },
  statsRow: {flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md},
  statBox: {
    flex: 1, backgroundColor: Colors.bg,
    borderRadius: Radius.md, padding: Spacing.sm,
  },
  statIcon: {fontSize: 18, marginBottom: 4},
  statValue: {
    fontSize: Typography.md, fontWeight: Typography.w800, color: Colors.text,
  },
  statLabel: {fontSize: Typography.xs, color: Colors.muted, marginTop: 2},
  progressSection: {},
  progressLabelRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4,
  },
  progressTitle: {
    fontSize: Typography.sm, fontWeight: Typography.w700, color: Colors.text,
  },
  progressPct: {
    fontSize: Typography.sm, fontWeight: Typography.w800, color: Colors.ripening,
  },
  stageLabels: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4,
  },
  stageLabel: {
    fontSize: 9, color: Colors.muted, fontWeight: Typography.w600,
  },
  progressTrack: {
    height: 8, backgroundColor: Colors.border,
    borderRadius: Radius.full, overflow: 'hidden',
  },
  progressFill: {
    height: '100%', backgroundColor: Colors.ripening, borderRadius: Radius.full,
  },
  fruitCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  fruitTitle: {
    fontSize: Typography.md, fontWeight: Typography.w800,
    color: Colors.text, marginBottom: Spacing.md,
  },
  climacLabel: {
    fontSize: Typography.sm, fontWeight: Typography.w700,
    color: Colors.accent, marginBottom: Spacing.xs,
  },
  nonClimacLabel: {
    fontSize: Typography.sm, fontWeight: Typography.w700,
    color: Colors.danger, marginBottom: Spacing.xs,
  },
  tagRow: {flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginBottom: Spacing.sm},
  tagGap: {marginBottom: 2},
  divider: {height: 1, backgroundColor: Colors.border, marginVertical: Spacing.sm},
  noticeBox: {
    backgroundColor: Colors.dangerLight, borderRadius: Radius.md, padding: Spacing.sm,
  },
  noticeText: {fontSize: Typography.sm, color: Colors.danger, lineHeight: 18},
});
