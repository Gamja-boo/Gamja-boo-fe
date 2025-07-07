import { Dimensions } from "react-native";
import Accessory1 from "@/app_assets/character_screen/customizing_screen/choose_accessory/accessory1.svg";
import Accessory2 from "@/app_assets/character_screen/customizing_screen/choose_accessory/accessory2.svg";
import Accessory3 from "@/app_assets/character_screen/customizing_screen/choose_accessory/accessory3.svg";
// import Accessory4 from "@/app_assets/character_screen/customizing_screen/choose_accessory/accessory4.svg";
// import Accessory5 from "@/app_assets/character_screen/customizing_screen/choose_accessory/accessory5.svg";
// import Accessory6 from "@/app_assets/character_screen/customizing_screen/choose_accessory/accessory6.svg";
// import Accessory7 from "@/app_assets/character_screen/customizing_screen/choose_accessory/accessory7.svg";
// import Accessory8 from "@/app_assets/character_screen/customizing_screen/cchoose_accessory/accessory8.svg";
// import Accessory9 from "@/app_assets/character_screen/customizing_screen/choose_accessory/accessory9.svg";
// import Accessory10 from "@/app_assets/character_screen/customizing_screen/choose_accessory/accessory10.svg";
// import Accessory11 from "@/app_assets/character_screen/customizing_screen/choose_accessory/accessory11.svg";
// import Accessory12 from "@/app_assets/character_screen/customizing_screen/choose_accessory/accessory12.svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const accessoryItems = [
  {
    id: "accessory1",
    Component: Accessory1,
    position: { bottom: screenHeight * 0.015, left: screenWidth * 0.055 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: "accessory2",
    Component: Accessory2,
    position: { bottom: screenHeight * 0.015, left: screenWidth * 0.055 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: "accessory3",
    Component: Accessory3,
    position: { bottom: screenHeight * 0.015, left: screenWidth * 0.055 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
]