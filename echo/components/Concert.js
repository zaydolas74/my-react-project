import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Concert = (props) => {
  return (
    /*
          <TouchableOpacity
            key={accommodation.id}
            style={styles.card}
            onPress={() => handleAccommodationPress(accommodation)}
          >
            <Image source={{ uri: accommodation.hotelimage?.replace('https://reizen.ddev.site', 'http://10.0.2.2:32772') }} style={styles.imageCard} />
            <Text style={styles.title}>{accommodation.title}</Text>
            <View style={styles.inlineContainer}>
              <Text style={styles.bold}>€{accommodation.price}</Text>
              <Text>{accommodation.cityName}</Text>
            </View>
          </TouchableOpacity>
    */
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={styles.card}
    >
      <Image
        source={{
          uri: props.concertImage?.replace(
            "https://my-craft-project.ddev.site",
            "http://10.0.2.2:32783"
          ),
        }}
        style={styles.imageCard}
      />
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.inlineContainer}>
        <Text style={styles.bold}>€{props.price}</Text>
        <Text>{props.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 16,
    borderRadius: 8,
    width: 300,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    paddingBottom: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  inlineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 16,
  },
  imageCard: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 8,
  },
  concertTitle: {
    fontSize: 16,
    marginTop: 5,
    width: 155,
    height: 90,
    textAlign: "center",
  },
  concertPrice: {
    fontSize: 16,
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
});

export default Concert;
