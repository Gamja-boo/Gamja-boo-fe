import { View, StatusBar, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Character from "@/app_assets/character_screen/character.svg";
import Ground from "@/app_assets/character_screen/ground.svg";
import Flower1 from "@/app_assets/character_screen/flower1.svg";
import Flower2 from "@/app_assets/character_screen/flower2.svg";
import Flower3 from "@/app_assets/character_screen/flower3.svg";
import Grass from "@/app_assets/character_screen/grass.svg";
import Shop from "@/app_assets/character_screen/shop.svg";
import Share from "@/app_assets/character_screen/share.svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function CharacterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 커스터마이징 버튼 */}
      <TouchableOpacity 
        style={styles.shopBtn}
        onPress={() => router.push("/main/character/customizing")}>
          <Shop />
      </TouchableOpacity>

      {/* 공유하기 버튼 */}
      <TouchableOpacity 
        style={styles.shareBtn}
        onPress={() => router.push("/main/character/customizing")}>
          <Share />
      </TouchableOpacity>

      {/* 감도리 캐릭터 화면 */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.characterCon}>
        <Character />
      </View>
      <View style={styles.boxCon}>
        <Grass width={screenWidth * 0.78} style={{ marginBottom: -screenHeight * 0.02, zIndex: 1 }}/>
        <View style={styles.flowerCon}>
          <Flower3 style={{ zIndex: 2 }}/>
          <Flower2 style={{ zIndex: 2 }}/>
          <Flower1 style={{ zIndex: 2 }}/>
        </View>
        <Ground width={screenWidth * 0.75} height={screenHeight * 0.375} />
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
  characterCon: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: screenWidth * 0.5,
    backgroundColor: "#ACEC96",
  },
  boxCon: {
    position: "relative",
    alignItems: "center",
    marginTop: screenHeight * 0.03,
  },
  flowerCon: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: screenWidth * 0.15,
  },
  shopBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: screenHeight * 0.05,
    right: screenWidth * 0.05,
    width: screenWidth * 0.07,
    height: screenHeight * 0.035,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 20,
  },
  shareBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: screenHeight * 0.05,
    right: screenWidth * 0.22,
    width: screenWidth * 0.07,
    height: screenHeight * 0.035,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 20,
  },
});