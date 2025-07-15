import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function Code() {

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text1}>감도링 코드</Text>
      <Text style={styles.text2}>123456</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.04,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCFFF6",
    borderRadius: screenWidth * 0.15,
    marginTop: screenHeight * 0.15,
    marginBottom: screenHeight * 0.03,
    gap: screenWidth * 0.04,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    // shadow at Android
    elevation: 2,
  },
  text1: {
    fontSize: screenWidth * 0.03,
    color: "#329257",
  },
  text2: {
    fontSize: screenWidth * 0.03,
    fontWeight: "bold",
    color: "#329257",
  },
})