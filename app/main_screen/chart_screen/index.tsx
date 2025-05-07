import { View, Text, StatusBar, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { PieChart } from "react-native-chart-kit";
import { BottomAppbar } from "@/components/BottomAppbar";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ChartScreen() {
  const router = useRouter();

  const data = [
    {
      name: "월세",
      population: 330000,
      color: "",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "식비",
      population: 300000,
      color: "",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "커피값",
      population: 50000,
      color: "",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "전기세",
      population: 17000,
      color: "",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "술약",
      population: 100000,
      color: "",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "밥약",
      population: 80000,
      color: "",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];

  const COLORS = [
    "#FFFFE5",
    "#F7FCB9",
    "#D9F0A3",
    "#ADDD8E",
    "#78C679",
    "#41AB5D",
  ];

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
      <View style={styles.periodSelection}>

      </View>
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
        height={screenHeight * 0.4}
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
      <View style={styles.listView}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          {coloredData.slice(0, 3).map((item, index) => (
            <View key={index} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View style={{ width: screenWidth * 0.05, height: screenWidth * 0.05, backgroundColor: item.color, borderRadius: screenWidth * 0.025, }} />
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>
      </ View>
      <View style={styles.bottomAppbarContainer}>
        <BottomAppbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFF6",
    alignItems: "center",
  },
  periodSelection: {
    width: screenWidth,
    height: screenHeight * 0.08,
    borderWidth: 1,
  },
  centerLine: {
    width: screenWidth * 0.5,
    height: screenHeight,
    borderWidth: 1,
  },
  chartCenterCircle: {
    position: "absolute",
    top: screenHeight * 0.18,
    left: screenWidth * 0.3,
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    backgroundColor: "#FCFFF6",
    borderRadius: screenWidth * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    fontSize: 30,
    fontWeight: "800",
    color: "#329257",
  },
  text2: {
    fontSize: 20,
    fontWeight: "400",
    color: "#329257",
  },
  listView: {
    borderWidth: 1,
    width: screenWidth,
    height: screenHeight * 0.1,
  },
  bottomAppbarContainer: {
    position: "absolute",
    bottom: screenHeight * 0.07,
    backgroundColor: "transparent",
  },
});