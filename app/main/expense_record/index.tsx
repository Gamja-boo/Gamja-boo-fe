import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Button from '@/app_assets/expense_report_screen/write_screen/backButton.svg';
import Memo from '@/app_assets/expense_report_screen/Memo.svg';
import { DateDisplay } from '@/app_components/main_screen/expense_record_screen//DateDisplay';
import apiClient from '@/api/apiClient';
import { useMonthlyTransaction } from '@/hooks/useMonthlyTransaction';
import { Transaction } from '@/types/transaction';
import GamjaBasic from '@/assets/images/Gamja_basic.png';

const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ExpenseRecordScreen() {
  const router = useRouter();
  const { year } = useMonthlyTransaction();
  const { day, month, weekday } = useLocalSearchParams();
  const parsedMonth = typeof month === 'string' ? parseInt(month, 10) : parseInt(month[0], 10);
  const [isExpenditure, setIsExpenditure] = useState(true);
  const [transactionType, setTransactionType] = useState('E');
  const [eTypeDataNum, setETypeDataNum] = useState(0);
  const [iTypeDataNum, setItypeDataNum] = useState(0);
  const [dailyData, setDailyData] = useState<Transaction[]>([]);

  useEffect(() => {
    const getDailyData = async () => {
      const response = await apiClient.get(
        `/api/transaction?kakaoId=1&date=${year}-${months[parsedMonth - 1]}-${day.toString().padStart(2, '0')}`,
      );
      setDailyData(response.data.data);
      console.log(`${year}.${month}.${day} 일일 거래 내역: `, response.data.data);
    };
    getDailyData();
  }, [day, month, parsedMonth, year]);

  useEffect(() => {
    dailyData.forEach((item) => {
      if (item.transactionType === 'E') setETypeDataNum((prev) => prev + 1);
      if (item.transactionType === 'I') setItypeDataNum((prev) => prev + 1);
    });
  }, [dailyData]);

  return (
    <View style={styles.container}>
      {/* 뒤로 가기 버튼 */}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            router.push({
              pathname: '/main',
              params: {
                month: month,
                day: day,
              },
            })
          }
        >
          <Button />
        </TouchableOpacity>
      </View>

      {/* record로 넘어감 */}
      <TouchableOpacity
        style={styles.recordBtn}
        onPress={() =>
          router.push({
            pathname: '/main/expense_record/write',
            params: {
              day: day,
              month: month,
              weekday: weekday,
            },
          })
        }
      >
        <Memo />
      </TouchableOpacity>

      {/* 감도리 이미지 및 텍스트 */}
      <View style={styles.viewContainer}>
        <Image source={GamjaBasic} style={styles.imageBox} />
        <DateDisplay />
        <Text style={styles.recordText}>오늘의 지출을 기록해요!</Text>
      </View>

      {/* 수입/지출 버튼 */}
      <View
        style={{
          position: 'absolute',
          top: screenHeight * 0.44,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
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

      {/* 기록 저장 공간 */}
      <ScrollView
        horizontal={true}
        snapToInterval={screenWidth * 0.85}
        contentContainerStyle={{
          width: 'auto',
          height: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          paddingLeft: screenWidth * 0.1,
        }}
        style={{ width: '100%' }}
      >
        {(isExpenditure && eTypeDataNum === 0) || (!isExpenditure && iTypeDataNum === 0) ? (
          <View style={[styles.squareBox, { justifyContent: 'center' }]}>
            <Text>아직 기록된 지출이 없어요!</Text>
          </View>
        ) : (
          <>
            {dailyData.map((item, index) => {
              if (item.transactionType !== transactionType) return;

              return (
                <View key={index} style={styles.squareBox}>
                  <View style={styles.image} />
                  <View style={styles.categoryNameStyle}>
                    <Text style={styles.categoryNameText}>{item.categoryName}</Text>
                  </View>
                  <View style={styles.amountStyle}>
                    <Text style={styles.amountText}>{item.amount}</Text>
                  </View>
                  <View style={styles.memoStyle}>
                    <Text style={styles.memoText}>{item.memo}</Text>
                  </View>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFFF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    position: 'absolute',
    top: screenHeight * 0.04,
    left: screenWidth * 0.08,
  },
  backButton: {
    marginBottom: 20,
  },
  recordBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: screenHeight * 0.025,
    right: screenWidth * 0.05,
    width: screenWidth * 0.14,
    height: screenHeight * 0.07,
    borderRadius: screenWidth,
    backgroundColor: '#75E88C',
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.1,
  },
  imageBox: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    borderRadius: (screenWidth * 0.3) / 2,
    overflow: 'hidden',
    marginBottom: screenHeight * 0.05,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  recordText: {
    textAlign: 'center',
    marginTop: screenHeight * 0.025,
    fontSize: screenWidth * 0.04,
    fontFamily: 'pretendard',
    color: '#1c482d',
  },
  squareBox: {
    position: 'relative',
    width: screenWidth * 0.8,
    height: screenHeight * 0.4,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: screenWidth * 0.05,
    borderRadius: (screenWidth * 0.3) / 4,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  image: {
    width: screenWidth * 0.76,
    height: screenHeight * 0.28,
    borderRadius: (screenWidth * 0.3) / 6,
    marginTop: screenWidth * 0.02,
    backgroundColor: 'gray',
  },
  categoryNameStyle: {
    position: 'absolute',
    top: screenHeight * 0.19,
    left: screenWidth * 0.04,
    width: screenWidth * 0.2,
    height: screenHeight * 0.04,
    borderRadius: screenWidth * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FBC0',
    zIndex: 1,
  },
  categoryNameText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#329257',
  },
  amountStyle: {
    position: 'absolute',
    top: screenHeight * 0.24,
    left: screenWidth * 0.04,
    width: screenWidth * 0.2,
    height: screenHeight * 0.04,
    borderRadius: screenWidth * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8DC4',
    zIndex: 1,
  },
  amountText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#FFFFFF',
  },
  memoStyle: {
    width: screenWidth * 0.76,
    height: screenHeight * 0.09,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: screenWidth * 0.03,
    marginTop: screenWidth * 0.02,
    borderBottomLeftRadius: (screenWidth * 0.3) / 6,
    borderBottomRightRadius: (screenWidth * 0.3) / 6,
  },
  memoText: {
    fontSize: 14,
    fontWeight: 500,
    color: '#75BD91',
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
