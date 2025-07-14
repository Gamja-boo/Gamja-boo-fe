import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SpentCategory } from "@/app_components/main_screen/expense_record_screen/write_screen/SpentCategory";
import { SpentBg } from "@/app_components/main_screen/expense_record_screen/write_screen/SpentBg";
import { SpentMoney } from "@/app_components/main_screen/expense_record_screen/write_screen/SpentMoney";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function AboutSpent() {
  return (
    <View style={styles.container}>
      <View style={styles.textCon}>
        <Text style={styles.text}>지출 카테고리</Text>
        <Text style={styles.text}>지출 배경</Text>
        <Text style={styles.text}>지출 금액</Text>
      </View>
      <View style={styles.writeCon}>
        <SpentCategory />
        <SpentBg />
        <SpentMoney />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: screenWidth * 0.5,
  },
  textCon: {
    justifyContent: "center",
    gap: screenHeight * 0.04,
    marginRight: screenWidth * 0.05,
  },
  writeCon: {
    justifyContent: "center",
    gap: screenHeight * 0.01,
    marginLeft: screenWidth * 0.05,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: screenWidth * 0.1,
  },
  text: {
    fontSize: screenWidth * 0.035,
    color: "#329257",
  },
})