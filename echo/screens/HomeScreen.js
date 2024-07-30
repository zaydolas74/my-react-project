import React, { useState, useEffect } from "react";
import Concert from "../components/Concert";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";

const HomeScreen = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchConcerts = async () => {
    try {
      let url;
      if (Platform.OS === "android") {
        url = "http://10.0.2.2:51773/api/concerts/";
      } else {
        url = "http://my-craft-project.ddev.site/api/concerts/"; // Ensure this endpoint is correct
      }

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Response JSON:", json); // Log the response to inspect it
      setConcerts(json.items || []); // Adjust access based on the structure
    } catch (error) {
      console.error("Error fetching concerts:", error);
    } finally {
      setLoading(false); // Hide loading indicator after fetch
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
      <View style={styles.container}>
        <Text style={styles.title}>Concerten</Text>
        <FlatList
          data={concerts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            if (Platform.OS == "android") {
              item.image = item.image.replace(
                "sport.ddev.site",
                "10.0.2.2:55001"
              );
            }
            return (
              <Concert
                id={item.id}
                title={item.title}
                concertImage={item.image}
                price={item.price}
              />
            );
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>andere moeten hier onder komen</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  concertContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    padding: 10,
    flex: 1,
  },
  concertTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  concertLocation: {
    fontSize: 16,
    color: "#555",
  },
  concertPrice: {
    fontSize: 16,
    color: "#333",
  },
});

export default HomeScreen;
