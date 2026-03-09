import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FloorCode = 'G' | '1' | '2';
type Side = 'L' | 'R';

interface Lot {
  lotNo: string;
  item: string;
  subCategory: string;
  category: string;
  units: number;
  maxUnits: number;
}

interface ContainerData {
  id: number;
  buildingFloor: FloorCode;
  temperature: string;
  tempIcon: string;
  allowedCategories: string[];
  totalUnits: number;
  filledUnits: number;
}

// ─── Design Tokens ───────────────────────────────────────────────────────────
const T = {
  pageBg: '#F5F3EE',
  cardBg: '#FFFFFF',
  cardWarm: '#FAFAF8',
  passageBg: '#EDF0F7',
  passageBorder: '#C9D0E0',
  borderFaint: '#EEEBE5',
  borderLight: '#E0DDD6',
  ink: '#18181B',
  inkLight: '#A1A1AA',
  greenBar: '#059669',
  amberBar: '#D97706',
  redBar: '#DC2626',
  blue: '#2563EB',
  blueBg: '#EFF6FF',
};

// ─── Mock Data – Containers placed on different building floors ───────────────
const CONTAINERS: ContainerData[] = [
  {
    id: 1,
    buildingFloor: 'G',
    temperature: '22°C Ambient',
    tempIcon: '🏠',
    allowedCategories: ['Dry', 'Pharma'],
    totalUnits: 3000,
    filledUnits: 1840,
  },
  {
    id: 2,
    buildingFloor: 'G',
    temperature: '4°C Chilled',
    tempIcon: '❄️',
    allowedCategories: ['Dairy', 'Produce'],
    totalUnits: 3000,
    filledUnits: 2650,
  },
  {
    id: 3,
    buildingFloor: '1',
    temperature: '-18°C Frozen',
    tempIcon: '❄️❄️',
    allowedCategories: ['Frozen'],
    totalUnits: 3000,
    filledUnits: 2980,
  },
  {
    id: 4,
    buildingFloor: '2',
    temperature: '22°C Ambient',
    tempIcon: '🏠',
    allowedCategories: ['Dry'],
    totalUnits: 3000,
    filledUnits: 920,
  },
];

const FLOORS: { code: FloorCode; label: string }[] = [
  { code: 'G', label: 'G' },
  { code: '1', label: '1' },
  { code: '2', label: '2' },
];

const BAYS_PER_SIDE = 5;
const CW = 28;
const CH = 42;

// ─── Mock Bay Data (same logic as before, more filled bays) ──────────────────
const ITEM_SEEDS = [
  { item: 'Rice 10kg', cat: 'Dry', u: 180, m: 200 },
  { item: 'Wheat Flour', cat: 'Dry', u: 90, m: 100 },
  { item: 'Tomatoes', cat: 'Produce', u: 65, m: 120 },
  { item: 'Frozen Chicken', cat: 'Frozen', u: 45, m: 80 },
  { item: 'Milk Packs', cat: 'Dairy', u: 140, m: 150 },
  { item: 'Paracetamol', cat: 'Pharma', u: 195, m: 200 },
];

const OCCUPIED_BAYS = [
  { cid: 1, fl: 'G', side: 'L', bay: 1 },
  { cid: 1, fl: 'G', side: 'R', bay: 3 },
  { cid: 1, fl: '1', side: 'L', bay: 2 },
  { cid: 2, fl: 'G', side: 'L', bay: 2 },
  { cid: 2, fl: 'G', side: 'R', bay: 1 },
  { cid: 3, fl: 'G', side: 'R', bay: 4 },
  { cid: 3, fl: '1', side: 'L', bay: 1 },
  { cid: 3, fl: '2', side: 'R', bay: 5 },
  { cid: 4, fl: 'G', side: 'L', bay: 3 },
  { cid: 4, fl: '1', side: 'R', bay: 2 },
];

// (buildWarehouse, getBay, getStatus functions remain the same – using previous safe version)

interface BayData {
  containerId: number;
  floor: FloorCode;
  side: Side;
  bayNo: number;
  lot?: Lot;
  fillPct: number;
}

type SelectedKey = {
  cid: number;
  fl: FloorCode;
  side: Side;
  bay: number;
} | null;

