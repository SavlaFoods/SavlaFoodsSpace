import {StyleSheet} from 'react-native';

export const Colors = {
  bg: '#F5F7FA',
  card: '#FFFFFF',
  border: '#E2E8F0',
  primary: '#1A56DB',
  primaryLight: '#EBF1FF',
  accent: '#0EA472',
  accentLight: '#E6F7F1',
  warn: '#F59E0B',
  warnLight: '#FFF8E6',
  danger: '#EF4444',
  dangerLight: '#FEF2F2',
  ripening: '#7C3AED',
  ripeningLight: '#F3EEFF',
  text: '#1E293B',
  textSecondary: '#475569',
  muted: '#64748B',
  emptyBg: '#F8FAFC',
} as const;

export const Typography = {
  xs: 10,
  sm: 11,
  base: 12,
  md: 13,
  lg: 14,
  xl: 16,
  '2xl': 18,
  '3xl': 20,
  '4xl': 24,
  w400: '400' as const,
  w500: '500' as const,
  w600: '600' as const,
  w700: '700' as const,
  w800: '800' as const,
  w900: '900' as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
};

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 16,
  full: 999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
};

export const GlobalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
