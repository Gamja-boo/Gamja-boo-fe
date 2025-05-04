import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native";
import BackButton from "@/app_assets/write_screen_icon/backButton.svg"
import CheckButton from "@/app_assets/write_screen_icon/checkButton.svg"
import UploadImage from "@/components/UploadImage";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function WriteScreen() {
  const navigation = useNavigation();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [text, setText] = useState("");

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

      {/* 이미지 업로드 박스 (백엔드 연결 필요) */}
      <UploadImage />

      {/* 글을 적을 수 있는 박스 (백엔드 연결 필요)*/}
      <View style={styles.writeBox}>
        <TouchableOpacity onPress={() => setIsInputVisible(true)}>
          <Text style={styles.writeText}>구매를 하고 어떤 기분이 들었나요?{"\n"}자유롭게 적어주세요!</Text>
        </TouchableOpacity>

        {isInputVisible && (
          <TextInput
            style={styles.inputBox}
            placeholder="아무거나 적어버리기~"
            value={text}
            onChangeText={setText}
          />
        )}
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
  writeText: {
    color: "#959595",
  },
  inputBox: {
    width: screenWidth,
    height: screenHeight * 0.5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
})
