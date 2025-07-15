import { View, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Character from "@/app_assets/character_screen/character.svg";
import { skinItems } from "@/app_utils/items/skinItems";
import { clothItems } from "@/app_utils/items/clothItems";
import { accessoryItems } from "@/app_utils/items/accessoryItems";
import BackButton from "@/app_assets/my_page_screen/backButton.svg";
import { WarningInfo } from "@/app_components/main_screen/my_page_screen//withdraw_screen/WarningInfo";
import { WithdrawAgree } from "@/app_components/main_screen/my_page_screen/withdraw_screen/WithdrawAgree";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function WithdrawScreen() {
  const router = useRouter();

  const { skin, cloth, accessory } = useLocalSearchParams();

  const skinItem = typeof skin === "string" ? skinItems.find(item => item.id === skin) : null;
  const clothItem = typeof cloth === "string" ? clothItems.find(item => item.id === cloth) : null;
  const accessoryItem = typeof accessory === "string" ? accessoryItems.find(item => item.id === accessory) : null;

  const yOffset = -screenHeight * 0.001;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/main/my_page")}
        style={styles.backCon}>
        <BackButton />
      </TouchableOpacity>

      {/* 감도리 캐릭터 화면 */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.characterCon}>
        <Character />

        {skinItem && (
          <View
            style={{
              position: "absolute",
              bottom: skinItem.position?.bottom !== undefined
                ? skinItem.position.bottom + yOffset + 17
                : undefined,
              zIndex: 99,

              borderRadius: screenWidth * 0.5,
              width: (skinItem.size?.width ?? screenWidth * 0.2) * 1.7,
              height: (skinItem.size?.height ?? screenHeight * 0.2) / 2,
              backgroundColor: "#FFE9B8",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <skinItem.Component
              width={skinItem.size?.width ?? screenWidth * 0.2}
              height={skinItem.size?.height ?? screenHeight * 0.2}
            />
          </View>
        )}


        {clothItem && (
          <clothItem.Component
            width={clothItem.size?.width ?? screenWidth * 0.2}
            height={clothItem.size?.height ?? screenHeight * 0.2}
            style={
              {
                position: "absolute",
                ...clothItem.position,
                zIndex: 99,
              }
            }
          />
        )}

        {accessoryItem && (
          <accessoryItem.Component
            width={accessoryItem.size?.width ?? screenWidth * 0.2}
            height={accessoryItem.size?.height ?? screenHeight * 0.2}
            style={
              {
                position: "absolute",
                ...accessoryItem.position,
                zIndex: 99,
              }
            }
          />
        )}
      </View>

      {/* 경고 안내 박스 */}
      <WarningInfo />

      {/* 동의 */}
      <WithdrawAgree />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFF6",
    alignItems: "center",
  },
  characterCon: {
    width: screenWidth * 0.45,
    height: screenHeight * 0.225,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: screenWidth * 0.5,
    backgroundColor: "#ACEC96",
    marginTop: screenHeight * 0.19,
    marginBottom: screenHeight * 0.05,
  },
  backCon: {
    position: "absolute",
    left: screenWidth * 0.05,
    top: screenHeight * 0.03,
    width: screenWidth * 0.15,
  },
});