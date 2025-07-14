import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import CheckButtonIcon from "@/app_assets/expense_report_screen/write_screen/checkButton.svg";
import RecordIcon from "@/app_assets/expense_report_screen/write_screen/record.svg";
import { router } from "expo-router";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function SaveRecord() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <CheckButtonIcon />
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modal}>

        <View style={styles.modalContent}>
          <Text style={styles.modalText}>이 내용으로 일기를 남겨볼까요?</Text>
          <TouchableOpacity onPress={() => router.push("/main/expense_record")} style={styles.modalOption}>
            <RecordIcon />
            <Text style={styles.text}>일기 저장하기</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: screenWidth * 0.04,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    height: screenHeight * 0.25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: screenWidth * 0.1,
    paddingVertical: screenHeight * 0.035,
    borderRadius: screenWidth * 0.07,
  },
  modalText: {
    color: "#329257",
    fontSize: screenWidth * 0.04,
    fontWeight: "semibold",
    marginBottom: screenHeight * 0.02,
  },
  modalOption: {
    flexDirection: "row",
    width: screenWidth * 0.6,
    height: screenHeight * 0.075,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#75E88C",
    padding: screenWidth * 0.04,
    margin: screenWidth * 0.015,
    borderRadius: screenWidth * 0.1,
    gap: screenWidth * 0.03,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 2,
  },
})