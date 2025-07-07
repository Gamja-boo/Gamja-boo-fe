import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import CharacterImg from "@/app_assets/character_screen/customizing_screen/characterImg.svg";
import SkinFill from "@/app_assets/character_screen/customizing_screen/skinFill.svg";
import Face1 from "@/app_assets/character_screen/customizing_screen/choose_skin/face1.svg";
import Face2 from "@/app_assets/character_screen/customizing_screen/choose_skin/face2.svg";
import Face3 from "@/app_assets/character_screen/customizing_screen/choose_skin/face3.svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function ChooseSkin() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.rowContainer1}>
        <Face1 />
        <Face2 />
        <Face3 />
      </View>

      <View style={styles.rowContainer2}>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
      </View>

      <View style={styles.rowContainer1}>
        <CharacterImg />
        <CharacterImg />
        <CharacterImg />
      </View>

      <View style={styles.rowContainer2}>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
      </View>

      <View style={styles.rowContainer1}>
        <CharacterImg />
        <CharacterImg />
        <CharacterImg />
      </View>

      <View style={styles.rowContainer2}>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
      </View>

      <View style={styles.rowContainer1}>
        <CharacterImg />
        <CharacterImg />
        <CharacterImg />
      </View>

      <View style={styles.rowContainer2}>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    marginTop: screenHeight * 0.05,
  },
  rowContainer1: {
    flexDirection: "row",
    justifyContent: "center",
    padding: screenWidth * 0.03,
    gap: screenWidth * 0.075,
  },
  rowContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: screenWidth * 0.03,
    gap: screenWidth * 0.2,
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