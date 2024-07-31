import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native";

import Concert from "../components/Concert";

const HomeScreen = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConcerts = async () => {
    try {
      let url;
      if (Platform.OS === "android") {
        url = "http://10.0.2.2:32783/api/concerts/";
      } else {
        url = "http://my-craft-project.ddev.site/api/concerts/";
      }

      console.log("Fetching from URL:", url);

      const response = await fetch(url, { method: "GET" });
      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Response JSON:", json);
      setConcerts(json.items || []);
    } catch (error) {
      console.error("Error fetching concerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Concerten</Text>
        <FlatList
          data={concerts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <ScrollView horizontal={true} style={styles.Concertcontainer}>
                <Concert
                  title={item.title}
                  concertImage={item.image}
                  price={item.price}
                  location={item.location}
                />
              </ScrollView>
            );
          }}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    flex: 1,
    width: "100%",
    marginTop: 0,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  Concertcontainer: {
    marginLeft: 8,
    marginRight: 8,
  },
});

export default HomeScreen;
