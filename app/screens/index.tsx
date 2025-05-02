import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { BottomAppbar } from "@/components/BottomAppbar";
import CustomCalendarScreen from "./calendar_screen/CustomCalendarScreen";
// import ExpenseBar from "@/components/ExpenseBar";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 달력 컴포넌트 (월 드롭바, 달력) */}
      <View  style={styles.calendar}>
        <CustomCalendarScreen />
      </View>

      {/* 지출을 표시하는 부분 */}
      <View style={styles.expenseBarContainer}>
        {/*<ExpenseBar today={50000} compare={3000} balance={100000}/>*/}
      </View>

      <TouchableOpacity onPress={() => router.push("/screens")}>
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
      
      {/* 네비게이션 바 */}
      <View style={styles.bottomAppbarContainer}>
        <BottomAppbar />
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
  text: {
    fontSize: 30,
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
  bottomAppbarContainer: {
    position: "absolute",
    bottom: screenHeight * 0.07,
    backgroundColor: "transparent",
  },
});