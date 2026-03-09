import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {Colors, Typography, Spacing, Radius} from '../theme';
import {FillStatus, Lot, getFillPercent} from '../types';

// ─── getFillColor ─────────────────────────────────────────────────────────────

export function getFillColor(pct: number): string {
  if (pct >= 95) {return Colors.danger;}
  if (pct >= 75) {return Colors.warn;}
  return Colors.accent;
}

// ─── FillBar ──────────────────────────────────────────────────────────────────

interface FillBarProps {
  lot: Lot;
  height?: number;
}

export function FillBar({lot, height = 6}: FillBarProps): React.JSX.Element {
  const pct = getFillPercent(lot);
  return (
    <View style={[styles.fillTrack, {height}]}>
      <View
        style={[
          styles.fillFill,
          {
            width: `${pct}%`,
            backgroundColor: getFillColor(pct),
            height,
          },
        ]}
      />
    </View>
  );
}

// ─── StatusBadge ──────────────────────────────────────────────────────────────

const STATUS_CFG: Record<
  FillStatus,
  {label: string; color: string; bg: string}
> = {
  empty:     {label: 'Empty',     color: Colors.muted,  bg: Colors.emptyBg},
  available: {label: 'Available', color: Colors.accent,  bg: Colors.accentLight},
  nearFull:  {label: 'Near Full', color: Colors.warn,    bg: Colors.warnLight},
  full:      {label: 'Full',      color: Colors.danger,  bg: Colors.dangerLight},
};

export function StatusBadge({
  status,
}: {
  status: FillStatus;
}): React.JSX.Element {
  const cfg = STATUS_CFG[status];
  return (
    <View style={[styles.badge, {backgroundColor: cfg.bg}]}>
      <Text style={[styles.badgeText, {color: cfg.color}]}>{cfg.label}</Text>
    </View>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────

interface TagProps {
  text: string;
  color?: string;
  bg?: string;
  style?: ViewStyle;
}

export function Tag({
  text,
  color = Colors.muted,
  bg = Colors.emptyBg,
  style,
}: TagProps): React.JSX.Element {
  return (
    <View style={[styles.tag, {backgroundColor: bg}, style]}>
      <Text style={[styles.tagText, {color}]}>{text}</Text>
    </View>
  );
}

// ─── LocationTag ─────────────────────────────────────────────────────────────

export function LocationTag({code}: {code: string}): React.JSX.Element {
  return (
    <View style={[styles.tag, styles.locationTag]}>
      <Text style={styles.locationTagText}>{code}</Text>
    </View>
  );
}

// ─── SectionHeader ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps): React.JSX.Element {
  return (
    <View style={styles.sectionHeader}>
      {subtitle ? (
        <Text style={styles.sectionSub}>{subtitle}</Text>
      ) : null}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

// ─── KPICard ──────────────────────────────────────────────────────────────────

interface KPICardProps {
  icon: string;
  value: number | string;
  label: string;
  color: string;
  bg: string;
}

export function KPICard({
  icon,
  value,
  label,
  color,
  bg,
}: KPICardProps): React.JSX.Element {
  return (
    <View style={[styles.kpiCard, {backgroundColor: bg, borderColor: color + '22'}]}>
      <Text style={styles.kpiIcon}>{icon}</Text>
      <Text style={[styles.kpiValue, {color}]}>{value}</Text>
      <Text style={styles.kpiLabel}>{label}</Text>
    </View>
  );
}

// ─── WarningBanner ───────────────────────────────────────────────────────────

type WarnType = 'warn' | 'danger' | 'info';

const WARN_CFG: Record<WarnType, {bg: string; color: string; icon: string}> = {
  warn:   {bg: Colors.warnLight,    color: '#856404',     icon: '⚠️'},
  danger: {bg: Colors.dangerLight,  color: Colors.danger, icon: '⛔'},
  info:   {bg: Colors.primaryLight, color: Colors.primary, icon: 'ℹ️'},
};

export function WarningBanner({
  message,
  type = 'warn',
}: {
  message: string;
  type?: WarnType;
}): React.JSX.Element {
  const cfg = WARN_CFG[type];
  return (
    <View style={[styles.warnBanner, {backgroundColor: cfg.bg}]}>
      <Text style={[styles.warnText, {color: cfg.color}]}>
        {cfg.icon}  {message}
      </Text>
    </View>
  );
}

// ─── EmptyState ──────────────────────────────────────────────────────────────

export function EmptyState({
  icon = '🔍',
  message,
}: {
  icon?: string;
  message: string;
}): React.JSX.Element {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>{icon}</Text>
      <Text style={styles.emptyMsg}>{message}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  fillTrack: {
    backgroundColor: Colors.border,
    borderRadius: Radius.full,
    overflow: 'hidden',
    width: '100%',
  },
  fillFill: {
    borderRadius: Radius.full,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.sm,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.w700,
  },
  tag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.sm,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: Typography.xs,
    fontWeight: Typography.w600,
  },
  locationTag: {
    backgroundColor: Colors.primaryLight,
  },
  locationTagText: {
    fontSize: Typography.sm,
    fontWeight: Typography.w800,
    color: Colors.primary,
    letterSpacing: 0.8,
    fontVariant: ['tabular-nums'],
  },
  sectionHeader: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  sectionSub: {
    fontSize: Typography.sm,
    fontWeight: Typography.w700,
    color: Colors.muted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: Typography['4xl'],
    fontWeight: Typography.w900,
    color: Colors.text,
    lineHeight: 30,
  },
  kpiCard: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
  },
  kpiIcon: {fontSize: 22, marginBottom: 4},
  kpiValue: {
    fontSize: 28,
    fontWeight: Typography.w900,
    lineHeight: 32,
  },
  kpiLabel: {
    fontSize: Typography.sm,
    color: Colors.muted,
    fontWeight: Typography.w600,
    marginTop: 2,
  },
  warnBanner: {
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  warnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.w700,
    lineHeight: 18,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyIcon: {fontSize: 40, marginBottom: Spacing.md},
  emptyMsg: {
    fontSize: Typography.md,
    fontWeight: Typography.w700,
    color: Colors.muted,
  },
});
