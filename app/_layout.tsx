import "react-native-reanimated";
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  GestureResponderEvent,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const COURSES = [
  {
    id: "c1",
    title: "Intro to React Native 💕",
    description: "Learn to build your first mobile app with style and sweetness.",
  },
  {
    id: "c2",
    title: "Advanced JavaScript 🌺",
    description: "Master JavaScript like a queen : closures, async & more!",
  },
  {
    id: "c3",
    title: "UI/UX for Developers 🎀",
    description: "Design charming apps that sparkle with usability.",
  },
];

function DrawerToggle({ onPress }: { onPress: (e: GestureResponderEvent) => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ paddingHorizontal: 12, opacity: pressed ? 0.6 : 1 }]}
    >
      <Ionicons name="menu" size={24} color="#ff69b4" />
    </Pressable>
  );
}

function CourseListScreen({ navigation }: any) {
  return (
    <FlatList
      data={COURSES}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.courseCard, pressed && { opacity: 0.8 }]}
          onPress={() =>
            navigation.navigate("CourseDetail", {
              courseId: item.id,
              title: item.title,
              description: item.description,
            })
          }
        >
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.courseDesc}>{item.description}</Text>
        </Pressable>
      )}
    />
  );
}

function CourseDetailScreen({ route }: any) {
  const { title, description, courseId } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.detailId}>Course ID: {courseId}</Text>
      <Text style={styles.detailText}>{description}</Text>
    </View>
  );
}

function WishlistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💌 Your wishlist is empty, bestie!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👑 My Profile</Text>
      <Text style={styles.label}>
        Name: <Text style={styles.value}>Da Silva Ribeiro Elisabete</Text>
      </Text>
      <Text style={styles.label}>
        Username: <Text style={styles.value}>@elisabete.rbr</Text>
      </Text>
      <Text style={styles.label}>
        Email: <Text style={styles.value}>HE133129@students.ephec.be</Text>
      </Text>
    </View>
  );
}

function CoursesStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#ffe6f2" },
        headerTitleStyle: { color: "#ff69b4", fontWeight: "700" },
        headerLeft: () => (
          <DrawerToggle onPress={() => navigation.getParent()?.openDrawer()} />
        ),
      })}
    >
      <Stack.Screen
        name="CourseList"
        component={CourseListScreen}
        options={{ title: "All Courses" }}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={({ navigation, route }) => ({
          headerTitle: "",
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 12,
                }}
              >
                <Ionicons name="arrow-back" size={22} color="#ff69b4" />
                <Text
                  style={{
                    color: "#ff69b4",
                    fontWeight: "600",
                    fontSize: 16,
                    marginLeft: 6,
                  }}
                >
                  {route.params?.title}
                </Text>
              </Pressable>
            </View>
          ),
          headerStyle: { backgroundColor: "#ffe6f2" },
        })}
      />
    </Stack.Navigator>
  );
}

function CoursesTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#ff69b4",
        tabBarInactiveTintColor: "#f4a6c1",
        tabBarStyle: { backgroundColor: "#ffe6f2" },
        tabBarIcon: ({ color, size }) => {
          const name = route.name === "AllCourses" ? "book" : "heart";
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="AllCourses"
        component={CoursesStackScreen}
        options={{ tabBarLabel: "Courses", headerShown: false }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={({ navigation }) => ({
          tabBarLabel: "Wishlist",
          headerStyle: { backgroundColor: "#ffe6f2" },
          headerTitleStyle: { color: "#ff69b4", fontWeight: "700" },
          headerLeft: () => (
            <DrawerToggle onPress={() => navigation.getParent()?.openDrawer()} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  return (
    <Drawer.Navigator
      initialRouteName="Courses"
      screenOptions={{
        headerStyle: { backgroundColor: "#ffe6f2" },
        headerTitleStyle: { color: "#ff69b4", fontWeight: "700" },
        drawerActiveTintColor: "#ff69b4",
        drawerInactiveTintColor: "#f4a6c1",
      }}
    >
      <Drawer.Screen
        name="Courses"
        component={CoursesTabScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="MyProfile"
        component={ProfileScreen}
        options={{ title: "My Profile" }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f5",
    padding: 20,
  },
  list: {
    padding: 16,
  },
  courseCard: {
    backgroundColor: "#ffe6f2",
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    shadowColor: "#ffb6c1",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff69b4",
  },
  courseDesc: {
    color: "#555",
    marginTop: 6,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ff69b4",
    marginBottom: 10,
  },
  detailId: {
    fontSize: 14,
    color: "#999",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ff69b4",
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 6,
    color: "#333",
  },
  value: {
    color: "#ff69b4",
    fontWeight: "600",
  },
});
