import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootTabParamList } from '../types';
import { Colors, Typography, Radius } from '../theme';

import DashboardScreen from '../screens/DashboardScreen';
import SpaceMapScreen from '../screens/SpaceMapScreen';
import LotsScreen from '../screens/LotsScreen';
import AdvisorScreen from '../screens/AdvisorScreen';
import RipeningScreen from '../screens/RipeningScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TAB_CFG: Record<keyof RootTabParamList, { icon: string; label: string }> =
  {
    Dashboard: { icon: '🏠', label: 'Home' },
    SpaceMap: { icon: '🗺️', label: 'Map' },
    Lots: { icon: '📦', label: 'Lots' },
    Advisor: { icon: '🌡️', label: 'Advisor' },
    Ripening: { icon: '🍌', label: 'Ripening' },
  };

export default function AppNavigator(): React.JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 8 },
        ],
        tabBarIcon: ({ focused }) => {
          const cfg = TAB_CFG[route.name];
          return (
            <View style={styles.tabItem}>
              <Text style={styles.tabIcon}>{cfg.icon}</Text>
              <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
                {cfg.label}
              </Text>
              {focused && <View style={styles.tabIndicator} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="SpaceMap" component={SpaceMapScreen} />
      <Tab.Screen name="Lots" component={LotsScreen} />
      <Tab.Screen name="Advisor" component={AdvisorScreen} />
      <Tab.Screen name="Ripening" component={RipeningScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 64,
    paddingTop: 6,
    paddingBottom: 4,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  tabItem: { alignItems: 'center', gap: 2, width: 70 },
  tabIcon: { fontSize: 20 },
  tabLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.w500,
    color: Colors.muted,
    textAlign: 'center',
  },
  tabLabelActive: {
    fontWeight: Typography.w800,
    color: Colors.primary,
  },
  tabIndicator: {
    width: 18,
    height: 3,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    marginTop: 1,
  },
});
