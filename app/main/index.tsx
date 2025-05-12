import { View, StatusBar, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import MyPageBtn from "@/app_assets/main_screen/myPageBtn.svg";
import { CustomCalendar } from "@/app_components/main_screen/CustomCalendar"
import { ExpenseBar } from "@/app_components/main_screen/ExpenseBar";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function MainScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
        style={styles.mypageBtn}
        onPress={() => router.push("/main/my_page")}>
        <MyPageBtn />
      </TouchableOpacity>

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
  mypageBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: screenHeight * 0.05,
    right: screenWidth * 0.05,
    width: screenWidth * 0.14,
    height: screenHeight * 0.07,
    borderRadius: screenWidth,
    backgroundColor: "#fff",
    zIndex: 3,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
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