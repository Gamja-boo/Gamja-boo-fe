import { useTransactionInput } from '@/hooks/useTransactionInput';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export function WritingBox() {
  const { setMemo } = useTransactionInput();
  const [text, setText] = useState('');

  const handleChangeMemo = (text: string) => {
    setText(text);
    setMemo(text);
  };

  return (
    <TouchableOpacity style={styles.container}>
      <TextInput
        style={{ fontSize: screenWidth * 0.04 }}
        value={text}
        onChangeText={handleChangeMemo}
        multiline
        placeholder={'간단한 메모를 남겨보세요.'}
        placeholderTextColor="#CACABD"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: screenWidth * 0.06,
    borderColor: '#CACABD',
    borderWidth: 0.7,
    padding: screenWidth * 0.05,
  },
});
