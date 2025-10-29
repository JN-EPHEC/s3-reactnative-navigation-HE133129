import "react-native-reanimated";
import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

export type RootTabParamList = {
  Shop: undefined;
  MyCart: undefined;
};

export type ShopStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string; name: string; description: string };
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const ShopStack = createNativeStackNavigator<ShopStackParamList>();

const PRODUCTS = [
  { id: "1", name: "Laptop", description: "High performance laptop for work and gaming." },
  { id: "2", name: "Mouse", description: "Wireless mouse with ergonomic design." },
  { id: "3", name: "Keyboard", description: "Mechanical keyboard with RGB lighting." },
];

function ProductListScreen({ navigation }: any) {
  const renderItem = ({ item }: { item: typeof PRODUCTS[number] }) => (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          productId: item.id,
          name: item.name,
          description: item.description,
        })
      }
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </Pressable>
  );

  return (
    <FlatList
      data={PRODUCTS}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

function ProductDetailScreen({ route }: any) {
  const { name, description } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

function ShopStackScreen() {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "Products" }}
      />
      <ShopStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product Details" }}
      />
    </ShopStack.Navigator>
  );
}

function MyCartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Your Shopping Cart is empty</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Shop"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "Shop") iconName = focused ? "cart" : "cart-outline";
          else if (route.name === "MyCart") iconName = focused ? "bag" : "bag-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Shop" component={ShopStackScreen} />
      <Tab.Screen name="MyCart" component={MyCartScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    padding: 16,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  itemPressed: {
    opacity: 0.7,
  },
  itemText: {
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});
