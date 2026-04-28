import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import ReaderScreen from '../screens/ReaderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Colors } from '../constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabBarIcon({ name, color, size }) {
  return <Ionicons name={name} size={size} color={color} />;
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="dark" />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.blur }]} />
          ),
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.primaryMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginBottom: 4 },
        tabBarItemStyle: { paddingTop: 6 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <TabBarIcon name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="DiscoverTab"
        component={DiscoverScreen}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => <TabBarIcon name="compass" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <TabBarIcon name="person" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Main" component={HomeTabs} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen
        name="Reader"
        component={ReaderScreen}
        options={{
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    elevation: 0,
    height: 84,
    paddingBottom: 24,
    backgroundColor: 'transparent',
  },
});
