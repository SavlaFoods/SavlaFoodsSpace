import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Lot, formatLocationCode, getFillPercent, getFillStatus} from '../types';
import {CATEGORIES, CONTAINER_META} from '../data';
import {Colors, Typography, Spacing, Radius, Shadows} from '../theme';
import {
  FillBar,
  StatusBadge,
  Tag,
  LocationTag,
  WarningBanner,
  getFillColor,
} from './SharedComponents';

interface Props {
  lot: Lot;
}

export function LotCard({lot}: Props): React.JSX.Element {
  const meta = CATEGORIES[lot.category];
  const container = CONTAINER_META[meta.containerType];
  const pct = getFillPercent(lot);
  const status = getFillStatus(lot);
  const spare = lot.maxUnits - lot.units;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconBox, {backgroundColor: meta.bgColor}]}>
            <Text style={styles.iconText}>{meta.icon}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.itemName}>{lot.item}</Text>
            <Text style={styles.subCat}>
              {lot.subCategory} · {lot.category}
            </Text>
          </View>
        </View>
        <StatusBadge status={status} />
      </View>

      {/* Fill bar */}
      <FillBar lot={lot} height={6} />
      <View style={styles.fillMeta}>
        <Text style={styles.fillMetaText}>
          {lot.units}/{lot.maxUnits} units
        </Text>
        <Text
          style={[
            styles.fillMetaText,
            {fontWeight: Typography.w700, color: getFillColor(pct)},
          ]}>
          {pct}%
        </Text>
      </View>

      {/* Tags row */}
      <View style={styles.tagRow}>
        <Tag
          text={lot.lotNo}
          color={Colors.primary}
          bg={Colors.primaryLight}
        />
        <LocationTag code={formatLocationCode(lot.location)} />
        <Tag
          text={`${container.icon} ${meta.containerType}`}
          color={container.color}
          bg={Colors.emptyBg}
        />
        <Tag text={meta.tempRange} />
      </View>

      {/* Expiry */}
      {lot.expiryDate ? (
        <Text style={styles.expiry}>Expires: {lot.expiryDate}</Text>
      ) : null}

      {/* Spare capacity */}
      {spare > 0 && (
        <View style={styles.spareBox}>
          <Text style={styles.spareText}>
            📐{'  '}
            <Text style={styles.spareBold}>{spare} units</Text> of spare
            capacity available in this bay
          </Text>
        </View>
      )}

      {/* Spice isolation */}
      {lot.category === 'Spices' && (
        <WarningBanner
          message="Isolated bay — aromatic cross-contamination risk"
          type="warn"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: Spacing.sm,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {fontSize: 22},
  headerInfo: {flex: 1},
  itemName: {
    fontSize: Typography.lg,
    fontWeight: Typography.w800,
    color: Colors.text,
  },
  subCat: {
    fontSize: Typography.sm,
    color: Colors.muted,
    marginTop: 2,
  },
  fillMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: Spacing.sm,
  },
  fillMetaText: {
    fontSize: Typography.sm,
    color: Colors.muted,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  expiry: {
    fontSize: Typography.xs,
    color: Colors.muted,
    marginBottom: Spacing.xs,
  },
  spareBox: {
    backgroundColor: Colors.emptyBg,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  spareText: {
    fontSize: Typography.sm,
    color: Colors.muted,
  },
  spareBold: {
    color: Colors.accent,
    fontWeight: Typography.w700,
  },
});
