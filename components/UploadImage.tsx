import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker"
import UploadIcon from "@/app_assets/write_screen/UploadImage.svg"
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function UploadImage() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <TouchableOpacity 
        onPress={ pickImage } 
        style={styles.imageBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <UploadIcon />    
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    width: screenWidth,
    height: screenHeight * 0.55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: screenHeight * 0.05,
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
})