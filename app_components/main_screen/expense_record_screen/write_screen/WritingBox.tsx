import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function WritingBox() {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [text, setText] = useState("");

  return (
    <View>
      <TouchableOpacity onPress={() => setIsInputVisible(true)}>
        <Text style={{ color: "#959595" }}>구매를 하고 어떤 기분이 들었나요?{"\n"}자유롭게 적어주세요!</Text>
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
  );
}

const styles = StyleSheet.create({
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