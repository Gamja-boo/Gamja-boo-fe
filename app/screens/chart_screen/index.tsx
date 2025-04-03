import { View, Text, StatusBar, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { PieChart } from "react-native-chart-kit";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  const data = [
    {
      name: "월세",
      population: 50,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "식비",
      population: 0,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "커피값",
      population: 50,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "전기세",
      population: 0,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "술약",
      population: 50,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];

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
          data={data}
          width={screenWidth}
          height={screenWidth * 0.8}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={paddingLeft}
          center={[0, 0]}
          hasLegend={false}
      />
      <View style={styles.listView}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  periodSelection: {
    height: screenHeight * 0.08,
    width: screenWidth,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FCFFF6",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  centerLine: {
    width: screenWidth * 0.5,
    height: screenHeight,
    borderWidth: 1,
  },
  listView: {
    borderWidth: 1,
    height: screenHeight * 0.5,
    width: screenWidth,
  }
});