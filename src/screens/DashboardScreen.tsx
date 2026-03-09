// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import { RootTabParamList, formatLocationCode, getFillPercent } from '../types';
// import { LOTS, CATEGORIES, RIPENING_CHAMBERS, WAREHOUSE_CONFIG } from '../data';
// import { Colors, Typography, Spacing, Radius, GlobalStyles } from '../theme';
// import { KPICard, SectionHeader } from '../components/SharedComponents';

// type Props = {
//   navigation: BottomTabNavigationProp<RootTabParamList, 'Dashboard'>;
// };

// export default function DashboardScreen({
//   navigation,
// }: Props): React.JSX.Element {
//   const insets = useSafeAreaInsets();

//   const usedBays = new Set(LOTS.map(l => formatLocationCode(l.location))).size;
//   const emptyBays = WAREHOUSE_CONFIG.totalBays - usedBays;
//   const nearFull = LOTS.filter(l => getFillPercent(l) >= 75).length;

//   const catCounts: Record<string, number> = {};
//   LOTS.forEach(l => {
//     catCounts[l.category] = (catCounts[l.category] || 0) + 1;
//   });

//   return (
//     <View style={[GlobalStyles.screen, { paddingTop: insets.top }]}>
//       <StatusBar barStyle="dark-content" backgroundColor={Colors.card} />

//       {/* Header bar */}
//       <View style={styles.topBar}>
//         <Text style={styles.topBarBrand}>SAVLAFOODS</Text>
//         <View style={styles.onlineRow}>
//           <View style={styles.onlineDot} />
//           <Text style={styles.onlineText}>Online</Text>
//         </View>
//       </View>

//       <ScrollView
//         contentContainerStyle={[
//           styles.scroll,
//           { paddingBottom: insets.bottom + 80 },
//         ]}
//         showsVerticalScrollIndicator={false}
//       >
//         <SectionHeader
//           title={'Warehouse\nOverview'}
//           subtitle="Supervisor View"
//         />

//         {/* Ripening Banner */}
//         <TouchableOpacity
//           style={styles.ripeningBanner}
//           onPress={() => navigation.navigate('Ripening')}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.ripeningIcon}>🍌</Text>
//           <View style={styles.ripeningInfo}>
//             <Text style={styles.ripeningTitle}>RIPENING CHAMBERS ACTIVE</Text>
//             <Text style={styles.ripeningSubtitle}>
//               {RIPENING_CHAMBERS.length} lots in ethylene treatment · Tap to
//               view
//             </Text>
//           </View>
//           <Text style={styles.ripeningArrow}>›</Text>
//         </TouchableOpacity>

//         {/* KPI Grid */}
//         <View style={styles.kpiRow}>
//           <KPICard
//             icon="🏭"
//             value={WAREHOUSE_CONFIG.totalBays}
//             label="Total Bays"
//             color={Colors.primary}
//             bg={Colors.primaryLight}
//           />
//           <KPICard
//             icon="📦"
//             value={usedBays}
//             label="Occupied"
//             color={Colors.accent}
//             bg={Colors.accentLight}
//           />
//         </View>
//         <View style={[styles.kpiRow, { marginTop: Spacing.sm }]}>
//           <KPICard
//             icon="◻️"
//             value={emptyBays}
//             label="Empty Bays"
//             color={Colors.muted}
//             bg={Colors.emptyBg}
//           />
//           <KPICard
//             icon="⚠️"
//             value={nearFull}
//             label="Near Full"
//             color={Colors.warn}
//             bg={Colors.warnLight}
//           />
//         </View>

//         {/* Category Distribution */}
//         <View style={styles.distCard}>
//           <Text style={styles.distTitle}>Category Distribution</Text>
//           {Object.entries(catCounts).map(([cat, count]) => {
//             const meta = CATEGORIES[cat as keyof typeof CATEGORIES];
//             const pct = Math.round((count / LOTS.length) * 100);
//             return (
//               <View key={cat} style={styles.distRow}>
//                 <View style={styles.distLabelRow}>
//                   <Text style={styles.distCat}>
//                     {meta?.icon} {cat}
//                   </Text>
//                   <Text style={styles.distCount}>
//                     {count} lot{count > 1 ? 's' : ''}
//                   </Text>
//                 </View>
//                 <View style={styles.distTrack}>
//                   <View
//                     style={[
//                       styles.distFill,
//                       {
//                         width: `${pct}%`,
//                         backgroundColor: meta?.color,
//                       },
//                     ]}
//                   />
//                 </View>
//               </View>
//             );
//           })}
//         </View>

