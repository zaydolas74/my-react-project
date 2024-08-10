import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ConcertDetailScreen from "../screens/ConcertDetailScreen";
import LocatieDetailScreen from "../screens/LocatieDetailScreen";
import ArtiestDetailScreen from "../screens/ArtiestDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import LogoImage from "../assets/logo.png";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConcertDetailScreen"
        component={ConcertDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LocatieDetailScreen"
        component={LocatieDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArtiestDetailScreen"
        component={ArtiestDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Image
              source={LogoImage}
              style={{ width: 90, height: 40, resizeMode: "contain" }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="menu" size={24} style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Image
              source={LogoImage}
              style={{
                width: 90,
                height: 40,
                resizeMode: "contain",
              }}
            />
          ),
          headerTitle: "",
        })}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerLabel: "Favorites",
        }}
      />
    </Drawer.Navigator>
  );
}
