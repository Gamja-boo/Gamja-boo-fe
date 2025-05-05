import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import CustomizingBar from "@/components/CustomizingBar";
import PurchaseBtn from "@/components/PurchaseBtn";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function CustomizingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.characterBox} />

      <View style={styles.customizingBarContainer}>
        <CustomizingBar />
      </View>


      {/* 화면 가운데 십자선 가이드 라인: x축 */}
      <View
        style={{
          position: "absolute",
          top: screenHeight / 2,
          left: 0,
          width: screenWidth,
          height: 1,
          backgroundColor: "red",
          zIndex: 3,
        }}
      />
      {/* 화면 가운데 십자선 가이드 라인: y축 */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: screenWidth / 2,
          width: 1,
          height: screenHeight,
          backgroundColor: "red",
          zIndex: 3,
        }}
      />

      <View style={styles.purchaseBtnContainer}>
        <TouchableOpacity>
          <PurchaseBtn />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFF6",
    justifyContent: "center",
    alignItems: "center",
  },
  characterBox: {
    position: "absolute",
    width: screenWidth * 0.55,
    height: screenWidth * 0.55,
    top: screenHeight * 0.15,
    backgroundColor: "#000",
  },
  customizingBarContainer: {
    position: "absolute",
    bottom: screenHeight * 0.4,
    backgroundColor: "transparent",
  },
  purchaseBtnContainer: {
    position: "absolute",
    bottom: screenHeight * 0.1,
    backgroundColor: "transparent",
  }
}) 