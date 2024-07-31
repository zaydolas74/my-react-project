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
} from "react-native";

const HomeScreen = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConcerts = async () => {
    try {
      let url;
      if (Platform.OS === "android") {
        url = "http://10.0.2.2:50589/api/concerts/";
      } else {
        url = "http://localhost:50589/api/concerts/";
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
      <View style={styles.container}>
        <Text style={styles.title}>Concerten</Text>
        <FlatList
          data={concerts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.concertContainer}>
              <Image
                source={{
                  uri: item.image?.replace(
                    "https://my-craft-project.ddev.site",
                    "http://10.0.2.2:50589"
                  ),
                }}
                style={styles.image}
              />

              <Text style={styles.concertTitle}>{item.title}</Text>
              <Text style={styles.concertLocation}>{item.location}</Text>
              <Text style={styles.concertPrice}>€{item.price}</Text>
            </View>
          )}
        />
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
    color: "#333",
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
