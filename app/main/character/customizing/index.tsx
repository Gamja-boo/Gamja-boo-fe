import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { skinItems } from "@/app_utils/items/skinItems";
import { clothItems } from "@/app_utils/items/clothItems";
import { accessoryItems } from "@/app_utils/items/accessoryItems";
import { CustomizingBar } from "@/app_components/main_screen/character_screen/customizing_screen/CustomizingBar";
import { PurchaseBtn } from "@/app_components/main_screen/character_screen/customizing_screen/PurchaseBtn";
import { Gamdoring } from "@/app_components/main_screen/character_screen/customizing_screen/Gamdoring";
import { ChooseSkin } from "@/app_components/main_screen/character_screen/customizing_screen/ChooseSkin";
import { ChooseCloth } from "@/app_components/main_screen/character_screen/customizing_screen/ChooseCloth";
import { ChooseAccessory } from "@/app_components/main_screen/character_screen/customizing_screen/ChooseAccessory";
import Character from "@/app_assets/character_screen/character.svg";
import Back from "@/app_assets/character_screen/customizing_screen/back.svg";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function CustomizingScreen() {
  const router = useRouter();

  const [selected, setSelected] = useState<"skin" | "cloth" | "accessory">("cloth");
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null);
  const [selectedCloth, setSelectedCloth] = useState<string | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null);

  return (
    <View style={styles.container}>

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity
        style={styles.backCon}
        onPress={() => router.push("/main/character")}>
        <Back />
      </TouchableOpacity>

      { /* 감도링 개수 / 받아오는 로직 구현 해야함 */}
      <View style={styles.coinContainer}>
        <Gamdoring />
      </View>

      {/* 캐릭터를 나타낼 박스 */}
      <View style={styles.characterCon}>
        <Character />
        {skinItems.map(item =>
          selectedSkin === item.id && (
            <React.Fragment key={item.id}>
              <View
                style={{
                  position: "absolute",
                  bottom: (item.position.bottom ?? 0) + 15,
                  left: (item.position.left ?? 0) - 10,
                  width: (item.size?.width ?? screenWidth * 0.2) * 1.7,
                  height: (item.size?.height ?? screenHeight * 0.2) / 2,
                  backgroundColor: "#FFE9B8",
                  borderRadius: screenWidth * 0.5,
                }}
              />
              <item.Component
                width={item.size?.width ?? screenWidth * 0.2}
                height={item.size?.height ?? screenHeight * 0.2}
                style={
                  {
                    position: "absolute",
                    ...item.position,
                  }
                } 
              />
            </React.Fragment>
          )
        )}
        {clothItems.map(item =>
          selectedCloth === item.id && (
            <item.Component
            key={item.id}
            width={item.size?.width ?? screenWidth * 0.2}
            height={item.size?.height ?? screenHeight * 0.2}
              style={
                {
                  position: "absolute",
                  ...item.position,
                }
              } 
            />
          )
        )}
        {accessoryItems.map(item =>
          selectedAccessory === item.id && (
            <item.Component
            key={item.id}
            width={item.size?.width ?? screenWidth * 0.2}
            height={item.size?.height ?? screenHeight * 0.2}
              style={
                {
                  position: "absolute",
                  ...item.position,
                }
              } 
            />
          )
        )}
      </View>

      { /* 커스터마이징 바 */}
      <View style={styles.customizingBarCon}>
        <CustomizingBar selectedType={selected} onSelect={setSelected}/>
      </View>

      {selected === "skin" && (
        <View style={styles.chooseCon}>
          <ChooseSkin
            items={skinItems}
            onSelect={setSelectedSkin}
            />
        </View>
      )}

      {selected === "cloth" && (
        <View style={styles.chooseCon}>
          <ChooseCloth
            items={clothItems}
            onSelect={setSelectedCloth}
          />
        </View>
      )}

      {selected === "accessory" && (
        <View style={styles.chooseCon}>
          <ChooseAccessory
            items={accessoryItems}
            onSelect={setSelectedAccessory}
            />
        </View>
      )}

      {/* 구매하기 버튼 */}
      <View style={styles.purchaseBtnContainer}>
        <PurchaseBtn />
      </View>
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
  backCon: {
    position: "absolute",
    left: screenWidth * 0.05,
    top: screenHeight * 0.03,
    width: screenWidth * 0.15,
  },
  coinContainer: {
    position: "absolute",
    right: screenWidth * 0.05,
    top: screenHeight * 0.03,
    width: screenWidth * 0.15,
  },
  characterCon: {
    position: "absolute",
    top: screenHeight * 0.2,
    width: screenWidth * 0.4,
    height: screenHeight * 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: screenWidth * 0.5,
    backgroundColor: "#ACEC96",
  },
  customizingBarCon: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight * 0.08,
    top: screenHeight * 0.47,
    alignItems: "center",
  },
  chooseCon: {
    width: screenWidth,
    height: screenHeight * 0.42,
    top: screenHeight * 0.3,
  },
  purchaseBtnContainer: {
    position: "absolute",
    bottom: screenHeight * 0.1,
  },
}) 