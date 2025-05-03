import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Button from "@/app_assets/write_screen_icon/backButton.svg"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ExpenseRecord() {
  const router = useRouter();
  const { day, month } = useLocalSearchParams();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 뒤로 가기 버튼 */}
      <View style={styles.btnContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}>
          <Button />
        </TouchableOpacity>
      </View>

      {/* 감도리 이미지 및 텍스트 */}
      <View style={{ alignItems: "center" }}>
        <Image
          source={require('@/assets/images/Gamja_basic.png')}
          style={styles.imageBox}
        />
        <Text style={styles.dateText}>{month}월 {day}일</Text>
        <Text style={styles.recordText}>오늘의 지출을{"\n"}사진으로 기록해보세요!</Text>
      </View>

      <View style={styles.squareBox}>
        <TouchableOpacity onPress={() => router.push("/screens/write_screen/WriteScreen")}>
          <Image 
          source={require('@/assets/images/writeIcon.png')}
            style={styles.iconBox}>
          </Image>
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
  btnContainer: {
    position: "absolute",
    top: 30,
    left: 30,
    zIndex: 10,
  },
  backButton: {
    marginBottom: 20,
  },
  imageBox: {
    width: screenWidth * 0.3, 
    height: screenWidth * 0.3,
    borderRadius: (screenWidth * 0.3) / 2,
    overflow: "hidden",
    marginBottom: screenHeight * 0.05,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  dateText: {
    textAlign: "center",
    fontSize: screenWidth * 0.07,
    fontWeight: "bold",
    color: "#329257"
  },
  recordText: {
    textAlign: "center",
    marginTop: screenHeight * 0.025,
    fontSize: screenWidth * 0.04,
    fontFamily: "pretendard",
    color: "#1c482d"
  },
  squareBox: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.2,          
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.1,
    borderRadius: (screenWidth * 0.3) / 4,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  iconBox: {
    width: screenWidth * 0.1, 
    height: screenWidth * 0.1,
    color: "#1c482d"
  }
})