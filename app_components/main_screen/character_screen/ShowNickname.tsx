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
    height: screenHeight * 0.035,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFFF6',
    borderColor: '#329257',
    borderRadius: screenWidth * 0.15,
    borderWidth: 0.5,
    paddingHorizontal: screenWidth * 0.05,
    marginBottom: screenHeight * 0.03,
  },
  text1: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'semibold',
    color: '#329257',
  },
});
