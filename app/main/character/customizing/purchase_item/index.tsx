import { View, StyleSheet, StatusBar, TouchableOpacity, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PurchaseItems } from "@/app_components/main_screen/character_screen/customizing_screen/purchase_item_screen/PurchaseItems";
import Back from "@/app_assets/character_screen/customizing_screen/back.svg";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Complete() {
  const router = useRouter();

  const { skin, cloth, accessory } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <PurchaseItems
        selectedSkin={typeof skin === "string" ? skin : null}
        selectedCloth={typeof cloth === "string" ? cloth : null}
        selectedAccessory={typeof accessory === "string" ? accessory : null}
      />

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity
        style={styles.backCon}
        onPress={() => router.push("/main/character/customizing")}>
        <Back />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32D77D",
    justifyContent: "center",
    alignItems: "center",
  },
  backCon: {
    position: "absolute",
    left: screenWidth * 0.05,
    top: screenHeight * 0.03,
    width: screenWidth * 0.15,
  },
})