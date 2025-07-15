import { useTransactionInput } from '@/hooks/useTransactionInput';
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function SpentBg() {
  const { setBackground } = useTransactionInput();
  const [text, setText] = useState('');

  const handleChangeBackground = (text: string) => {
    setText(text);
    setBackground(text);
  };

  return (
    <TouchableOpacity style={styles.container}>
      <TextInput
        style={styles.text}
        value={text}
        onChangeText={handleChangeBackground}
        placeholder="감쟈부"
        placeholderTextColor="#329257"
      />
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
    color: '#329257',
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
});
