import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Platform,
  ActivityIndicator,
} from "react-native";
import Concert from "../components/Concert";
import Locatie from "../components/Locatie";
import Artiest from "../components/Artiest";
import Filter from "../components/Filter";

const CategoryScreen = ({ route, navigation }) => {
  const { type } = route.params;

  const [data, setData] = React.useState([]);
  const [sortedData, setSortedData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sortValue, setSortValue] = React.useState("0");

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url;
        if (type === "Concerten") {
          url =
            Platform.OS === "android"
              ? "http://10.0.2.2:32783/api/concerts/"
              : "http://my-craft-project.ddev.site/api/concerts/";
        } else if (type === "Locaties") {
          url =
            Platform.OS === "android"
              ? "http://10.0.2.2:32783/api/locations/"
              : "http://my-craft-project.ddev.site/api/locations/";
        } else if (type === "Artiesten") {
          url =
            Platform.OS === "android"
              ? "http://10.0.2.2:32783/api/artists/"
              : "http://my-craft-project.ddev.site/api/artists/";
        }

        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setData(json.items || []);
        setSortedData(json.items || []);
      } catch (error) {
        console.error(`Error fetching ${type.toLowerCase()}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  React.useEffect(() => {
    sortData(sortValue);
  }, [data, sortValue]);

  const sortData = (value) => {
    let sorted = [...data];
    switch (value) {
      case "1": //  A-Z
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "2": //  Z-A
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        sorted = [...data];
        break;
    }
    setSortedData(sorted);
  };

  const handleSortChange = (value) => {
    setSortValue(value);
  };

  const renderItem = ({ item }) => {
    switch (type) {
      case "Artiesten":
        return (
          <Artiest
            title={item.title}
            ArtiestImage={item.image}
            onPress={() =>
              navigation.navigate("ArtiestDetailScreen", {
                id: item.id,
                title: item.title,
                image: item.image,
                description: item.description,
              })
            }
          />
        );
      case "Locaties":
        return (
          <Locatie
            title={item.title}
            name={item.name}
            LocatieImage={item.image}
            location={item.address}
            onPress={() =>
              navigation.navigate("LocatieDetailScreen", {
                id: item.id,
                title: item.title,
                location: item.address,
                image: item.image,
                description: item.description,
              })
            }
          />
        );
      case "Concerten":
        return (
          <Concert
            title={item.title}
            concertImage={item.image}
            price={item.price}
            location={item.location}
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
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={styles.background}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Filter onSortChange={handleSortChange} />
        <Text style={styles.title}>{type}</Text>
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
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
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
});

export default CategoryScreen;
