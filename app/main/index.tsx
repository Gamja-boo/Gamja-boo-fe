import { useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MyPageBtn from '@/app_assets/main_screen/myPageBtn.svg';
import CalendarBtn from '@/app_assets/main_screen/calendarBtn.svg';
import { ShowMonth } from '@/app_components/main_screen/ShowMonth';
import { CalendarWheel } from '@/app_components/main_screen/CalendarWheel';
import { CustomCalendarGrid } from '@/app_components/main_screen/CustomCalendarGrid';
import { generateCalendarGrid } from '@/app_utils/calendar/generateCalendarGrid';
import { DailyBudget } from '@/app_components/main_screen/DailyBudget';
import { ExpenseBar } from '@/app_components/main_screen/ExpenseBar';
import BackBtn from '@/app_assets/setting_nickname_screen/button.svg';
import { useTransactionInput } from '@/hooks/useTransactionInput';
import { useMonthlyTransaction } from '@/hooks/useMonthlyTransaction';
import apiClient from '@/api/apiClient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MainScreen() {
  const today = new Date();
  const parsedTodayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const parsedTodayDay = today.getDate().toString().padStart(2, '0');
  const router = useRouter();
  const { kakaoId } = useTransactionInput();
  const { year } = useMonthlyTransaction();
  const { month } = useLocalSearchParams();
  const parsedMonth = month
    ? typeof month === 'string'
      ? parseInt(month, 10)
      : parseInt(month[0], 10)
    : today.getMonth() + 1;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(parsedMonth);
  const [minimum, setMinimum] = useState('');
  const [maximum, setMaximum] = useState('');
  const [hasData, setHasData] = useState(false);
  const [expenditure, setExpenditure] = useState(0);
  const rows = generateCalendarGrid(selectedYear, selectedMonth);
  const { yearlyData } = useMonthlyTransaction();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    const getBudgetData = async () => {
      try {
        const response = await apiClient.get(
          `/api/budget/${year}-${parsedTodayMonth}-${parsedTodayDay}?kakaoId=${kakaoId}`,
        );
        setMinimum(response.data.data.minAmount.toString());
        setMaximum(response.data.data.maxAmount.toString());
        setHasData(true);
        console.log(
          `${year}.${parsedTodayMonth}.${parsedTodayDay} 일일 예산 내역: `,
          response.data.data,
        );
      } catch (error) {
        setHasData(false);
        console.log(
          `${year}.${parsedTodayMonth}.${parsedTodayDay} 일일 예산 내역 조회 실패: `,
          error,
        );
      }
    };
    getBudgetData();
  }, [kakaoId, year, parsedTodayDay, parsedTodayMonth]);

  useEffect(() => {
    const getDailyExpenditure = async () => {
      try {
        const response = await apiClient.get(
          `/api/stats/daily/${year}-${parsedTodayMonth}-${parsedTodayDay}?kakaoId=${kakaoId}`,
        );
        setExpenditure(response.data.data.totalSpent);
        console.log(
          `${year}.${parsedTodayMonth}.${parsedTodayDay} 일일 지출 내역: `,
          response.data.data.totalSpent,
        );
      } catch (error) {
        console.log(
          `${year}.${parsedTodayMonth}.${parsedTodayDay} 일일 지출 내역 조회 실패: `,
          error,
        );
      }
    };
    getDailyExpenditure();
  });

  return (
    <View style={styles.container}>
      {/* 고정 뷰 */}
      <View style={styles.fixedContainer}>
        {/* 임시 로그인 화면 돌아가기 버튼 */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/login_setting')}>
          <BackBtn width={screenWidth * 0.14} height={screenHeight * 0.14} />
        </TouchableOpacity>

        {/* 마이페이지 버튼 */}
        <TouchableOpacity style={styles.mypageBtn} onPress={() => router.push('/main/my_page')}>
          <MyPageBtn width={screenWidth * 0.14} height={screenHeight * 0.14} />
        </TouchableOpacity>

        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* 전체적인 달력 관련 요소들 */}
        <View style={styles.calendar}>
          <TouchableOpacity style={styles.calendarBtn} onPress={() => setModalVisible(true)}>
            <CalendarBtn width={screenWidth * 0.14} height={screenHeight * 0.14} />
          </TouchableOpacity>

          <View style={styles.showContainer}>
            <ShowMonth selectedMonth={selectedMonth} />
          </View>

          <CalendarWheel
            visible={modalVisible}
            selectedMonth={selectedMonth}
            onSelect={(month) => {
              setSelectedMonth(month);
              setModalVisible(false);
            }}
            onClose={() => setModalVisible(false)}
          />
          <View style={styles.gridContainer}>
            <CustomCalendarGrid rows={rows} selectedMonth={selectedMonth} />
          </View>
        </View>

        {/* 백드롭 설정 */}
        {keyboardVisible && (
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={Keyboard.dismiss} />
        )}
      </View>

      {/* 뷰를 올려줌 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={styles.avoidContainer}
        keyboardVerticalOffset={0}
      >
        {/* 하루 예산을 책정하는 바 */}
        <View style={styles.dailyBudgetContainer}>
          <DailyBudget
            minimum={minimum}
            setMinimum={setMinimum}
            maximum={maximum}
            setMaximum={setMaximum}
            hasData={hasData}
          />
        </View>

        {/* 지출을 표시하는 바 */}
        <View style={styles.expenseBarContainer}>
          <ExpenseBar
            today={expenditure}
            compare={parseInt(maximum) - expenditure}
            balance={
              yearlyData[parseInt(parsedTodayMonth) - 1]?.totalIncome -
              yearlyData[parseInt(parsedTodayMonth) - 1]?.totalSpent
            }
          />
        </View>
      </KeyboardAvoidingView>
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
  fixedContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  avoidContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // 어두운 반투명
    zIndex: 2,
  },
  mypageBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: screenHeight * 0.02,
    right: screenWidth * 0.19,
    width: screenWidth * 0.12,
    height: screenHeight * 0.06,
    borderRadius: screenWidth,
    zIndex: 3,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  backBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: screenHeight * 0.02,
    left: screenWidth * 0.1,
    width: screenWidth * 0.12,
    height: screenHeight * 0.06,
    borderRadius: screenWidth,
    zIndex: 3,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  calendarBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: screenHeight * 0.02,
    right: screenWidth * 0.04,
    width: screenWidth * 0.12,
    height: screenHeight * 0.06,
    borderRadius: screenWidth,
    zIndex: 3,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  text: {
    fontSize: screenWidth * 0.075,
    fontWeight: 'bold',
  },
  calendar: {
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
  },
  showContainer: {
    alignItems: 'center',
    height: screenHeight * 0.06,
    top: screenHeight * 0.09,
  },
  gridContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: screenHeight * 0.1,
    height: screenHeight * 0.5,
    paddingHorizontal: screenWidth * 0.1,
  },
  dailyBudgetContainer: {
    position: 'absolute',
    bottom: screenHeight * 0.28,
    height: screenHeight * 0.06,
  },
  expenseBarContainer: {
    position: 'absolute',
    bottom: screenHeight * 0.19,
  },
});
