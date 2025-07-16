import apiClient from '@/api/apiClient';
import { useMonthlyTransaction } from '@/hooks/useMonthlyTransaction';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';

interface DailyBudget {
  minimum: string;
  setMinimum: React.Dispatch<React.SetStateAction<string>>;
  maximum: string;
  setMaximum: React.Dispatch<React.SetStateAction<string>>;
  hasData: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export function DailyBudget({ minimum, setMinimum, maximum, setMaximum, hasData }: DailyBudget) {
  const today = new Date();
  const { year } = useMonthlyTransaction();
  const parsedMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const parsedDay = today.getDate().toString().padStart(2, '0');
  const maximumRef = useRef<TextInput>(null);

  const handleSubmit = async () => {
    try {
      if (hasData) {
        const response = await apiClient.put('/api/budget', {
          kakaoId: 1,
          date: `${year}-${parsedMonth}-${parsedDay}`,
          minAmount: parseInt(minimum),
          maxAmount: parseInt(maximum),
        });
        console.log(
          `${year}.${parsedMonth}.${parsedDay} 일일 예산 등록 성공: `,
          response.data.data,
        );
      } else {
        const response = await apiClient.post('/api/budget', {
          kakaoId: 1,
          date: `${year}-${parsedMonth}-${parsedDay}`,
          minAmount: parseInt(minimum),
          maxAmount: parseInt(maximum),
        });
        console.log(
          `${year}.${parsedMonth}.${parsedDay} 일일 예산 등록 성공: `,
          response.data.data,
        );
      }
    } catch (error) {
      console.log(`${year}.${parsedMonth}.${parsedDay} 일일 예산 등록 실패: `, error);
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text1}>하루 예산</Text>
      <View style={styles.separator}></View>

      <TextInput
        style={styles.text2}
        value={minimum}
        onChangeText={setMinimum}
        onSubmitEditing={() => {
          maximumRef.current?.focus();
        }}
        blurOnSubmit={false}
        keyboardType="numeric"
        returnKeyType="next"
        placeholder="00,000"
        placeholderTextColor="#65BE71"
      />

      <Text style={styles.text2}>-</Text>

      <TextInput
        style={styles.text2}
        ref={maximumRef}
        value={maximum}
        onChangeText={setMaximum}
        onSubmitEditing={handleSubmit}
        keyboardType="numeric"
        placeholder="00,000"
        placeholderTextColor="#65BE71"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: screenWidth * 0.15,
    marginHorizontal: screenWidth * 0.12,
    gap: screenWidth * 0.05,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  text1: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'semibold',
    color: '#80D892',
  },
  text2: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'semibold',
    color: '#65BE71',
  },
  separator: {
    width: screenWidth * 0.002,
    height: '50%',
    backgroundColor: '#80D892',
    marginHorizontal: screenWidth * 0.02,
  },
});
