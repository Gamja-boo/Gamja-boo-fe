import { View, StatusBar, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { CustomCalendar } from "@/app_components/main_screen/CustomCalendar"
import { ExpenseBar } from "@/app_components/main_screen/ExpenseBar";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function MainScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 달력 컴포넌트 (월 드롭바, 달력) */}
      <View  style={styles.calendar}>
        <CustomCalendar />
      </View>

      {/* 지출을 표시하는 바 */}
      <View style={styles.expenseBarContainer}>
        <ExpenseBar today={50000} compare={3000} balance={100000}/>
      </View>

      <TouchableOpacity onPress={() => router.push("/main")}>
      </TouchableOpacity>

      {/* 화면 가운데 십자선 가이드 라인: x축 */}
      <View
        style={{
          position: "absolute",
          top: screenHeight / 2,
          left: 0,
          width: screenWidth,
          height: 1,
          backgroundColor: "red",
          zIndex: 3,
        }}
      />
      {/* 화면 가운데 십자선 가이드 라인: y축 */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: screenWidth / 2,
          width: 1,
          height: screenHeight,
          backgroundColor: "red",
          zIndex: 3,
        }}
      />
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
  text: {
    fontSize: screenWidth * 0.075,
    fontWeight: "bold",
  },
  calendar: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight, 
  },
  expenseBarContainer: {
    position: "absolute",
    bottom: screenHeight * 0.22,  
    width: screenWidth,
  },
});