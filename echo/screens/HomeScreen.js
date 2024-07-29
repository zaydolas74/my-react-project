import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/images/icon.png")} // Zorg ervoor dat het pad naar je afbeelding klopt
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        <Text style={styles.bodyText}></Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Products")}
        >
          <Text style={styles.buttonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 22,
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  bodyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#b3d1ff",
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default HomeScreen;
