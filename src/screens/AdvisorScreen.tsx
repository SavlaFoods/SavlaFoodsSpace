import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CategoryName} from '../types';
import {CATEGORIES, CONTAINER_META} from '../data';
import {Colors, Typography, Spacing, Radius, GlobalStyles} from '../theme';
import {SectionHeader, Tag, WarningBanner} from '../components/SharedComponents';

export default function AdvisorScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<CategoryName | null>(null);

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
          title="Container Advisor"
          subtitle="Right storage for every category"
        />

        {(
          Object.entries(CATEGORIES) as [
            CategoryName,
            (typeof CATEGORIES)[CategoryName],
          ][]
        ).map(([cat, meta]) => {
          const container = CONTAINER_META[meta.containerType];
          const isOpen = open === cat;

          return (
            <View key={cat} style={styles.accordionCard}>
              <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => setOpen(isOpen ? null : cat)}
                activeOpacity={0.75}>
                <View
                  style={[
                    styles.catIconBox,
                    {backgroundColor: meta.bgColor},
                  ]}>
                  <Text style={styles.catIcon}>{meta.icon}</Text>
                </View>
                <View style={styles.catInfo}>
                  <Text style={styles.catName}>{cat}</Text>
                  <Text style={styles.catMeta}>
                    {meta.tempRange}  ·  RH {meta.humidity}
                  </Text>
                </View>
                <View style={styles.accordionRight}>
                  <Tag
                    text={`${container.icon} ${meta.containerType}`}
                    color={container.color}
                    bg={Colors.emptyBg}
                  />
                  <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
                </View>
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.body}>
                  {meta.note && (
                    <WarningBanner message={meta.note} type="warn" />
                  )}

                  <View style={styles.statsGrid}>
                    <View style={styles.statBox}>
                      <Text style={styles.statLabel}>TEMPERATURE</Text>
                      <Text style={styles.statValue}>{meta.tempRange}</Text>
                    </View>
                    <View style={styles.statBox}>
                      <Text style={styles.statLabel}>HUMIDITY</Text>
                      <Text style={styles.statValue}>{meta.humidity}</Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.containerBox,
                      {borderLeftColor: container.color},
                    ]}>
                    <Text
                      style={[
                        styles.containerTitle,
                        {color: container.color},
                      ]}>
                      {container.icon}  {meta.containerType}
                    </Text>
                    <Text style={styles.containerDesc}>
                      {container.description}
                    </Text>
                  </View>

                  <Text style={styles.subLabel}>Sub-categories</Text>
                  <View style={styles.tagRow}>
                    {Object.keys(meta.subCategories).map(sub => (
                      <Tag key={sub} text={sub} style={styles.tagGap} />
                    ))}
                  </View>

                  <Text style={styles.subLabel}>Sample Items</Text>
                  <View style={styles.tagRow}>
                    {Object.values(meta.subCategories)
                      .flat()
                      .slice(0, 8)
                      .map(item => (
                        <Tag
                          key={item}
                          text={item}
                          color={meta.color}
                          bg={meta.bgColor}
                          style={styles.tagGap}
                        />
                      ))}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {paddingHorizontal: Spacing.lg},
  accordionCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  catIconBox: {
    width: 46, height: 46, borderRadius: Radius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  catIcon: {fontSize: 22},
  catInfo: {flex: 1},
  catName: {
    fontSize: Typography.lg, fontWeight: Typography.w800, color: Colors.text,
  },
  catMeta: {fontSize: Typography.sm, color: Colors.muted, marginTop: 2},
  accordionRight: {alignItems: 'flex-end', gap: 4},
  chevron: {fontSize: Typography.base, color: Colors.muted},
  body: {
    borderTopWidth: 1, borderTopColor: Colors.border,
    padding: Spacing.md, backgroundColor: '#FAFBFD',
  },
  statsGrid: {flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.sm},
  statBox: {
    flex: 1, backgroundColor: Colors.card,
    borderRadius: Radius.md, padding: Spacing.sm,
  },
  statLabel: {
    fontSize: Typography.xs, fontWeight: Typography.w700,
    color: Colors.muted, textTransform: 'uppercase', letterSpacing: 0.6,
  },
  statValue: {
    fontSize: Typography.lg, fontWeight: Typography.w800,
    color: Colors.text, marginTop: 3,
  },
  containerBox: {borderLeftWidth: 3, paddingLeft: Spacing.sm, marginBottom: Spacing.md},
  containerTitle: {fontSize: Typography.base, fontWeight: Typography.w800, marginBottom: 3},
  containerDesc: {fontSize: Typography.sm, color: Colors.muted, lineHeight: 18},
  subLabel: {
    fontSize: Typography.sm, fontWeight: Typography.w700,
    color: Colors.text, marginBottom: Spacing.xs, marginTop: Spacing.sm,
  },
  tagRow: {flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs},
  tagGap: {marginBottom: 2},
});
