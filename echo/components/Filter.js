import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Filter = ({ onSortChange }) => {
  const [sortValue, setSortValue] = useState("0");

  const handleSortChange = (value) => {
    setSortValue(value);
    onSortChange(value);
  };

  return (
    <View style={styles.shopControlBar}>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={sortValue}
          onValueChange={(itemValue) => handleSortChange(itemValue)}
        >
          <Picker.Item label="Sort by" value="0" />
          <Picker.Item label="A-Z" value="1" />
          <Picker.Item label="Z-A" value="2" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shopControlBar: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: "100%",
    alignItems: "center",
    padding: 10,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 50,
    width: 350,
    backgroundColor: "white",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  picker: {
    width: 400,
    flex: 1,
    color: "black",
  },
});

export default Filter;
