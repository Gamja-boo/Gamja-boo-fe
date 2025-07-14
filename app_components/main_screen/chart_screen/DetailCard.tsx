import React from 'react';
import { Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

interface typeOfProps {
  categoryName: string;
  amount: number;
  percent: number;
  color: string;
  textColor: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryType: React.Dispatch<React.SetStateAction<string>>;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const DatailCard = ({
  setModalVisible,
  setCategoryType,
  categoryName,
  amount,
  percent,
  color,
  textColor,
}: typeOfProps): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
        setCategoryType(categoryName);
      }}
      style={{ ...styles.card, backgroundColor: color }}
    >
      <Text style={{ ...styles.text1, color: textColor }}>{categoryName}</Text>
      <Text style={{ ...styles.text1, color: textColor }}>{amount}원</Text>
      <Text style={{ ...styles.text2, color: textColor }}>{percent}%</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: screenWidth * 0.76,
    height: screenHeight * 0.08,
    marginBottom: screenHeight * 0.03,
    backgroundColor: '',
    borderRadius: screenWidth * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // ios 그림자 효과
    elevation: 6, // 안드로이드 그림자 효과
  },
  text1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  text2: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
