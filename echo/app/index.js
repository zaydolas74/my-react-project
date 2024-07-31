import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen"; // Import HomeScreen correctly
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons

import LogoImage from "../assets/logo.png";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
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
          headerTitle: "", // Remove the default title to only show logo
        })}
      />
    </Drawer.Navigator>
  );
}
