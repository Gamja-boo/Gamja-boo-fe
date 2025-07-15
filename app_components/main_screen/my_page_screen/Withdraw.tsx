import { router } from 'expo-router';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function Withdraw() {
  return (
    <TouchableOpacity
      onPress={() => router.push('/main/my_page/withdraw')}
      style={styles.container}
    >
      <Text style={styles.text1}>회원 탈퇴</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#75E88C',
    borderRadius: screenWidth * 0.15,
    marginTop: screenHeight * 0.01,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    // shadow at Android
    elevation: 2,
  },
  text1: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '#fff',
  },
});
