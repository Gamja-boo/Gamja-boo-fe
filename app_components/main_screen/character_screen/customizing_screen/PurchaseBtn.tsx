import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function PurchaseBtn() {
  return (
    <View style={styles.purchaseBtn}>
      <Text style={styles.text}>구매하기</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  purchaseBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: screenHeight * 0.08,
    width: screenWidth * 0.55,
    backgroundColor: "white",
    borderTopLeftRadius: screenHeight * 0.05,
    borderTopRightRadius: screenHeight * 0.05,
    borderBottomRightRadius: screenHeight * 0.05,
    borderBottomLeftRadius: screenHeight * 0.05,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  text: {
    fontSize: screenWidth * 0.05,
    color: "#329257",
    fontWeight: "bold",
  },
})