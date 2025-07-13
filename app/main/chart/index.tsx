import React, { useRef, useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  InteractionManager,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { PieChart } from "react-native-chart-kit";
import Svg, { Path } from "react-native-svg";
import { getMonthlyExpenses } from "@/app_utils/finance/getMonthlyExpenses";
import { getMonthlyDailyExpenses } from "@/app_utils/finance/getMonthlyDailyExpenses";
import { PieChartCategory } from "@/app_components/main_screen/chart_screen/PieChartCategory";
import { Header } from "@/app_components/main_screen/chart_screen/Header";
import { BarGraph } from "@/app_components/main_screen/chart_screen/BarGraph";
import { DatailCard } from "@/app_components/main_screen/chart_screen/DetailCard";
import { Monthlyexpenses } from "@/types/Monthlyexpenses";
import DoubleArrowDown from "@/app_assets/chart_screen/double_arrow_down.svg";
import ArrowDown from "@/app_assets/chart_screen/arrow_down.svg";
import ArrowUp from "@/app_assets/chart_screen/arrow_up.svg";
import CurevedBackArrow from "@/app_assets/chart_screen/curve_arrow_back.svg";

interface list {
  date: string;
  background: string;
  amount: number;
}

type monthlyDailyExpenses = {
  categoryName: string;
  list: list[];
}[];

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  // largeArcFlag는 두 점(start, end)을 반드시 지나는 반지름이 r인 호 중,
  // 0이면 작은 호를, 1이면 큰 호를 선택하여 경계로 설정

  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
} // largeArcFlag 옆의 값이
// 0인 경우, 현재 위치(시작점: (start.x, start.y))에서 끝점(end.x, end.y)까지 반시계 방향으로 이동하는 경로로 그림
// 1인 경우, 시계 방향으로 이동하는 경로로 그림

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export default function ChartScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  // ScrollView의 내부 메서드를 사용하기 위해 외부에 ScrollView 인스턴스 생성
  // 이후 실제 ScrollView가 속성을 조작해 놓은 인스턴스를 참조하게끔 함 -> ref={scrollRef}
  const isFocused = useIsFocused();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const [monthOfCurrentInfo, setMonthOfCurrentInfo] = useState(months[month]);
  const [yearOfCurrentInfo, setYearOfCurrentInfo] = useState(year.toString());
  const [isExpenditure, setIsExpenditure] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pathRef = useRef<Path>(null);
  const [graphVisible, setgraphVisible] = useState(false);
  const [hideDoubleArrowDown, setHideDoubleArrowDown] = useState(false);
  const floatAnim = useRef(new Animated.Value(0)).current;
  const [showDetail, setShowDetail] = useState(false);
  const hideAnim = useRef(new Animated.Value(1)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryType, setCategoryType] = useState("기타");

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, [floatAnim]);

  const chartAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      animatedValue.setValue(0);
    });

    const id = animatedValue.addListener(({ value }) => {
      const angle = value * 360;
      const d = describeArc(
        screenHeight * 0.18,
        screenHeight * 0.18,
        screenHeight * 0.18,
        angle,
        360
      );
      if (pathRef.current) {
        pathRef.current.setNativeProps({ d });
      }
    });

    setTimeout(() => {
      setShowChart(true);
    }, 0);

    return () => {
      animatedValue.removeListener(id);
    };
  };

  useEffect(() => {
    chartAnimation();
  }, [monthOfCurrentInfo, yearOfCurrentInfo]);

  useEffect(() => {
    if (isFocused) {
      const task = InteractionManager.runAfterInteractions(() => {
        scrollRef.current?.scrollToEnd({ animated: false });
        setgraphVisible(true);
      });

      return () => task.cancel();
    }
  }, [isFocused]);

  const COLORS = [
    "#FFFFE5",
    "#F7FCB9",
    "#D9F0A3",
    "#ADDD8E",
    "#78C679",
    "#41AB5D",
  ];

  const TEXT_COLORS = [
    "#329257",
    "#329257",
    "#329257",
    "#FCFFF6",
    "#FCFFF6",
    "#FCFFF6",
  ];
  const [dataByCategory, setDataByCategory] = useState<monthlyDailyExpenses>(
    []
  );
  useEffect(() => {
    const getData = async () => {
      const data = await getMonthlyDailyExpenses(
        yearOfCurrentInfo,
        monthOfCurrentInfo
      );
      console.log(
        `DataByCategory of ${yearOfCurrentInfo}-${monthOfCurrentInfo}!!!@@@!!!`,
        data
      );
      setDataByCategory(data);
    };
    getData();
  }, [monthOfCurrentInfo, yearOfCurrentInfo]);
  const selectedCategryIndex = dataByCategory.findIndex(
    (item) => item.categoryName === categoryType
  );

  const [data, setData] = useState<Monthlyexpenses>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getMonthlyExpenses(
        yearOfCurrentInfo,
        monthOfCurrentInfo
      );
      console.log(
        `data of ${yearOfCurrentInfo}-${monthOfCurrentInfo}!!!`,
        data
      );
      setData(data);
    };
    getData();
  }, [monthOfCurrentInfo, yearOfCurrentInfo]);

  const sortedData = [...data].sort((a, b) => b.amount - a.amount);
  const totalAmount = sortedData.reduce(
    (sum, currentItem) => sum + currentItem.amount,
    0
  );

  console.log("totalAmountttt:", totalAmount);

  const coloredData = sortedData.map((item, index) => {
    return {
      ...item,
      color: COLORS[index],
      textColor: TEXT_COLORS[index],
      percentage: Math.round((item.amount / totalAmount) * 100),
    };
  });

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const paddingLeft = (screenWidth * 0.25).toString();
  const interval = screenHeight * 0.42;
  const monthInfo = parseInt(monthOfCurrentInfo);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    if (scrollY >= screenHeight * 0.3 && !hideDoubleArrowDown) {
      setHideDoubleArrowDown(true);
    } else if (scrollY < screenHeight * 0.3 && hideDoubleArrowDown) {
      setHideDoubleArrowDown(false);
    }
  };

  useEffect(() => {
    if (hideDoubleArrowDown) {
      Animated.timing(hideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(hideAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [hideDoubleArrowDown]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {modalVisible && <View style={styles.overlay} />}
      <Header
        isExpenditure={isExpenditure}
        setIsExpenditure={setIsExpenditure}
        setShowChart={setShowChart}
        chartAnimation={chartAnimation}
      />
      <ScrollView
        onScroll={handleScroll}
        decelerationRate={0.9}
        snapToInterval={interval}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: screenWidth, height: screenHeight * 0.36 }}>
          {showChart && (
            <PieChart
              data={coloredData}
              width={screenWidth}
              height={screenHeight * 0.36}
              chartConfig={chartConfig}
              accessor={"amount"}
              backgroundColor={"transparent"}
              paddingLeft={paddingLeft}
              center={[0, 0]}
              hasLegend={false}
            />
          )}
        </View>
        <View style={styles.chartCenterCircle}>
          <Text style={styles.text1}>{monthInfo}월의</Text>
          <Text style={styles.text2}>{isExpenditure ? "지출" : "소득"}</Text>
        </View>
        <Svg
          width={screenHeight * 0.36}
          height={screenHeight * 0.36}
          style={{
            position: "absolute",
            top: 0,
            backgroundColor: "transparent",
          }}
        >
          <Path ref={pathRef} fill="#FCFFF6" />
        </Svg>
        <PieChartCategory coloredData={coloredData} />
        <BarGraph
          isExpenditure={isExpenditure}
          scrollRef={scrollRef}
          graphVisible={graphVisible}
          monthOfCurrentInfo={monthOfCurrentInfo}
          setMonthOfCurrentInfo={setMonthOfCurrentInfo}
          yearOfCurrentInfo={yearOfCurrentInfo}
          setYearOfCurrentInfo={setYearOfCurrentInfo}
        />

        <Animated.View
          style={{ transform: [{ translateY: floatAnim }], opacity: hideAnim }}
        >
          <DoubleArrowDown
            fill="#6c6c70"
            style={{
              marginTop: screenHeight * 0.023,
              marginBottom: screenHeight * 0.01,
            }}
            height={screenWidth * 0.08}
            width={screenWidth * 0.08}
          />
        </Animated.View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShowDetail(!showDetail);
          }}
        >
          {showDetail ? (
            <View
              style={[styles.viewDetailButton, { backgroundColor: "#75E88C" }]}
            >
              <Text style={[styles.text3, { color: "#FFFFFF" }]}>
                이런 내역이 있었어요!
              </Text>
              <ArrowUp
                fill="#FFFFFF"
                height={screenWidth * 0.06}
                width={screenWidth * 0.06}
              />
            </View>
          ) : (
            <View style={styles.viewDetailButton}>
              <Text style={styles.text3}>내역을 자세히 볼까요?</Text>
              <ArrowDown
                fill="#329257"
                height={screenWidth * 0.06}
                width={screenWidth * 0.06}
              />
            </View>
          )}
        </TouchableOpacity>
        {showDetail ? (
          <>
            {coloredData.map((item) => {
              return (
                <DatailCard
                  setModalVisible={setModalVisible}
                  setCategoryType={setCategoryType}
                  key={item.categoryName}
                  categoryName={item.categoryName}
                  amount={item.amount}
                  percent={item.percentage}
                  color={item.color}
                  textColor={item.textColor}
                />
              );
            })}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalBody}>
                <View style={styles.detailModal}>
                  <Text style={styles.title}>
                    조금 더 들여다보면 이런 배경이 있었어요
                  </Text>
                  <View style={styles.attributeContainer}>
                    <View
                      style={[
                        styles.attribute,
                        { marginRight: screenWidth * 0.05 },
                      ]}
                    >
                      <Text style={styles.attributeText}>날짜</Text>
                    </View>
                    <View style={styles.attribute}>
                      <Text style={styles.attributeText}>지출배경</Text>
                    </View>
                    <View
                      style={[
                        styles.attribute,
                        { marginLeft: screenWidth * 0.05 },
                      ]}
                    >
                      <Text style={styles.attributeText}>금액</Text>
                    </View>
                  </View>
                  <ScrollView
                    style={{
                      marginTop: screenHeight * 0.03,
                      marginBottom: screenHeight * 0.03,
                    }}
                    contentContainerStyle={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    {dataByCategory[selectedCategryIndex].list.map((item) => {
                      return (
                        <View
                          key={`${item.date}-${item.background}-${item.amount}`}
                          style={styles.list}
                        >
                          <Text style={styles.dateText}>
                            {item.date.split("-")[1]}월{" "}
                            {item.date.split("-")[2]}일
                          </Text>
                          <Text style={styles.descriptionText}>
                            {item.background}
                          </Text>
                          <Text style={styles.amountText}>{item.amount}</Text>
                        </View>
                      );
                    })}
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.backButton}
                  >
                    <CurevedBackArrow />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <View style={styles.space} />
        )}
        <View style={[styles.space, { height: screenHeight * 0.12 }]} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFF6",
    justifyContent: "center",
    alignItems: "center",
  },
  centerLine: {
    width: screenWidth * 0.5,
    height: screenHeight,
    borderWidth: 1,
  },
  chartCenterCircle: {
    position: "absolute",
    top: screenHeight * 0.09,
    left: screenWidth * 0.32,
    width: screenWidth * 0.36,
    height: screenWidth * 0.36,
    backgroundColor: "#FCFFF6",
    borderRadius: screenWidth * 0.2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  viewDetailButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.6,
    height: screenHeight * 0.06,
    marginBottom: screenHeight * 0.04,
    backgroundColor: "#FCFFF6",
    borderRadius: screenWidth * 0.07,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // ios 그림자 효과
    elevation: 3, // 안드로이드 그림자 효과
  },
  text1: {
    fontSize: 25,
    fontWeight: "800",
    color: "#329257",
  },
  text2: {
    fontSize: 20,
    fontWeight: "400",
    color: "#329257",
  },
  text3: {
    fontSize: 14,
    fontWeight: "500",
    color: "#329257",
    marginRight: screenWidth * 0.01,
  },
  overlay: {
    position: "absolute",
    zIndex: 10,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  detailModal: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: screenWidth,
    height: screenHeight * 0.85,
    backgroundColor: "#FFFFF1",
    borderTopLeftRadius: screenWidth * 0.1,
    borderTopRightRadius: screenWidth * 0.1,
  },
  title: {
    marginTop: screenHeight * 0.1,
    fontSize: 16,
    fontWeight: 600,
    color: "#329257",
  },
  attributeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.05,
  },
  attribute: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.2,
    height: screenHeight * 0.03,
    borderWidth: 1,
    borderColor: "#329257",
    borderRadius: screenHeight * 0.015,
  },
  attributeText: {
    fontSize: 14,
    fontWeight: 500,
    color: "#329257",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.7,
    height: screenHeight * 0.07,
    borderBottomWidth: 1,
    borderBottomColor: "#329257",
  },
  dateText: {
    position: "absolute",
    left: screenWidth * 0.02,
    fontSize: 15,
    fontWeight: 400,
    color: "#329257",
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: 600,
    color: "#329257",
  },
  amountText: {
    position: "absolute",
    right: screenWidth * 0.02,
    fontSize: 15,
    fontWeight: 500,
    color: "#329257",
  },
  backButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.14,
    height: screenWidth * 0.14,
    borderRadius: screenWidth * 0.07,
    backgroundColor: "#75E88C",
    marginBottom: screenHeight * 0.07,
  },
  space: {
    width: screenWidth,
    height: screenHeight * 0.3,
  },
});
