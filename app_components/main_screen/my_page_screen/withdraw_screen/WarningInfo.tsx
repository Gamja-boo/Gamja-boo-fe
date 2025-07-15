import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNickname } from '@/context/NicknameContext';
import Warning from '@/app_assets/my_page_screen/withdraw_screen/warning.svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function WarningInfo() {
  const { nickname } = useNickname();

  return (
    <View style={styles.container}>
      <Warning />
      <Text style={styles.text1}>
        <Text style={styles.text2}>{nickname} </Text>
        {`과(와)의\n모든 추억들은 감자별로 이동합니다.\n회원 탈퇴에 동의하십니까?`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.65,
    height: screenHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFFF6',
    borderRadius: screenWidth * 0.07,
    marginBottom: screenHeight * 0.03,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    // shadow at Android
    elevation: 2,
  },
  text1: {
    textAlign: 'center',
    fontSize: screenWidth * 0.035,
    fontWeight: 'semibold',
    color: '#329257',
    lineHeight: screenHeight * 0.027,
    marginTop: screenHeight * 0.015,
  },
  text2: {
    textAlign: 'center',
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    color: '#329257',
    lineHeight: screenHeight * 0.027,
  },
});
