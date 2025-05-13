import React, { RefObject } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import data from "@/test_data/main_screen/chart_screen/may_2025_expenses.json"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface typeOfProps {
  scrollRef: RefObject<ScrollView>;
}

export const BarGraph = ({ scrollRef }: typeOfProps): JSX.Element => {

  return (
    <View style={styles.barGraph}>
      <View style={{ flexDirection: "row", marginTop: screenHeight * 0.03 }}>
        <Text style={styles.text1}>셋 째주에 </Text>
        <Text style={styles.text2}>가장 지출이 많았어요</Text>
      </View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row-reverse',
        }}
        ref={scrollRef}
        style={{ width: screenWidth * 0.6 }}>
        {data.map(((item, value) => (
          <View key={value} style={{ marginLeft: screenWidth * 0.0625, alignItems: "center" }}>
            <View style={{ ...styles.bar, backgroundColor: "#FFFFFF" }} />
            <View style={{ marginTop: screenHeight * 0.01, width: screenWidth * 0.07, alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF" }}>2월</Text>
            </View>
          </View>
        )))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  barGraph: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.76,
    height: screenHeight * 0.28,
    marginTop: screenHeight * 0.04,
    backgroundColor: "#75E88C",
    borderRadius: screenWidth * 0.07,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // ios 그림자 효과
    elevation: 6, // 안드로이드 그림자 효과
  },
  text1: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF"
  },
  text2: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  bar: {
    width: screenWidth * 0.03,
    height: screenHeight * 0.1,
    borderTopRightRadius: screenWidth * 0.03, 
    borderTopLeftRadius: screenWidth * 0.03, 
  }
});