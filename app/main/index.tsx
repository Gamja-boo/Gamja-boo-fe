import { useState } from "react";
import { View, StatusBar, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import MyPageBtn from "@/app_assets/main_screen/myPageBtn.svg";
import CalendarBtn from "@/app_assets/main_screen/calendarBtn.svg";
import { ShowMonth } from "@/app_components/main_screen/ShowMonth";
import { CalendarWheel } from "@/app_components/main_screen/CalendarWheel";
import { CustomCalendarGrid } from "@/app_components/main_screen/CustomCalendarGrid";
import { generateCalendarGrid } from "@/app_utils/CalendarLogic";
import { DailyBudget } from "@/app_components/main_screen/DailyBudget";
import { ExpenseBar } from "@/app_components/main_screen/ExpenseBar";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function MainScreen() {
  const router = useRouter();

  const today = new Date();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth ] = useState(today.getMonth() + 1);
  const rows = generateCalendarGrid(selectedYear, selectedMonth);

  return (
    <View style={styles.container}>
      
      {/* 마이페이지 버튼 */}
      <TouchableOpacity 
        style={styles.mypageBtn}
        onPress={() => router.push("/main/my_page")}>
        <MyPageBtn width={ screenWidth * 0.13 } height={ screenHeight * 0.13 }/>
      </TouchableOpacity>

      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      { /* 전체적인 달력 관련 요소들 */}
      <View style={styles.calendar}>

        <TouchableOpacity 
          style={styles.calendarBtn}
          onPress={() => setModalVisible(true)}
        >
          <CalendarBtn width={ screenWidth * 0.13 } height={ screenHeight * 0.13 }/>
        </TouchableOpacity>

        <View style={styles.showContainer}>
          <ShowMonth selectedMonth={selectedMonth}/>
        </View>

        <CalendarWheel
          visible={modalVisible}
          selectedMonth={selectedMonth}
          onSelect={(month) => {
            setSelectedMonth(month);
            setModalVisible(false);
          }}
          onClose={() => setModalVisible(false)}
        />

        <View style={styles.gridContainer}>
          <CustomCalendarGrid rows={rows} selectedMonth={selectedMonth} />
        </View>
      </View>

      { /* 하루 예산을 책정하는 바 */}
      <View style={styles.dailyBudgetContainer}>
        <DailyBudget />
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
    top: screenHeight * 0.03,
    right: screenWidth * 0.19,
    width: screenWidth * 0.12,
    height: screenHeight * 0.06,
    borderRadius: screenWidth,
    zIndex: 3,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  calendarBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: screenHeight * 0.03,
    right: screenWidth * 0.04,
    width: screenWidth * 0.12,
    height: screenHeight * 0.06,
    borderRadius: screenWidth,
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
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    alignItems: "center",
  },
  showContainer: {
    alignItems: "center",
    width: screenWidth,
    height: screenHeight * 0.055,
    top: screenHeight * 0.1,
  },
  gridContainer: {
    alignItems: "center",
    top: screenHeight * 0.1,
    paddingHorizontal: screenWidth * 0.1,
    backgroundColor: "#000",
  },
  dailyBudgetContainer: {
    position: "absolute",
    bottom: screenHeight * 0.3,  
    width: screenWidth,
    height: screenHeight * 0.06,
  },
  expenseBarContainer: {
    position: "absolute",
    bottom: screenHeight * 0.19,  
    width: screenWidth,
  },
});