import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native";
import BackButton from "@/app_assets/write_screen_icon/backButton.svg"
import CheckButton from "@/app_assets/write_screen_icon/checkButton.svg"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function WriteScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 뒤로 가기 버튼 (expense_record) */}
      <View style={styles.backContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>
      </View>

      <View style={styles.checkContainer}>
        <TouchableOpacity 
          style={styles.checkButton} 
          onPress={() => navigation.goBack()}>
          <CheckButton />
        </TouchableOpacity>
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
  backContainer: {
    position: "absolute",
    top: 30,
    left: 30,
    zIndex: 10,
  },
  backButton: {
    marginBottom: 20,
  },
  checkContainer: {
    position: "absolute",
    top: 30,
    right: 30,
    zIndex: 10,
  },
  checkButton: {
    marginBottom: 20,
  },
})
