import React from 'react';
import { View, Text, Dimensions, StyleSheet } from "react-native";

interface data {
  name: string;
  population: number;
  color: string;
}

interface typeOfProps {
  coloredData: data[]
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const PieChartCategory = ( { coloredData }: typeOfProps): JSX.Element => {
  const COLORS = [
    "#FFFFE5",
    "#F7FCB9",
    "#D9F0A3",
    "#ADDD8E",
    "#78C679",
    "#41AB5D",
  ];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", position: "absolute", alignItems: "center", left: screenWidth * 0.25 }}>
        <View style={{ ...styles.sticker, backgroundColor: COLORS[0] }} />
        <Text style={styles.text}>{coloredData[0].name}</Text>
      </View>
      <View style={{ flexDirection: "row", position: "absolute", alignItems: "center", left: screenWidth * 0.46 }}>
        <View style={{ ...styles.sticker, backgroundColor: COLORS[1] }} />
        <Text style={styles.text}>{coloredData[1].name}</Text>
      </View>
      <View style={{ flexDirection: "row", position: "absolute", alignItems: "center", left: screenWidth * 0.65 }}>
        <View style={{ ...styles.sticker, backgroundColor: COLORS[2] }} />
        <Text style={styles.text}>{coloredData[2].name}</Text>
      </View>
      <View style={{ flexDirection: "row", position: "absolute", top: screenHeight * 0.03 }}>
        <View style={{ flexDirection: "row", position: "absolute", alignItems: "center", left: screenWidth * 0.25 }}>
          <View style={{ ...styles.sticker, backgroundColor: COLORS[3] }} />
          <Text style={styles.text}>{coloredData[3].name}</Text>
        </View>
        <View style={{ flexDirection: "row", position: "absolute", alignItems: "center", left: screenWidth * 0.46 }}>
          <View style={{ ...styles.sticker, backgroundColor: COLORS[4] }} />
          <Text style={styles.text}>{coloredData[4].name}</Text>
        </View>
        <View style={{ flexDirection: "row", position: "absolute", alignItems: "center", left: screenWidth * 0.65 }}>
          <View style={{ ...styles.sticker, backgroundColor: COLORS[5] }} />
          <Text style={styles.text}>{coloredData[5].name}</Text>
        </View>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "column",
    width: screenWidth,
    height: screenHeight * 0.06,
  },
  text: {
    marginLeft: screenWidth * 0.02,
    borderWidth: 1
  },
  sticker: {
    width: screenWidth * 0.02,
    height: screenWidth * 0.02,
    borderRadius: screenWidth * 0.01,
  },
});