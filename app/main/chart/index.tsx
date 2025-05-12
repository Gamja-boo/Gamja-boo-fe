import React, { useRef, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, StatusBar, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { PieChart } from "react-native-chart-kit";
import { monthlyExpensesData } from "@/test_data/main_screen/chart_screen/data";
import { PieChartCategory } from "@/app_components/main_screen/chart_screen/PieChartCategory";
import { Header } from "@/app_components/main_screen/chart_screen/Header";
import { BarGraph } from "@/app_components/main_screen/chart_screen/BarGraph"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ChartScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: false });
      }, 0);
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

  const data = monthlyExpensesData;
  const sortedData = [...data].sort((a, b) => b.population - a.population);
  const coloredData = sortedData.map((item, index) => {
    return {
      ...item,
      color: COLORS[index],
    };
  })

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const paddingLeft = (screenWidth * 0.25).toString();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />
      <ScrollView contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* 화면 가운데 십자선 가이드 라인: x축 */}
        <View
          style={{
            position: "absolute",
            top: screenHeight / 2,
            left: 0,
            width: screenWidth,
            height: 1,
            backgroundColor: "red",
            zIndex: 3,
          }}
        />
        {/* 화면 가운데 십자선 가이드 라인: y축 */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: screenWidth / 2,
            width: 1,
            height: screenHeight,
            backgroundColor: "red",
            zIndex: 3,
          }}
        />

        <PieChart
          data={coloredData}
          width={screenWidth}
          height={screenHeight * 0.36}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={paddingLeft}
          center={[0, 0]}
          hasLegend={false}
        />
        <View style={styles.chartCenterCircle}>
          <Text style={styles.text1}>2월의</Text>
          <Text style={styles.text2}>지출</Text>
        </View>
        <PieChartCategory coloredData={coloredData} />
        <BarGraph scrollRef={scrollRef}/>
        <View style={{ width: screenWidth, height: screenHeight * 0.3 }}>

        </View>
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
});