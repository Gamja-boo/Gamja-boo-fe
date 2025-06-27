import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import Gam from "@/app_assets/gam.svg";
import Ja from "@/app_assets/ja.svg";
import Boo from "@/app_assets/boo.svg";
import Grass from "@/app_assets/grass.svg";
import Sprout from "@/app_assets/sprout.svg";
import PinkClover from "@/app_assets/setting_nickname_screen/pinkClover.svg";
import OrangeClover from "@/app_assets/setting_nickname_screen/orangeClover.svg";
import GreenClover from "@/app_assets/setting_nickname_screen/greenClover.svg";
import SmileGamja from "@/app_assets/setting_nickname_screen/smileGamja.svg";
import BigGrass from "@/app_assets/setting_nickname_screen/bigGrass.svg";
import { useState } from "react";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function SettingNickname() {

  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>나만의 감도리 이름을 지어요</Text>
      
      <OrangeClover />
      <View style={styles.cloverCon}>
        <PinkClover />
        <GreenClover />
      </View>
      
      <SmileGamja />
      <BigGrass />

      <View style={styles.nameContainer}>
        <TextInput
            style={styles.input}
            placeholder="이름을 입력해주세요"
            placeholderTextColor="#aaa"
            value={text}
            onChangeText={setText}
            multiline={true}
        />
      </View>

      <View style={styles.gamjaboo}>
        <View style={{ left: screenWidth * 0.12 }}>
          <Sprout height={screenHeight * 0.02} width={screenWidth * 0.05} />
        </View>

        <View style={styles.name}>
          <Gam height={screenHeight * 0.05} width={screenWidth * 0.1} />
          <Ja height={screenHeight * 0.05} width={screenWidth * 0.1} />
          <Boo height={screenHeight * 0.05} width={screenWidth * 0.1} />
        </View>
        
        <Grass width={screenWidth * 0.33} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    width: screenWidth * 0.68,
    height: screenHeight * 0.07,
    bottom: screenHeight * 0.015,
    borderRadius: screenWidth * 0.5,
    backgroundColor: "#fff"
  },
  input: {
    height: "100%",
    padding: 10,
    textAlign: "center",
    textOverflow: "false",
  },
  gamjaboo: {
    width: screenWidth * 0.4,
    top: screenHeight * 0.2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  name: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: screenWidth * 0.04,
    bottom: screenHeight * 0.07,
  },
  cloverCon: {
    flexDirection: "row",
    gap: screenWidth * 0.2
  },
});
