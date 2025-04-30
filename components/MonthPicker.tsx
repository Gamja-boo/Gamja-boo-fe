import React from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { months } from "./calendarUtils";

interface MonthPickerProps {
  visible: boolean;
  selectedMonth: number;
  onSelect: (month: number) => void;
  onClose: () => void;
}

export default function MonthPicker({ visible, selectedMonth, onSelect, onClose }: MonthPickerProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBg}>
        <View style={styles.modalBox}>
          {months.map((m, idx) => (
            <TouchableOpacity
              key={m}
              onPress={() => onSelect(idx + 1)}
              style={{ padding: 10 }}
            >
              <Text style={{ fontSize: 18, color: idx + 1 === selectedMonth ? "#4CAF50" : "#222" }}>{m}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onClose}>
            <Text style={{ marginTop: 16, color: "#999" }}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.16)", justifyContent: "center", alignItems: "center" },
  modalBox: { backgroundColor: "#fff", borderRadius: 14, padding: 24, alignItems: "center", elevation: 5 }
});
