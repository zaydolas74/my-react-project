import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Product = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
      <View style={styles.productContainer}>
        <Image
          style={[styles.productImage, { width: 100, height: 100 }]}
          source={{
            uri: props.image,
          }}
          onError={(error) =>
            console.error("Image load error:", error.nativeEvent)
          }
        />
        <Text style={styles.productTitle}>{props.title}</Text>
        <Text style={styles.productPrice}>€ {props.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    margin: 6,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  productImage: {
    height: 150,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 400,
    marginTop: 5,
    width: 155,
    height: 90,
    textAlign: "center",
  },
  productPrice: {
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
});

export default Product;
