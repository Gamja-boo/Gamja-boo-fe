import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import SkinFill from "@/app_assets/character_screen/customizing_screen/skinFill.svg";
import React from "react";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function ChooseCloth({
  items,
  onSelect,
}: {
  items: { 
    id: string; 
    Component: React.ComponentType<any>;
    position: any;
  }[];
  onSelect: (id: string) => void;
}) {
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    rows.push(items.slice(i, i + 3));
  }

  return (
    <ScrollView style={styles.container}>
      {rows.map((rowItems, rowIndex) => (
        <View key={rowIndex}>
          <View style={styles.rowContainer1}>
            {rowItems.map(item => (
              <TouchableOpacity key={item.id} onPress={() => onSelect(item.id)}>
                <item.Component
                  width={screenWidth * 0.23}
                  height={screenHeight * 0.23}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.rowContainer2}>
            {rowItems.map((_, index) => (
              <View key={index} style={styles.priceContainer}>
                <SkinFill />
                <Text style={styles.text}>3</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <View style={{ height: screenHeight * 0.17 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    backgroundColor: "transparent",
  },
  rowContainer1: {
    height: screenHeight * 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: screenWidth * 0.075,
  },
  rowContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: screenHeight * 0.04,
    paddingTop: screenHeight * 0.01,
    gap: screenWidth * 0.21,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: screenWidth * 0.03,
  },
  text: {
    color: "#ADD69F",
    fontWeight: "bold",
    fontSize: screenWidth * 0.04,
  },
})