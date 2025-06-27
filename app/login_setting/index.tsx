import { View, StyleSheet, StatusBar, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { SettingNickname } from "@/app_components/login_setting_screen/SettingNickname";
import Button from "@/app_assets/setting_nickname_screen/button.svg"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function App() {
  const router = useRouter();
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <SettingNickname/>
        <TouchableOpacity 
          onPress={() => router.push("/main")}
          style={styles.btnContainer}
        >
          <Button />
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
  btnContainer: {
    position: "absolute",
    borderRadius: screenWidth,
    top: screenHeight * 0.03,
    right: screenWidth * 0.05,
    width: screenWidth * 0.12,
    height: screenHeight * 0.07,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
})