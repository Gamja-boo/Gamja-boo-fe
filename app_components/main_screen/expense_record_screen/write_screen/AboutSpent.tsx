import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SpentCategory } from '@/app_components/main_screen/expense_record_screen/write_screen/SpentCategory';
import { SpentBg } from '@/app_components/main_screen/expense_record_screen/write_screen/SpentBg';
import { SpentMoney } from '@/app_components/main_screen/expense_record_screen/write_screen/SpentMoney';
import { useTransactionInput } from '@/hooks/useTransactionInput';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function AboutSpent() {
  const { setTransactionType } = useTransactionInput();
  const [isExpenditure, setIsExpenditure] = useState(true);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: screenWidth * 0.04,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsExpenditure(true);
            setTransactionType('E');
          }}
          style={
            isExpenditure
              ? { ...styles.on, marginRight: screenWidth * 0.01 }
              : { ...styles.off, marginRight: screenWidth * 0.01 }
          }
        >
          <Text style={isExpenditure ? styles.onText : styles.offText}>지출</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsExpenditure(false);
            setTransactionType('I');
          }}
          style={
            isExpenditure
              ? { ...styles.off, marginLeft: screenWidth * 0.01 }
              : { ...styles.on, marginLeft: screenWidth * 0.01 }
          }
        >
          <Text style={isExpenditure ? styles.offText : styles.onText}>소득</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.textCon}>
          <Text style={styles.text}>{isExpenditure ? '지출' : '소득'} 카테고리</Text>
          <Text style={styles.text}>{isExpenditure ? '지출' : '소득'} 배경</Text>
          <Text style={styles.text}>{isExpenditure ? '지출' : '소득'} 금액</Text>
        </View>
        <View style={styles.writeCon}>
          <SpentCategory />
          <SpentBg />
          <SpentMoney />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: screenWidth * 0.5,
  },
  textCon: {
    justifyContent: 'center',
    gap: screenHeight * 0.04,
    marginRight: screenWidth * 0.05,
  },
  writeCon: {
    justifyContent: 'center',
    gap: screenHeight * 0.01,
    marginLeft: screenWidth * 0.05,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: screenWidth * 0.1,
  },
  text: {
    fontSize: screenWidth * 0.035,
    color: '#329257',
  },
  on: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.18,
    height: screenHeight * 0.036,
    borderRadius: screenHeight * 0.018,
    backgroundColor: '#6AD780',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // ios 그림자 효과
    elevation: 6, // 안드로이드 그림자 효과
  },
  off: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.18,
    height: screenHeight * 0.036,
    borderRadius: screenHeight * 0.018,
    backgroundColor: '#FCFFF6',
  },
  onText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  offText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#329257',
  },
});
