import { useTransactionInput } from '@/hooks/useTransactionInput';
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, TextInput } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function SpentMoney() {
  const { setAmount } = useTransactionInput();
  const [money, setMoney] = useState('');

  const handleChangeAmount = (text: string) => {
    const numericOnly = text.replace(/[^0-9]/g, ''); // 숫자 이외 제거
    setMoney(numericOnly);
    setAmount(parseInt(numericOnly));
  };

  return (
    <TouchableOpacity style={styles.container}>
      <TextInput
        style={styles.text}
        value={money}
        onChangeText={handleChangeAmount}
        keyboardType="numeric"
        placeholder="000,000"
        placeholderTextColor="#329257"
      />
      <Text style={styles.unit}>원</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.055,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFFF6',
    borderRadius: screenWidth * 0.05,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 2,
  },
  text: {
    fontSize: screenWidth * 0.04,
    color: '#329257',
  },
  unit: {
    fontSize: screenWidth * 0.04,
    color: '#329257',
  },
});
