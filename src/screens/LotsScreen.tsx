// // import React, {useState, useMemo} from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   TextInput,
// //   TouchableOpacity,
// //   StatusBar,
// //   ScrollView,
// //   ListRenderItem,
// // } from 'react-native';
// // import {useSafeAreaInsets} from 'react-native-safe-area-context';
// // import {Lot, CategoryName, formatLocationCode} from '../types';
// // import {LOTS, CATEGORIES} from '../data';
// // import {Colors, Typography, Spacing, Radius, GlobalStyles} from '../theme';
// // import {EmptyState} from '../components/SharedComponents';
// // import {LotCard} from '../components/LotCard';

// // type FilterCat = CategoryName | 'All';
// // const CAT_LIST: FilterCat[] = ['All', ...(Object.keys(CATEGORIES) as CategoryName[])];

// // export default function LotsScreen(): React.JSX.Element {
// //   const insets = useSafeAreaInsets();
// //   const [search, setSearch] = useState('');
// //   const [cat, setCat] = useState<FilterCat>('All');

// //   const filtered = useMemo<Lot[]>(() => {
// //     return LOTS.filter(lot => {
// //       const matchCat = cat === 'All' || lot.category === cat;
// //       const q = search.toLowerCase().trim();
// //       if (!q) {return matchCat;}
// //       return (
// //         matchCat &&
// //         (lot.lotNo.toLowerCase().includes(q) ||
// //           lot.item.toLowerCase().includes(q) ||
// //           formatLocationCode(lot.location).toLowerCase().includes(q) ||
// //           lot.subCategory.toLowerCase().includes(q))
// //       );
// //     });
// //   }, [search, cat]);

// //   const renderItem: ListRenderItem<Lot> = ({item}) => <LotCard lot={item} />;

// //   return (
// //     <View style={[GlobalStyles.screen, {paddingTop: insets.top}]}>
// //       <StatusBar barStyle="dark-content" backgroundColor={Colors.card} />

// //       {/* Sticky top section */}
// //       <View style={styles.topSection}>
// //         <Text style={styles.screenTitle}>Lot Inventory</Text>

// //         {/* Search */}
// //         <View style={styles.searchBar}>
// //           <Text style={styles.searchIcon}>🔍</Text>
// //           <TextInput
// //             style={styles.searchInput}
// //             placeholder="LOT no, item or location e.g. 21G-10…"
// //             placeholderTextColor={Colors.muted}
// //             value={search}
// //             onChangeText={setSearch}
// //           />
// //           {search.length > 0 && (
// //             <TouchableOpacity onPress={() => setSearch('')}>
// //               <Text style={styles.clearBtn}>✕</Text>
// //             </TouchableOpacity>
// //           )}
// //         </View>

// //         {/* Category pills */}
// //         <ScrollView
// //           horizontal
// //           showsHorizontalScrollIndicator={false}
// //           contentContainerStyle={styles.pillRow}
// //           style={styles.pillScroll}>
// //           {CAT_LIST.map(c => {
// //             const meta = c !== 'All' ? CATEGORIES[c as CategoryName] : null;
// //             const active = cat === c;
// //             return (
// //               <TouchableOpacity
// //                 key={c}
// //                 style={[styles.pill, active && styles.pillActive]}
// //                 onPress={() => setCat(c)}
// //                 activeOpacity={0.7}>
// //                 <Text style={[styles.pillText, active && styles.pillTextActive]}>
// //                   {meta?.icon} {c}
// //                 </Text>
// //               </TouchableOpacity>
// //             );
// //           })}
// //         </ScrollView>

// //         <Text style={styles.resultCount}>
// //           {filtered.length} lot{filtered.length !== 1 ? 's' : ''} found
// //         </Text>
// //       </View>

