import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import CustomizingBar from "@/components/CustomizingBar";
import PurchaseBtn from "@/components/PurchaseBtn";
import Gamdoring from "@/components/Gamdoring";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function CustomizingScreen() {
  return (
    <View style={styles.container}>

      { /* 감도링 개수 / 받아오는 로직 구현 해야함 */}
      <View style={styles.coinContainer}>
        <Gamdoring />
      </View>

      {/* 캐릭터를 나타낼 박스 */}
      <View style={styles.characterBox} />

      { /* 커스터마이징 바 */}
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

      {/* 구매하기 버튼 */}
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
  coinContainer: {
    position: "absolute",
    justifyContent: "space-evenly",
    left: screenWidth * 0.08,
    top: screenHeight * 0.04,
    width: screenWidth * 0.15,
    height: screenHeight * 0.05,
    backgroundColor: "transparent",
  },
  characterBox: {
    position: "absolute",
    width: screenWidth * 0.55,
    height: screenWidth * 0.55,
    top: screenHeight * 0.15,
    backgroundColor: "#aaa",
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