const WAREHOUSE: BayData[] = []; // filled by buildWarehouse below

function buildWarehouse() {
  const rows: BayData[] = [];
  CONTAINERS.forEach(cont => {
    FLOORS.forEach(({ code: fl }) => {
      ['L', 'R'].forEach((side: Side) => {
        for (let bayNo = 1; bayNo <= BAYS_PER_SIDE; bayNo++) {
          const occ = OCCUPIED_BAYS.find(
            o =>
              o.cid === cont.id &&
              o.fl === fl &&
              o.side === side &&
              o.bay === bayNo,
          );
          let lot: Lot | undefined;
          if (occ) {
            const it = ITEM_SEEDS[occ.bay % ITEM_SEEDS.length];
            lot = {
              lotNo: `L${cont.id}${fl}${bayNo}`,
              item: it.item,
              subCategory: it.cat,
              category: it.cat,
              units: it.u,
              maxUnits: it.m,
            };
          }
          rows.push({
            containerId: cont.id,
            floor: fl,
            side,
            bayNo,
            lot,
            fillPct: lot ? Math.round((lot.units / lot.maxUnits) * 100) : 0,
          });
        }
      });
    });
  });
  return rows;
}

const WAREHOUSE_DATA = buildWarehouse();

function getBay(
  cid: number,
  fl: FloorCode,
  side: Side,
  bayNo: number,
): BayData {
  return (
    WAREHOUSE_DATA.find(
      b =>
        b.containerId === cid &&
        b.floor === fl &&
        b.side === side &&
        b.bayNo === bayNo,
    ) || {
      containerId: cid,
      floor: fl,
      side,
      bayNo,
      lot: undefined,
      fillPct: 0,
    }
  );
}

function getStatus(pct: number) {
  if (pct === 0)
    return {
      bg: '#F4F2EE',
      border: '#DDD9D1',
      bar: '#A8A39A',
      text: '#A1A1AA',
      label: 'EMPTY',
    };
  if (pct < 60)
    return {
      bg: '#ECFDF5',
      border: '#6EE7B7',
      bar: '#059669',
      text: '#065F46',
      label: 'IN USE',
    };
  if (pct < 85)
    return {
      bg: '#FFFBEB',
      border: '#FCD34D',
      bar: '#D97706',
      text: '#92400E',
      label: 'FILLING',
    };
  return {
    bg: '#FFF1F2',
    border: '#FCA5A5',
    bar: '#DC2626',
    text: '#991B1B',
    label: 'NEAR FULL / FULL',
  };
}

// BayCell, FloorRow, BayDetailPanel (same as previous working version – included below for completeness)

function BayCell({ data, isSelected, onPress }: any) {
  const st = getStatus(data.fillPct);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        bc.cell,
        {
          backgroundColor: st.bg,
          borderColor: isSelected ? T.blue : st.border,
        },
        isSelected && bc.sel,
      ]}
    >
      {data.fillPct > 0 && (
        <View
          style={[
            bc.fill,
            { height: `${data.fillPct}%`, backgroundColor: st.bar + '66' },
          ]}
        />
      )}
      <Text style={[bc.num, { color: isSelected ? T.blue : st.text }]}>
        {data.bayNo}
      </Text>
      {data.fillPct > 0 && (
        <Text style={[bc.pct, { color: st.text }]}>{data.fillPct}%</Text>
      )}
      {isSelected && <View style={bc.pip} />}
    </TouchableOpacity>
  );
}

