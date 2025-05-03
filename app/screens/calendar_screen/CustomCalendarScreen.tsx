import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { getDaysInMonth, getFirstDayOfWeek } from "@/components/calendarUtils";
import MonthPicker from "@/components/MonthPicker";
import CustomCalendarGrid from "@/components/CustomCalendarGrid";

export default function CustomCalendarScreen() {
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
        <Text style={styles.arrow}>▼</Text>
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
    paddingTop: 60 
  },
  monthPickerBtn: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    borderRadius: 30, 
    paddingVertical: 10, 
    paddingHorizontal: 40, 
    marginBottom: 10, 
    elevation: 3 
  },
  monthText: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#469F37",
  },
  arrow: { 
    fontSize: 15, 
    color: "#49B875", 
    marginLeft: 15,
  }
});
