import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "@/app_assets/write_screen/backButton.svg";
import CheckButton from "@/app_assets/write_screen/checkButton.svg";
import { UploadImage } from "@/app_components/main_screen/expense_record_screen/write_screen/UploadImage";
import { WritingBox } from "@/app_components/main_screen/expense_record_screen/write_screen/WritingBox";
import { AboutSpent } from "@/app_components/main_screen/expense_record_screen/write_screen/AboutSpent";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function WriteScreen() {
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      style={styles.container}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.backContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <BackButton />
          </TouchableOpacity>
        </View>

        <View style={styles.checkContainer}>
          <TouchableOpacity style={styles.checkButton} onPress={() => navigation.goBack()}>
            <CheckButton />
          </TouchableOpacity>
        </View>

        {!keyboardVisible && (
          <View style={styles.imgContainer}>
            <UploadImage />
          </View>
        )}

        <View style={styles.spentContainer}>
          <AboutSpent />
        </View>

        <View style={styles.writeBoxContainer}>
          <WritingBox />
        </View>

        {/* 가운데 십자선 생략 */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFF6",
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
  imgContainer: {
    marginTop: screenHeight * 0.11,
    width: screenWidth,
    height: screenHeight * 0.5,
    backgroundColor: "transparent",
  },
  spentContainer: {
    marginTop: screenHeight * 0.04,
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    backgroundColor: "transparent",
  },
  writeBoxContainer: {
    marginTop: 20,
    width: screenWidth * 0.8,
    height: screenHeight * 0.15,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});