// //       {/* Lot list */}
// //       <FlatList
// //         data={filtered}
// //         keyExtractor={item => item.lotNo}
// //         renderItem={renderItem}
// //         contentContainerStyle={[
// //           styles.list,
// //           {paddingBottom: insets.bottom + 80},
// //         ]}
// //         showsVerticalScrollIndicator={false}
// //         ListEmptyComponent={
// //           <EmptyState icon="📦" message="No lots match your search" />
// //         }
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   topSection: {
// //     backgroundColor: Colors.card,
// //     borderBottomWidth: 1,
// //     borderBottomColor: Colors.border,
// //     paddingHorizontal: Spacing.lg,
// //     paddingTop: Spacing.xl,
// //     paddingBottom: Spacing.sm,
// //   },
// //   screenTitle: {
// //     fontSize: Typography['4xl'],
// //     fontWeight: Typography.w900,
// //     color: Colors.text,
// //     marginBottom: Spacing.md,
// //   },
// //   searchBar: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: Colors.bg,
// //     borderWidth: 1,
// //     borderColor: Colors.border,
// //     borderRadius: Radius.md,
// //     paddingHorizontal: Spacing.md,
// //     paddingVertical: Spacing.sm,
// //     gap: Spacing.sm,
// //     marginBottom: Spacing.sm,
// //   },
// //   searchIcon: {fontSize: 14},
// //   searchInput: {
// //     flex: 1,
// //     fontSize: Typography.md,
// //     color: Colors.text,
// //     padding: 0,
// //   },
// //   clearBtn: {
// //     fontSize: Typography.md,
// //     color: Colors.muted,
// //     paddingHorizontal: 4,
// //   },
// //   pillScroll: {marginBottom: Spacing.sm},
// //   pillRow: {gap: Spacing.sm, paddingRight: Spacing.lg},
// //   pill: {
// //     paddingHorizontal: Spacing.md,
// //     paddingVertical: 6,
// //     borderRadius: Radius.full,
// //     backgroundColor: Colors.bg,
// //     borderWidth: 1,
// //     borderColor: Colors.border,
// //   },
// //   pillActive: {backgroundColor: Colors.primary, borderColor: Colors.primary},
// //   pillText: {
// //     fontSize: Typography.sm,
// //     fontWeight: Typography.w700,
// //     color: Colors.muted,
// //   },
// //   pillTextActive: {color: '#FFFFFF'},
// //   resultCount: {
// //     fontSize: Typography.sm,
// //     color: Colors.muted,
// //     marginBottom: 2,
// //   },
// //   list: {padding: Spacing.lg},
// // });

// import React, { useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   StatusBar,
//   ScrollView,
//   ListRenderItem,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Lot, CategoryName, formatLocationCode } from '../types';
// import { LOTS, CATEGORIES } from '../data';
// import { Colors, Typography, Spacing, Radius, GlobalStyles } from '../theme';
// import { EmptyState } from '../components/SharedComponents';
// import { LotCard } from '../components/LotCard';

// type FilterCat = CategoryName | 'All';
// const CAT_LIST: FilterCat[] = [
//   'All',
//   ...(Object.keys(CATEGORIES) as CategoryName[]),
// ];

// // Pick one calm accent color (used very sparingly)
// const ACCENT = '#4b5563'; // cool gray — very subtle
// const ACCENT_ACTIVE = '#1f2937'; // darker gray for active state

// export default function LotsScreen(): React.JSX.Element {
//   const insets = useSafeAreaInsets();
//   const [search, setSearch] = useState('');
//   const [cat, setCat] = useState<FilterCat>('All');

//   const filtered = useMemo<Lot[]>(() => {
//     return LOTS.filter(lot => {
//       const matchCat = cat === 'All' || lot.category === cat;
//       const q = search.toLowerCase().trim();
//       if (!q) return matchCat;
//       return (
//         matchCat &&
//         (lot.lotNo.toLowerCase().includes(q) ||
//           lot.item.toLowerCase().includes(q) ||
//           formatLocationCode(lot.location).toLowerCase().includes(q) ||
//           lot.subCategory.toLowerCase().includes(q))
//       );
//     });
//   }, [search, cat]);

//   const renderItem: ListRenderItem<Lot> = ({ item }) => <LotCard lot={item} />;

//   return (
//     <View style={[GlobalStyles.screen, { paddingTop: insets.top }]}>
//       <StatusBar barStyle="dark-content" backgroundColor="white" />

//       {/* Sticky top section – minimal */}
//       <View style={styles.topSection}>
//         <Text style={styles.screenTitle}>Lot Inventory</Text>

//         {/* Search – very clean */}
//         <View style={styles.searchBar}>
//           <Text style={styles.searchIcon}>🔍</Text>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="LOT no, item or location…"
//             placeholderTextColor="#9ca3af"
//             value={search}
//             onChangeText={setSearch}
//           />
//           {search.length > 0 && (
//             <TouchableOpacity onPress={() => setSearch('')}>
//               <Text style={styles.clearBtn}>✕</Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Category pills – subtle */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.pillRow}
//           style={styles.pillScroll}
//         >
//           {CAT_LIST.map(c => {
//             const meta = c !== 'All' ? CATEGORIES[c as CategoryName] : null;
//             const active = cat === c;
//             return (
//               <TouchableOpacity
//                 key={c}
//                 style={[
//                   styles.pill,
//                   active && {
//                     backgroundColor: ACCENT_ACTIVE,
//                     borderColor: ACCENT_ACTIVE,
//                   },
//                 ]}
//                 onPress={() => setCat(c)}
//                 activeOpacity={0.8}
//               >
//                 <Text style={[styles.pillText, active && { color: 'white' }]}>
//                   {meta?.icon ?? '•'} {c}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>

//         <Text style={styles.resultCount}>
//           {filtered.length} lot{filtered.length !== 1 ? 's' : ''} found
//         </Text>
//       </View>

//       {/* List */}
//       <FlatList
//         data={filtered}
//         keyExtractor={item => item.lotNo}
//         renderItem={renderItem}
//         contentContainerStyle={[
//           styles.list,
//           { paddingBottom: insets.bottom + 80 },
//         ]}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <EmptyState icon="📦" message="No lots match your search" />
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   topSection: {
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb', // very light gray
//     paddingHorizontal: Spacing.lg,
//     paddingTop: Spacing.xl,
//     paddingBottom: Spacing.md,
//   },

//   screenTitle: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#111827', // almost black
//     marginBottom: Spacing.lg,
//   },

//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9fafb',
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: Radius.md,
//     paddingHorizontal: Spacing.md,
//     paddingVertical: Spacing.sm - 2,
//     gap: Spacing.sm,
//     marginBottom: Spacing.md,
//   },

//   searchIcon: {
//     fontSize: 16,
//     color: '#6b7280',
//   },

//   searchInput: {
//     flex: 1,
//     fontSize: 15,
//     color: '#111827',
//     paddingVertical: 2,
//   },

//   clearBtn: {
//     fontSize: 18,
//     color: '#9ca3af',
//     paddingHorizontal: 4,
//   },

//   pillScroll: {
//     marginBottom: Spacing.md,
//   },

//   pillRow: {
//     gap: Spacing.sm,
//     paddingRight: Spacing.xl,
//   },

//   pill: {
//     paddingHorizontal: Spacing.md + 4,
//     paddingVertical: 8,
//     borderRadius: Radius.full,
//     backgroundColor: '#f3f4f6',
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//   },

//   pillText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#4b5563',
//   },

//   resultCount: {
//     fontSize: 13,
//     color: '#6b7280',
//     marginBottom: Spacing.xs,
//   },

//   list: {
//     padding: Spacing.lg,
//     backgroundColor: '#f9fafb', // very light background for list
//   },
// });

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ListRenderItem,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Lot, CategoryName, formatLocationCode } from '../types';
import { LOTS, CATEGORIES } from '../data';
import { Typography, Spacing, Radius, GlobalStyles } from '../theme';
import { EmptyState } from '../components/SharedComponents';
import { LotCard } from '../components/LotCard';

type FilterCat = CategoryName | 'All';
const CAT_LIST: FilterCat[] = [
  'All',
  ...(Object.keys(CATEGORIES) as CategoryName[]),
];

export default function LotsScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState<FilterCat>('All');

  const filtered = useMemo<Lot[]>(() => {
    return LOTS.filter(lot => {
      const matchCat = cat === 'All' || lot.category === cat;
      const q = search.toLowerCase().trim();
      if (!q) return matchCat;
      return (
        matchCat &&
        (lot.lotNo.toLowerCase().includes(q) ||
          lot.item.toLowerCase().includes(q) ||
          formatLocationCode(lot.location).toLowerCase().includes(q) ||
          lot.subCategory.toLowerCase().includes(q))
      );
    });
  }, [search, cat]);

  const renderItem: ListRenderItem<Lot> = ({ item }) => <LotCard lot={item} />;

  return (
    <View style={[GlobalStyles.screen, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Top fixed area */}
      <View style={styles.topSection}>
        <Text style={styles.screenTitle}>Lot Inventory</Text>

        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="LOT no, item or location…"
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearBtn}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillRow}
          style={styles.pillScroll}
        >
          {CAT_LIST.map(c => {
            const meta = c !== 'All' ? CATEGORIES[c as CategoryName] : null;
            const isActive = cat === c;
            return (
              <TouchableOpacity
                key={c}
                style={[styles.pill, isActive && styles.pillActive]}
                onPress={() => setCat(c)}
                activeOpacity={0.85}
              >
                <Text
                  style={[styles.pillText, isActive && styles.pillTextActive]}
                >
                  {meta?.icon ?? '•'} {c}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.resultCount}>
          {filtered.length} lot{filtered.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.lotNo}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState icon="📦" message="No lots match your search" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topSection: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 4,
    paddingBottom: Spacing.md,
  },

  screenTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: Spacing.lg,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    gap: 8,
    marginBottom: Spacing.md,
  },

  searchIcon: {
    fontSize: 16,
    color: '#6b7280',
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  clearBtn: {
    fontSize: 18,
    color: '#9ca3af',
    paddingHorizontal: 4,
  },

  pillScroll: {
    marginBottom: Spacing.md,
  },

  pillRow: {
    gap: Spacing.sm,
    paddingRight: Spacing.xl + 20,
  },

  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },

  pillActive: {
    backgroundColor: '#e2e8f0',
    borderColor: '#4b5563',
  },

  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4b5563',
  },

  pillTextActive: {
    color: 'black',
  },

  resultCount: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: Spacing.xs,
  },

  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    backgroundColor: '#fafafa', // extremely light — almost white
  },
});
