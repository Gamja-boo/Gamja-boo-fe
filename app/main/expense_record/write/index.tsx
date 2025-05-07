import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native";
import BackButton from "@/app_assets/write_screen/backButton.svg"
import CheckButton from "@/app_assets/write_screen/checkButton.svg"
import { UploadImage } from "@/app_components/main_screen/expense_record_screen/write_screen/UploadImage";
import { WritingBox } from "@/app_components/main_screen/expense_record_screen/write_screen/WritingBox";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function WriteScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      {/* 뒤로 가기 버튼 */}
      <View style={styles.backContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>
      </View>

      {/* 작성 완료 후 저장 버튼 (백엔드 연결 필요)*/}
      <View style={styles.checkContainer}>
        <TouchableOpacity 
          style={styles.checkButton} 
          onPress={() => navigation.goBack()}>
          <CheckButton />
        </TouchableOpacity>
      </View>

      {/* 이미지 업로드 박스 */}
      <UploadImage />

      {/* 글을 적을 수 있는 박스 */}
      <View style={styles.writeBox}>
        <WritingBox />
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
    top: screenHeight * 0.04,
    left: screenWidth * 0.08,
    zIndex: 10,
  },
  backButton: {
    marginBottom: 20,
  },
  checkContainer: {
    position: "absolute",
    top: screenHeight * 0.04,
    right: screenWidth * 0.08,
    zIndex: 10,
  },
  checkButton: {
    marginBottom: 20,
  },
  writeBox: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.05,
    borderRadius: screenWidth * 0.08,
    borderColor: "#959595",
    borderWidth: 1,
  },
})