const bc = StyleSheet.create({
  cell: {
    width: CW,
    height: CH,
    borderRadius: 6,
    borderWidth: 1.5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sel: {
    borderWidth: 2.5,
    transform: [{ scale: 1.08 }],
    shadowColor: T.blue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  fill: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  num: { fontSize: 10, fontWeight: '800', zIndex: 2 },
  pct: { fontSize: 8, fontWeight: '700', zIndex: 2, marginTop: 2 },
  pip: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: T.blue,
  },
});

// FloorRow (unchanged)
function FloorRow({ cid, floorCode, floorLabel, selected, onSelect }: any) {
  return (
    <View style={flr.row}>
      <View style={flr.lbl}>
        <Text style={flr.lblTxt}>{floorLabel}</Text>
      </View>
      <View style={flr.side}>
        {Array.from({ length: BAYS_PER_SIDE }, (_, i) => i + 1).map(b => {
          const data = getBay(cid, floorCode, 'L', b);
          const isSel =
            selected?.cid === cid &&
            selected?.fl === floorCode &&
            selected?.side === 'L' &&
            selected?.bay === b;
          return (
            <BayCell
              key={`L${b}`}
              data={data}
              isSelected={isSel}
              onPress={() =>
                onSelect(
                  isSel ? null : { cid, fl: floorCode, side: 'L', bay: b },
                )
              }
            />
          );
        })}
      </View>
      <View style={flr.passage}>
        <View style={flr.passageLine} />
        <View style={flr.passageNode}>
          <Text style={flr.passageArrow}>↕</Text>
        </View>
        <View style={flr.passageLine} />
      </View>
      <View style={flr.side}>
        {Array.from({ length: BAYS_PER_SIDE }, (_, i) => i + 1).map(b => {
          const data = getBay(cid, floorCode, 'R', b);
          const isSel =
            selected?.cid === cid &&
            selected?.fl === floorCode &&
            selected?.side === 'R' &&
            selected?.bay === b;
          return (
            <BayCell
              key={`R${b}`}
              data={data}
              isSelected={isSel}
              onPress={() =>
                onSelect(
                  isSel ? null : { cid, fl: floorCode, side: 'R', bay: b },
                )
              }
            />
          );
        })}
      </View>
    </View>
  );
}

const flr = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  lbl: { width: 20, alignItems: 'center' },
  lblTxt: { fontSize: 9, fontWeight: '900', color: T.inkLight },
  side: { flex: 1, flexDirection: 'row', gap: 3, minWidth: 145 },
  passage: {
    width: 24,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passageLine: { flex: 1, width: 1, backgroundColor: T.passageBorder },
  passageNode: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: T.passageBg,
    borderWidth: 1,
    borderColor: T.passageBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passageArrow: { fontSize: 9, color: T.inkLight },
});

// ─── Bay Detail Panel with Capacity ──────────────────────────────────────────
function BayDetailPanel({
  sel,
  onClose,
}: {
  sel: NonNullable<SelectedKey>;
  onClose: () => void;
}) {
  const data = getBay(sel.cid, sel.fl, sel.side, sel.bay);
  const lot = data.lot;
  const pct = data.fillPct;
  const st = getStatus(pct);

  const remaining = lot ? lot.maxUnits - lot.units : lot?.maxUnits ?? 0;

  const anim = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.spring(anim, { toValue: 1, useNativeDriver: true }).start();
  }, [sel]);

  return (
    <Animated.View
      style={[
        dp.card,
        {
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View
        style={[dp.accent, { backgroundColor: lot ? st.bar : '#059669' }]}
      />
      <View style={dp.body}>
        <View style={dp.hdr}>
          <Text style={dp.title}>
            C{sel.cid} • Floor {sel.fl} • {sel.side} Bay {sel.bay}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 20 }}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={dp.capacityBox}>
          <Text style={dp.capacityTitle}>STORAGE CAPACITY</Text>

          {lot ? (
            <>
              <Text style={dp.capacityMain}>
                {lot.units} / {lot.maxUnits} units
              </Text>
              <Text style={dp.remainingText}>
                Can fit <Text style={{ fontWeight: '800' }}>{remaining}</Text>{' '}
                more boxes more units • {pct}% filled
              </Text>
            </>
          ) : (
            <>
              <Text style={dp.capacityEmpty}>Empty bay — ready for stock</Text>
              <Text
                style={[
                  dp.remainingText,
                  remaining < 20 && { color: '#DC2626' },
                  remaining < 60 && remaining >= 20 && { color: '#D97706' },
                  remaining >= 60 && { color: '#059669' },
                ]}
              >
                Can fit <Text style={{ fontWeight: '800' }}>{remaining}</Text>{' '}
                more units
              </Text>
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

const dp = StyleSheet.create({
  card: {
    marginTop: 8,
    backgroundColor: T.cardWarm,
    borderTopWidth: 1,
    borderTopColor: T.borderFaint,
  },
  accent: { height: 6 },
  body: { padding: 16 },
  hdr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 16, fontWeight: '700' },

  capacityBox: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  capacityTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
    marginBottom: 6,
  },
  capacityMain: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1F2937',
  },
  capacityEmpty: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 4,
  },
  // ── new ──
  remainingText: {
    fontSize: 15,
    color: '#4B5563',
    marginTop: 6,
  },
});

