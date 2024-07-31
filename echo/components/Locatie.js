import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

const Locatie = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={styles.card}
    >
      <Image
        source={{
          uri: props.LocatieImage?.replace(
            "https://my-craft-project.ddev.site",
            "http://10.0.2.2:32783"
          ),
        }}
        style={styles.imageCard}
      />
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.inlineContainer}>
        <Icon name="map-marker" size={16} color="#000" style={styles.icon} />
        <Text>{props.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 16,
    borderRadius: 8,
    width: 250,
    paddingBottom: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  inlineContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 8,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 16,
  },
  imageCard: {
    width: "100%",
    height: 125,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 8,
  },

  button: {
    backgroundColor: "#b3d1ff",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  bold: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 4,
    color: "red",
  },
});

export default Locatie;
