import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { View, StyleSheet, BackHandler, Alert } from "react-native";

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();

  // (안드로이드 전용)
  useEffect(() => {
    const backAction = () => {
      const currentRoute = `/${segments.join("/")}`;
      console.log("이전 경로:", currentRoute);

      if (currentRoute === "/") {
        // 로그인 화면일 때, 앱 종료
        Alert.alert("앱 종료", "앱을 종료하시겠습니까?", [
          { text: "취소", style: "cancel" },
          { text: "확인", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      } else if (currentRoute === "/main_screen") {
        // 홈 화면일 때, 앱 종료
        Alert.alert("앱 종료", "앱을 종료하시겠습니까?", [
          { text: "취소", style: "cancel" },
          { text: "확인", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      } else {
        // 다른 화면일 때, 홈으로 이동
        router.push("/main_screen");
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
    // 컴포넌트 언마운트 시 (앱 종료 시) 함수가 정의된 메모리 해제
    // useEffect의 return은 useEffect가 정의된 컴포넌트가 언마운트될 시 실행된다.
  }, [segments]);

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