// ─── Container Card with Temperature & Allowed Categories ────────────────────
function ContainerCard({
  container,
  selected,
  onSelect,
}: {
  container: ContainerData;
  selected: SelectedKey;
  onSelect: (k: SelectedKey) => void;
}) {
  const filledPct = Math.round(
    (container.filledUnits / container.totalUnits) * 100,
  );
  const isActive = selected?.cid === container.id;

  return (
    <View style={[con.card, isActive && con.active]}>
      {/* Container Header */}
      <View style={con.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={con.title}>Container {container.id}</Text>
          <Text style={{ fontSize: 20 }}>{container.tempIcon}</Text>
        </View>
        <Text style={con.temp}>{container.temperature}</Text>
      </View>

      {/* Allowed Categories */}
      <View style={con.categories}>
        {container.allowedCategories.map(cat => (
          <View key={cat} style={con.categoryChip}>
            <Text style={con.categoryText}>{cat}</Text>
          </View>
        ))}
      </View>

      {/* Capacity Bar */}
      <View style={con.capacityBar}>
        <View style={[con.fillBar, { width: `${filledPct}%` }]} />
        <Text style={con.capacityText}>
          {filledPct}% filled • {container.filledUnits}/{container.totalUnits}{' '}
          units
        </Text>
      </View>

      {/* Internal Floors + Bays */}
      <View style={con.floors}>
        {FLOORS.map(fl => (
          <View key={fl.code}>
            <FloorRow
              cid={container.id}
              floorCode={fl.code}
              floorLabel={fl.label}
              selected={selected}
              onSelect={onSelect}
            />
            <View style={con.divider} />
          </View>
        ))}
      </View>

      {/* Detail Panel appears here */}
      {isActive && selected && (
        <BayDetailPanel sel={selected} onClose={() => onSelect(null)} />
      )}
    </View>
  );
}

const con = StyleSheet.create({
  card: {
    backgroundColor: T.cardBg,
    borderRadius: 14,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0DDD6',
  },
  active: { borderColor: T.blue, borderWidth: 2 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#F8F9FA',
  },
  title: { fontSize: 18, fontWeight: '800' },
  temp: { fontSize: 14, fontWeight: '600', color: '#334155' },
  categories: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  categoryChip: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: { fontSize: 11, fontWeight: '700', color: '#1E40AF' },
  capacityBar: {
    height: 8,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 14,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  fillBar: { height: '100%', backgroundColor: '#059669' },
  capacityText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    color: '#64748B',
  },
  floors: { padding: 8 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 6 },
});

// ─── Main Screen – Complete Building View ────────────────────────────────────
export default function WarehouseBuildingScreen() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<SelectedKey>(null);

  const floors = ['G', '1', '2'] as FloorCode[];

  return (
    <View
      style={{ flex: 1, backgroundColor: T.pageBg, paddingTop: insets.top }}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 60,
        }}
      >
        <Text style={building.title}>WAREHOUSE BUILDING</Text>
        <Text style={building.subtitle}>Real-time Space & Temperature Map</Text>

        {floors.map(buildingFloor => {
          const containersOnFloor = CONTAINERS.filter(
            c => c.buildingFloor === buildingFloor,
          );
          return (
            <View key={buildingFloor} style={building.floorSection}>
              <Text style={building.floorLabel}>
                FLOOR {buildingFloor === 'G' ? 'GROUND' : buildingFloor}
              </Text>
              {containersOnFloor.map(cont => (
                <ContainerCard
                  key={cont.id}
                  container={cont}
                  selected={selected}
                  onSelect={setSelected}
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const building = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  floorSection: { marginBottom: 32 },
  floorLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 12,
    letterSpacing: 1,
  },
});
