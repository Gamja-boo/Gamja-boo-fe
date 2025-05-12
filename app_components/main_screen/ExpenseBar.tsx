import React from "react";
import { View, Text, StyleSheet } from "react-native";


interface Props {
  today: number;
  compare: number;
  balance: number;
}

export function ExpenseBar({ today, compare, balance}: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.label}>오늘 지출</Text>
        <Text style={styles.amount}>{today.toLocaleString()}</Text>
      </View>

      <View style={styles.separator} />
      
      <View style={styles.item}>
        <Text style={styles.label}>어제 대비 지출</Text>
        <Text style={styles.amount}>{compare.toLocaleString()}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.item}>
        <Text style={styles.label}>잔액</Text>
        <Text style={styles.amount}>{balance.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#75E88C",
    borderRadius: 60,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  item: {
    alignItems: "center",
    flex: 1
  },
  label: {
    fontSize: 11,
    color: "#596338",
    marginBottom: 4
  },
  amount: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "bold"
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
  },
});