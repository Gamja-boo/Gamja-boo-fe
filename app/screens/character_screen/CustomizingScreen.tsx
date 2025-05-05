import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import CustomizingBar from "@/components/CustomizingBar";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function CustomizingScreen() {
  return (
    <View style={styles.container}>
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
  customizingBarContainer: {
    position: "absolute",
    bottom: screenHeight * 0.46,
    backgroundColor: "transparent",
  },
}) 