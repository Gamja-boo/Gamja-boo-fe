import {
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SettingNickname } from "@/app_components/login_setting_screen/SettingNickname";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SettingNickname />
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
});
