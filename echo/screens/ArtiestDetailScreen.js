import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const ArtiestDetailScreen = ({ route, navigation }) => {
  const { id, title, description, image } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        console.log("Fetched favorites:", favorites); // Debug: Log fetched favorites
        setIsFavorite(favorites.some((item) => item.id === id));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      let updatedFavorites;

      if (isFavorite) {
        // Remove from favorites
        updatedFavorites = favorites.filter((item) => item.id !== id);
      } else {
        // Add to favorites
        updatedFavorites = [...favorites, { id, title, description, image }];
      }

      console.log("Updated favorites:", updatedFavorites); // Debug: Log updated favorites

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={24} color="white" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Image
            source={{
              uri: image?.replace(
                "https://my-craft-project.ddev.site",
                "http://10.0.2.2:32783"
              ),
            }}
            style={styles.imageCard}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.inlineContainer}>
            <TouchableOpacity onPress={toggleFavorite}>
              <Icon
                name={isFavorite ? "heart" : "heart-o"}
                size={30}
                color={isFavorite ? "red" : "black"}
                style={styles.heart}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.book}>
              <Text style={styles.booktext}>Zoek Op</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: "white",
  },
  parentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    borderRadius: 8,
    width: "98%",
    paddingBottom: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
    marginTop: 42,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
  },
  inlineContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 8,
    margin: 10,
  },
  imageCard: {
    width: "100%",
    height: 225,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "black",
    paddingLeft: 5,
    paddingRight: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  date: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  location: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  artists: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  heart: {
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 4,
    color: "red",
  },
  book: {
    backgroundColor: "#2a2a2a",
    width: "90%",
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  booktext: {
    color: "white",
    textAlign: "center",
    margin: "auto",
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
});

export default ArtiestDetailScreen;
