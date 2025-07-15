import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNickname } from '@/context/NicknameContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function ShowNickname() {
  const { nickname } = useNickname();

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>{nickname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFFF6',
    borderRadius: screenWidth * 0.15,
    marginBottom: screenHeight * 0.01,
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
    color: '#329257',
  },
});
