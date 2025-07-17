import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Cancel from "@/app_assets/expense_report_screen/write_screen/cancelBtn.svg";
import { useRouter } from "expo-router";
import { useCharacter } from "@/context/CharacterContext";
import { useGamdoring } from "@/context/GamdoringContext";


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function PurchaseBtn({
  selectedSkin,
  selectedCloth,
  selectedAccessory,
}: {
  selectedSkin: string | null;
  selectedCloth: string | null;
  selectedAccessory: string | null;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const { setCharacter } = useCharacter();
  const { gamdoring, substractGamdoring } = useGamdoring();
  
  const selectedCount =
      (selectedSkin ? 3 : 0) +
      (selectedCloth ? 3 : 0) +
      (selectedAccessory ? 3 : 0);

  const handlePurchase = async () => {
    await substractGamdoring(selectedCount);

    setCharacter({
      skin: selectedSkin,
      cloth: selectedCloth,
      accessory: selectedAccessory,
    });

    router.replace({
      pathname: '/main/character/customizing/purchase_item',
      params: {
        skin: selectedSkin ?? '',
        cloth: selectedCloth ?? '',
        accessory: selectedAccessory ?? '',
      },
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal} style={styles.purchaseBtn}>
        <Text style={styles.text}>구매하기</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackButtonPress={closeModal} style={styles.modal}>
        <TouchableOpacity onPress={closeModal} style={styles.modalClose}>
          <Cancel />
        </TouchableOpacity>

        <View style={styles.modalContent}>
          <View style={styles.modalOption}>
            <Text style={styles.modalText}>필요 감도링</Text>
            <Text style={styles.modalText}>{selectedCount}</Text>
          </View>

          <View style={styles.modalOption}>
            <Text style={styles.modalText}>보유 감도링</Text>
            <Text style={styles.modalText}>{gamdoring}</Text>
          </View>

          <View style={styles.modalOption}>
            <View style={styles.separator} />
          </View>

          <View style={styles.modalOption}>
            <Text style={styles.modalText}>남는 감도링</Text>
            <Text style={styles.modalText}>{gamdoring - selectedCount}</Text>
          </View>

          <TouchableOpacity onPress={handlePurchase} style={styles.payment}>
            <Text style={styles.paymentText}>결제하기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  purchaseBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight * 0.07,
    width: screenWidth * 0.57,
    backgroundColor: '#75E88C',
    borderTopLeftRadius: screenHeight * 0.05,
    borderTopRightRadius: screenHeight * 0.05,
    borderBottomRightRadius: screenHeight * 0.05,
    borderBottomLeftRadius: screenHeight * 0.05,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  text: {
    fontSize: screenWidth * 0.05,
    color: '#fff',
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: screenWidth * 0.1,
    paddingVertical: screenHeight * 0.035,
    borderTopLeftRadius: screenWidth * 0.1,
    borderTopRightRadius: screenWidth * 0.1,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: screenWidth * 0.02,
    gap: screenWidth * 0.3,
  },
  modalClose: {
    alignItems: 'center',
    paddingBottom: screenWidth * 0.05,
  },
  modalText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '#329257',
  },
  separator: {
    width: screenWidth * 0.54,
    height: screenHeight * 0.001,
    backgroundColor: '#329257',
  },
  payment: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#75E88C',
    margin: screenWidth * 0.015,
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.03,
    borderRadius: screenWidth * 0.1,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  paymentText: {
    fontSize: screenWidth * 0.05,
    color: '#fff',
  },
});
