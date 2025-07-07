import { Dimensions } from "react-native";
import Skin1 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin1.svg";
import Skin2 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin2.svg";
import Skin3 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin3.svg";
import Skin4 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin4.svg";
import Skin5 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin5.svg";
import Skin6 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin6.svg";
import Skin7 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin7.svg";
import Skin8 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin8.svg";
import Skin9 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin9.svg";
import Skin10 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin10.svg";
import Skin11 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin11.svg";
import Skin12 from "@/app_assets/character_screen/customizing_screen/choose_skin/skin12.svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const skinItems = [
  {
    id: "skin1",
    Component: Skin1,
    position: { bottom: screenHeight * 0.075, left: screenWidth * 0.145 },
    size: { width: screenWidth * 0.11, height: screenHeight * 0.11 },
  },
  {
    id: "skin2",
    Component: Skin2,
    position: { bottom: screenHeight * 0.075, left: screenWidth * 0.145 },
    size: { width: screenWidth * 0.11, height: screenHeight * 0.11 },
  },
  {
    id: "skin3",
    Component: Skin3,
    position: { bottom: screenHeight * 0.075, left: screenWidth * 0.145 },
    size: { width: screenWidth * 0.11, height: screenHeight * 0.11 },
  },
  {
    id: "skin4",
    Component: Skin4,
    position: { bottom: screenHeight * 0.067, left: screenWidth * 0.145 },
    size: { width: screenWidth * 0.11, height: screenHeight * 0.11 },
  },
  {
    id: "skin5",
    Component: Skin5,
    position: { bottom: screenHeight * 0.075, left: screenWidth * 0.145 },
    size: { width: screenWidth * 0.11, height: screenHeight * 0.11 },
  },
  {
    id: "skin6",
    Component: Skin6,
    position: { bottom: screenHeight * 0.087, left: screenWidth * 0.16 },
    size: { width: screenWidth * 0.08, height: screenHeight * 0.08 },
  },
  {
    id: "skin7",
    Component: Skin7,
    position: { bottom: screenHeight * 0.075, left: screenWidth * 0.145 },
    size: { width: screenWidth * 0.11, height: screenHeight * 0.11 },
  },
  {
    id: "skin8",
    Component: Skin8,
    position: { bottom: screenHeight * 0.075, left: screenWidth * 0.145 },
    size: { width: screenWidth * 0.11, height: screenHeight * 0.11 },
  },
  {
    id: "skin9",
    Component: Skin9,
    position: { bottom: screenHeight * 0.075, left: screenWidth * 0.145 },
    size: { width: screenWidth * 0.11, height: screenHeight * 0.11 },
  },
  {
    id: "skin10",
    Component: Skin10,
    position: { bottom: screenHeight * 0.075, left: screenWidth * 0.145 },
    size: { width: screenWidth * 0.11, height: screenHeight * 0.11 },
  },
  {
    id: "skin11",
    Component: Skin11,
    position: { bottom: screenHeight * 0.075, left: screenWidth * 0.145 },
    size: { width: screenWidth * 0.11, height: screenHeight * 0.11 },
  },
  {
    id: "skin12",
    Component: Skin12,
    position: { bottom: screenHeight * 0.075, left: screenWidth * 0.145 },
    size: { width: screenWidth * 0.11, height: screenHeight * 0.11 },
  },
]