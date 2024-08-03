import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native";

import Concert from "../components/Concert";
import Locatie from "../components/Locatie";
import Artiest from "../components/Artiest";

const HomeScreen = ({ navigation }) => {
  const [concerts, setConcerts] = useState([]);
  const [locaties, setLocaties] = useState([]);
  const [artiesten, setArtiesten] = useState([]);
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

  const fetchLocaties = async () => {
    try {
      let url;
      if (Platform.OS === "android") {
        url = "http://10.0.2.2:32783/api/locations/";
      } else {
        url = "http://my-craft-project.ddev.site/api/locations/";
      }

      console.log("Fetching from URL:", url);

      const response = await fetch(url, { method: "GET" });
      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Response JSON:", json);
      setLocaties(json.items || []);
    } catch (error) {
      console.error("Error fetching concerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtiesten = async () => {
    try {
      let url;
      if (Platform.OS === "android") {
        url = "http://10.0.2.2:32783/api/artists/";
      } else {
        url = "http://my-craft-project.ddev.site/api/artists/";
      }

      console.log("Fetching from URL:", url);

      const response = await fetch(url, { method: "GET" });
      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Response JSON:", json);
      setArtiesten(json.items || []);
    } catch (error) {
      console.error("Error fetching concerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcerts();
    fetchLocaties();
    fetchArtiesten();
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
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Concert
                title={item.title}
                concertImage={item.image}
                price={item.price}
                location={item.location}
                date={item.date} // Ensure this is available
                artists={item.artists} // Ensure this is available
                navigation={navigation}
                onPress={() =>
                  navigation.navigate("ConcertDetailScreen", {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    location: item.location,
                    image: item.image,
                    description: item.description,
                    artists: item.artists,
                  })
                }
              />
            );
          }}
        />
        <Text style={styles.title}>Locaties</Text>
        <FlatList
          data={locaties}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Locatie
                title={item.title}
                name={item.name}
                LocatieImage={item.image}
                location={item.address}
                onPress={() =>
                  navigation.navigate("LocatieDetailScreen", {
                    id: item.id,
                    title: item.name,
                    location: item.address,
                    image: item.image,
                    description: item.description,
                  })
                }
              />
            );
          }}
        />
        <Text style={styles.title}>Artiesten</Text>
        <FlatList
          data={artiesten}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Artiest
                title={item.title}
                ArtiestImage={item.image}
                onPress={() =>
                  navigation.navigate("ArtiestDetailScreen", {
                    id: item.id,
                    title: item.name,
                    image: item.image,
                    description: item.description,
                  })
                }
              />
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
    marginBottom: 30,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
  },
  Concertcontainer: {
    marginLeft: 8,
    marginRight: 8,
  },
});

export default HomeScreen;
