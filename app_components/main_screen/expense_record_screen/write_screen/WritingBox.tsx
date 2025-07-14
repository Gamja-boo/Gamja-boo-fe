import React, { useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export function WritingBox() {
  const [text, setText] = useState("");

  return (
    <TouchableOpacity style={styles.container}>
      <TextInput
        style={{ fontSize: screenWidth * 0.04 }}
        value={text}
        onChangeText={setText}
        multiline
        placeholder={"이 소비, 만족스러웠나요?\n느끼신 점이 있다면 가볍게 적어주세요."}
        placeholderTextColor="#CACABD"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderRadius: screenWidth * 0.06,
    borderColor: "#CACABD",
    borderWidth: 0.7,
    padding: screenWidth * 0.05,
  },
})