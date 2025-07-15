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
        {dailyData.length === 0 ? (
          <View style={styles.squareBox}>
            <Text>아직 기록된 지출이 없어요!</Text>
          </View>
        ) : (
          <>
            {dailyData.map((item, index) => (
              <View key={index} style={styles.squareBox}>
                <Text>{item.categoryName}</Text>
                <Text>{item.background}</Text>
                <Text>{item.memo}</Text>
              </View>
            ))}
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
    width: screenWidth * 0.8,
    height: screenHeight * 0.4,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
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
});