//         {/* Space Map CTA */}
//         <TouchableOpacity
//           style={styles.mapCta}
//           onPress={() => navigation.navigate('SpaceMap')}
//           activeOpacity={0.85}
//         >
//           <Text style={styles.mapCtaLabel}>Visual Bay Grid</Text>
//           <Text style={styles.mapCtaTitle}>Explore Space Map →</Text>
//           <View style={styles.mapCtaTagRow}>
//             <View style={styles.mapCtaTag}>
//               <Text style={styles.mapCtaTagText}>🟢 Empty slots visible</Text>
//             </View>
//             <View style={styles.mapCtaTag}>
//               <Text style={styles.mapCtaTagText}>📐 Bay dimensions</Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   topBar: {
//     backgroundColor: Colors.card,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.border,
//     paddingHorizontal: Spacing.lg,
//     paddingVertical: Spacing.sm,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   topBarBrand: {
//     fontSize: Typography.sm,
//     fontWeight: Typography.w700,
//     color: Colors.muted,
//     letterSpacing: 1.2,
//   },
//   onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
//   onlineDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: Colors.accent,
//   },
//   onlineText: {
//     fontSize: Typography.sm,
//     fontWeight: Typography.w700,
//     color: Colors.accent,
//   },
//   scroll: { paddingHorizontal: Spacing.lg },
//   ripeningBanner: {
//     backgroundColor: Colors.ripeningLight,
//     borderRadius: Radius.lg,
//     padding: Spacing.md,
//     marginBottom: Spacing.md,
//     borderWidth: 1.5,
//     borderColor: Colors.ripening + '22',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: Spacing.sm,
//   },
//   ripeningIcon: { fontSize: 22 },
//   ripeningInfo: { flex: 1 },
//   ripeningTitle: {
//     fontSize: Typography.base,
//     fontWeight: Typography.w800,
//     color: Colors.ripening,
//   },
//   ripeningSubtitle: {
//     fontSize: Typography.sm,
//     color: Colors.muted,
//     marginTop: 2,
//   },
//   ripeningArrow: { fontSize: 22, color: Colors.ripening },
//   kpiRow: { flexDirection: 'row', gap: Spacing.sm },
//   distCard: {
//     backgroundColor: Colors.card,
//     borderRadius: Radius.xl,
//     borderWidth: 1,
//     borderColor: Colors.border,
//     padding: Spacing.md,
//     marginTop: Spacing.md,
//     marginBottom: Spacing.md,
//   },
//   distTitle: {
//     fontSize: Typography.md,
//     fontWeight: Typography.w800,
//     color: Colors.text,
//     marginBottom: Spacing.md,
//   },
//   distRow: { marginBottom: Spacing.sm },
//   distLabelRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 4,
//   },
//   distCat: {
//     fontSize: Typography.base,
//     fontWeight: Typography.w600,
//     color: Colors.text,
//   },
//   distCount: { fontSize: Typography.sm, color: Colors.muted },
//   distTrack: {
//     height: 5,
//     backgroundColor: Colors.border,
//     borderRadius: Radius.full,
//     overflow: 'hidden',
//   },
//   distFill: { height: '100%', borderRadius: Radius.full },
//   mapCta: {
//     backgroundColor: Colors.primary,
//     borderRadius: Radius.xl,
//     padding: Spacing.xl,
//     marginBottom: Spacing.md,
//   },
//   mapCtaLabel: {
//     fontSize: Typography.md,
//     fontWeight: Typography.w700,
//     color: 'rgba(255,255,255,0.75)',
//     marginBottom: 4,
//   },
//   mapCtaTitle: {
//     fontSize: Typography['2xl'],
//     fontWeight: Typography.w900,
//     color: '#FFFFFF',
//     marginBottom: Spacing.md,
//   },
//   mapCtaTagRow: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
//   mapCtaTag: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderRadius: Radius.sm,
//     paddingHorizontal: Spacing.sm,
//     paddingVertical: 3,
//   },
//   mapCtaTagText: {
//     fontSize: Typography.xs,
//     color: '#FFFFFF',
//     fontWeight: Typography.w600,
//   },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList, formatLocationCode, getFillPercent } from '../types';
import { LOTS, CATEGORIES, RIPENING_CHAMBERS, WAREHOUSE_CONFIG } from '../data';
import { Colors, Typography, Spacing, Radius, GlobalStyles } from '../theme';
import { KPICard, SectionHeader } from '../components/SharedComponents';

