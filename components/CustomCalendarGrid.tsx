import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const cellSize = Math.floor((Dimensions.get('window').width - 60) / 7);

interface CustomCalendarGridProps {
  rows: (number | null)[][];
}

export default function CustomCalendarGrid({ rows }: CustomCalendarGridProps) {
  return (
    <View style={{ marginTop: 20 }}>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((d, colIdx) =>
            d === null ? (
              <View key={colIdx} style={styles.emptyCell} />
            ) : (
              <View
                key={colIdx}
                style={[styles.dayCell]}
              >
                <Text style={styles.dayText}>{d}</Text>
              </View>
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
    marginBottom: 12 
  },
  dayCell: { 
    width: cellSize, 
    height: cellSize, 
    marginHorizontal: 2, 
    marginVertical: 2, 
    borderRadius: cellSize / 2, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  dayText: { 
    fontSize: 16, 
    color: "#222", 
    fontWeight: "500" 
  },
  emptyCell: { 
    width: cellSize, 
    height: cellSize, 
    marginHorizontal: 2, 
    marginVertical: 2, 
    borderRadius: cellSize / 2, 
    backgroundColor: "transparent" 
  }
});
