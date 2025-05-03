import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const cellSize = Math.floor((Dimensions.get('window').width - 60) / 7);

interface CustomCalendarGridProps {
  rows: (number | null)[][];
  selectedMonth: number;
}

export default function CustomCalendarGrid({ rows, selectedMonth }: CustomCalendarGridProps) {
  const router = useRouter();
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;

  return (
    <View style={{ marginTop: 20 }}>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((d, colIdx) =>
            d === null ? (
              <View key={colIdx} style={styles.emptyCell} />
            ) : (
              // 날짜 누르면 지출 작성 화면으로 넘어감
              <TouchableOpacity 
                key={colIdx}
                onPress={() => 
                  router.push({
                    pathname: "/screens/expense_record/ExpenseRecord",
                    params: { day: d.toString(), month: selectedMonth.toString() }
                  })
                }
                style={[
                  styles.dayCell,
                  d === todayDate && selectedMonth === todayMonth && styles.todayCell]}>
                <Text style={[
                    styles.dayText,
                    d === todayDate && selectedMonth === todayMonth && styles.todayText]}>
                    {d}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { 
    flexDirection: "row", 
    justifyContent: "flex-start", 
    marginBottom: screenHeight * 0.015,
  },
  dayCell: { 
    width: cellSize, 
    height: cellSize, 
    marginHorizontal: screenWidth * 0.005, 
    marginVertical: screenHeight * 0.005,
    borderRadius: cellSize / 2, 
    justifyContent: "center", 
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dayText: { 
    fontSize: screenWidth * 0.04, 
    color: "#222", 
    fontWeight: "500" 
  },
  todayCell: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  todayText: {
    color: "#ffffff",
    fontWeight: "bold",
  },  
  emptyCell: { 
    width: cellSize, 
    height: cellSize, 
    marginHorizontal: screenWidth * 0.005, 
    marginVertical: screenHeight * 0.005, 
    borderRadius: cellSize / 2, 
    backgroundColor: "transparent" 
  }
});