// You can adjust these
const LOGO_SOURCE = require('../assets/SavlaLogo.jpg'); // ← change path / use uri
const ACCENT_COLOR = '#2563eb'; // calm blue (or '#0891b2', '#4f46e5', etc.)
const ACCENT_LIGHT = '#eff6ff';

type Props = {
  navigation: BottomTabNavigationProp<RootTabParamList, 'Dashboard'>;
};

export default function DashboardScreen({
  navigation,
}: Props): React.JSX.Element {
  const insets = useSafeAreaInsets();

  const usedBays = new Set(LOTS.map(l => formatLocationCode(l.location))).size;
  const emptyBays = WAREHOUSE_CONFIG.totalBays - usedBays;
  const nearFull = LOTS.filter(l => getFillPercent(l) >= 75).length;

  const catCounts: Record<string, number> = {};
  LOTS.forEach(l => {
    catCounts[l.category] = (catCounts[l.category] || 0) + 1;
  });

  return (
    <View style={[GlobalStyles.screen, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Minimal header with logo on left */}
      {/* Header – logo + brand name on left, status on right */}
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <Image
            source={LOGO_SOURCE}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandName}>SavlaFoods</Text>
        </View>

        {/* <View style={styles.onlineRow}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Online</Text>
        </View> */}
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="Warehouse Overview" subtitle="Supervisor View" />

        {/* Ripening banner – toned down */}
        <TouchableOpacity
          style={styles.banner}
          onPress={() => navigation.navigate('Ripening')}
          activeOpacity={0.7}
        >
          <Text style={styles.bannerIcon}>🍌</Text>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Ripening Chambers Active</Text>
            <Text style={styles.bannerSubtitle}>
              {RIPENING_CHAMBERS.length} lots in treatment • Tap to view
            </Text>
          </View>
          <Text style={styles.bannerArrow}>→</Text>
        </TouchableOpacity>

        {/* KPI cards – fewer colors */}
        <View style={styles.kpiGrid}>
          <KPICard
            icon="🏭"
            value={WAREHOUSE_CONFIG.totalBays}
            label="Total Bays"
            color={Colors.text}
            bg="#f8fafc"
          />
          <KPICard
            icon="📦"
            value={usedBays}
            label="Occupied"
            color={ACCENT_COLOR}
            bg={ACCENT_LIGHT}
          />
        </View>

        <View style={[styles.kpiGrid, { marginTop: Spacing.sm }]}>
          <KPICard
            icon="◻️"
            value={emptyBays}
            label="Empty Bays"
            color={Colors.muted}
            bg="#f8fafc"
          />
          <KPICard
            icon="⚠️"
            value={nearFull}
            label="Near Full"
            color="#d97706"
            bg="#fffbeb"
          />
        </View>

        {/* Category distribution – simpler bars */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Category Distribution</Text>
          {Object.entries(catCounts).map(([cat, count]) => {
            const meta = CATEGORIES[cat as keyof typeof CATEGORIES];
            const pct = Math.round((count / LOTS.length) * 100);
            return (
              <View key={cat} style={styles.barRow}>
                <View style={styles.barLabelRow}>
                  <Text style={styles.barLabel}>
                    {meta?.icon} {cat}
                  </Text>
                  <Text style={styles.barValue}>
                    {count} lot{count !== 1 ? 's' : ''}
                  </Text>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${pct}%`,
                        backgroundColor: meta?.color ?? ACCENT_COLOR,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>

        {/* Space map CTA – cleaner */}
        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.navigate('SpaceMap')}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaTitle}>Visual Bay Grid</Text>
          <Text style={styles.ctaSubtitle}>Explore Space Map →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingHorizontal: Spacing.lg, // ← more natural padding
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0, // distance between logo and text
  },

  logo: {
    height: 36, // slightly smaller → looks balanced with text
    width: 100, // adjust based on your actual logo aspect ratio
  },

  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a', // dark slate – strong contrast
    letterSpacing: -0.3,
    marginLeft: 20,
  },

  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  onlineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#22c55e',
  },

  onlineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e',
  },

  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  bannerIcon: { fontSize: 24, marginRight: Spacing.sm },
  bannerContent: { flex: 1 },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e40af',
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  bannerArrow: {
    fontSize: 20,
    color: '#1e40af',
    marginLeft: Spacing.sm,
  },

  kpiGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: Spacing.md,
    marginTop: Spacing.lg,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: Spacing.md,
  },

  barRow: { marginBottom: Spacing.sm },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  barLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  barValue: {
    fontSize: 13,
    color: '#64748b',
  },
  barTrack: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
  },

  cta: {
    backgroundColor: ACCENT_COLOR,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  ctaTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
});
