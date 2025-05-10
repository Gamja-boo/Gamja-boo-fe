import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker"
import Modal from "react-native-modal";
import UploadIcon from "@/app_assets/write_screen/UploadImage.svg"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function UploadImage() {
  const [image, setImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  {/* 갤러리에서 가져오기 */ }
  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  {/* 카메라로 사진 찍기 */ }
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal} style={styles.imageBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <UploadIcon />
        )}
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>사진 등록</Text>

          <TouchableOpacity onPress={takePhoto} style={styles.modalOption}>
            <Text>📷 카메라로 촬영하기</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={pickFromGallery} style={styles.modalOption}>
            <Text>🖼️ 앨범에서 선택하기</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={closeModal} style={styles.modalClose}>
            <Text style={{ fontWeight: "bold" }}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalClose: {
    marginTop: 15,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
})