import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { getDaysInMonth, getFirstDayOfWeek } from "@/app_utils/calendarUtils";
import { MonthPicker } from "@/app_components/main_screen/MonthPicker";
import { CustomCalendarGrid }from "@/app_components/main_screen/CustomCalendarGrid";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function CustomCalendar() {
  const today = new Date();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);

  // 달력 데이터 생성
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDayOfWeek = getFirstDayOfWeek(selectedYear, selectedMonth);
  const blanks = Array.from({ length: firstDayOfWeek }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const allCells = [...blanks, ...days];
  while (allCells.length % 7 !== 0) allCells.push(null);
  const rows = [];
  for (let i = 0; i < allCells.length; i += 7) rows.push(allCells.slice(i, i + 7));

  return (
    <View style={styles.container}>

      {/* 월 선택 버튼 */}
      <TouchableOpacity 
        style={styles.monthPickerBtn} 
        onPress={() => setModalVisible(true)} activeOpacity={0.7}>
        <Text style={styles.monthText}>{`${selectedMonth}월`}</Text>
      </TouchableOpacity>

      {/* MonthPicker 모달 */}
      <MonthPicker
        visible={modalVisible}
        selectedMonth={selectedMonth}
        onSelect={(month) => { setSelectedMonth(month); setModalVisible(false); }}
        onClose={() => setModalVisible(false)}
      />

      {/* 달력 그리드 */}
      <CustomCalendarGrid rows={rows} selectedMonth={selectedMonth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FCFDF6", 
    alignItems: "center", 
    paddingTop: screenHeight * 0.07,
  },
  monthPickerBtn: { 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    width: screenWidth * 0.28,
    height: screenHeight * 0.065,
    borderRadius: screenWidth * 0.08,
    paddingVertical: screenHeight * 0.01,
    marginBottom: screenHeight * 0.01,
    elevation: 3 
  },
  monthText: { 
    fontSize: screenWidth * 0.06,
    fontWeight: "bold", 
    color: "#469F37",
  },
});
