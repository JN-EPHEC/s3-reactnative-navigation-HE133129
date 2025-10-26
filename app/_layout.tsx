import "react-native-reanimated";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏡 Welcome to the App!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤</Text>
      <Text style={styles.text}>Name: John Doe</Text>
      <Text style={styles.text}>Username: @johndoe</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚙️ App Settings</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          // Icônes selon l’onglet
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          headerShown: true,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 18,
  },
});
