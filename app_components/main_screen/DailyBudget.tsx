import { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export function DailyBudget() {
  const [amount, setAmount] = useState("");  // 예산 금액을 저장
  const [message, setMessage] = useState("");  // 메시지를 보여줄 상태

  // 입력 값 변경 처리
  const handleChangeAmount = (text: string) => {
    setAmount(text);
  };

  // 예산 등록 처리
  const handleAddBudget = async () => {
    // 필드 값 검증
    if (!amount || isNaN(Number(amount))) {
      setMessage("유효한 예산 금액을 입력하세요.");
      return;
    }

    try {
      const response = await fetch("http://192.168.45.17:8080/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const data = await response.json();
        setMessage(data.message || "등록 실패");
      }
    } catch (error) {
      setMessage("서버와의 연결에 문제가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>하루 예산</Text>
      <View style={styles.separator}></View>
      
      {/* 예산 금액 입력 */}
      <TouchableOpacity
        onPress={() => setAmount("")}
      >
        <TextInput
          style={styles.text2}
          value={amount}
          onChangeText={handleChangeAmount}
          keyboardType="numeric"
          placeholder="예산 금액"
          placeholderTextColor="#65BE71"
        />
      </TouchableOpacity>

      {/* 예산 등록 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleAddBudget}>
        <Text style={styles.buttonText}>등록</Text>
      </TouchableOpacity>

      {/* 메시지 표시 */}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    borderRadius: screenWidth * 0.1,
    marginHorizontal: screenWidth * 0.12,
    gap: screenWidth * 0.04,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  text1: {
    fontSize: screenWidth * 0.035,
    color: "#80D892",
  },
  text2: {
    fontSize: screenWidth * 0.035,
    color: "#65BE71",
  },
  separator: {
    width: screenWidth * 0.002,
    height: "50%",
    backgroundColor: "#80D892",
  },
  button: {
    backgroundColor: "#65BE71",
    padding: screenWidth * 0.03,
    borderRadius: screenWidth * 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: screenWidth * 0.04,
    textAlign: "center",
  },
  message: {
    marginTop: screenWidth * 0.05,
    fontSize: screenWidth * 0.03,
    color: "#65BE71",
  },
})