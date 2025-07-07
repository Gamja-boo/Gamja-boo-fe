import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Skin1 from "@/app_assets/character_screen/customizing_screen/skin1.svg";
import Skin2 from "@/app_assets/character_screen/customizing_screen/skin2.svg";
import Cloth1 from "@/app_assets/character_screen/customizing_screen/cloth1.svg";
import Cloth2 from "@/app_assets/character_screen/customizing_screen/cloth2.svg";
import Accessory1 from "@/app_assets/character_screen/customizing_screen/accessory1.svg";
import Accessory2 from "@/app_assets/character_screen/customizing_screen/accessory2.svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function CustomizingBar({
  selectedType,
  onSelect,
}: {
  selectedType: "skin" | "cloth" | "accessory";
  onSelect: (type: "skin" | "cloth" | "accessory") => void;
}) {
  return (
    <View style={styles.customizingBar}>
      <TouchableOpacity onPress={() => onSelect("skin")}>
        {selectedType === "skin" ? (
          <Skin2 width={screenWidth * 0.07} height={screenWidth * 0.07} />
        ) : (
          <Skin1 width={screenWidth * 0.07} height={screenWidth * 0.07} />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelect("cloth")}>
        {selectedType === "cloth" ? (
          <Cloth2 width={screenWidth * 0.075} height={screenWidth * 0.075} />
        ) : (
          <Cloth1 width={screenWidth * 0.075} height={screenWidth * 0.075} />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelect("accessory")}>
        {selectedType === "accessory" ? (
          <Accessory2 width={screenWidth * 0.075} height={screenWidth * 0.075} />
        ) : (
          <Accessory1 width={screenWidth * 0.075} height={screenWidth * 0.075} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  customizingBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: screenHeight * 0.065,
    width: screenWidth * 0.57,
    backgroundColor: "#FCFFF6",
    borderTopLeftRadius: screenHeight * 0.05,
    borderTopRightRadius: screenHeight * 0.05,
    borderBottomRightRadius: screenHeight * 0.05,
    borderBottomLeftRadius: screenHeight * 0.05,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 3,
  }
})