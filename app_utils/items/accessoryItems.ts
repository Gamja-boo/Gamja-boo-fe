import { Dimensions } from 'react-native';
import Accessory1 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory1.svg';
import Accessory2 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory2.svg';
import Accessory3 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory3.svg';
import Accessory4 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory4.svg';
import Accessory5 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory5.svg';
import Accessory6 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory6.svg';
import Accessory7 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory7.svg';
import Accessory8 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory8.svg';
import Accessory9 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory9.svg';
import Accessory10 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory10.svg';
import Accessory11 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory11.svg';
import Accessory12 from '@/app_assets/character_screen/customizing_screen/choose_accessory/accessory12.svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const accessoryItems = [
  {
    id: 'accessory1',
    Component: Accessory1,
    position: { bottom: screenHeight * 0.008, left: screenWidth * 0.055 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'accessory2',
    Component: Accessory2,
    position: { bottom: -screenHeight * 0.01, left: screenWidth * 0.07 },
    size: { width: screenWidth * 0.25, height: screenHeight * 0.25 },
  },
  {
    id: 'accessory3',
    Component: Accessory3,
    position: { bottom: screenHeight * 0.065, left: screenWidth * 0.085 },
    size: { width: screenWidth * 0.25, height: screenHeight * 0.25 },
  },
  {
    id: 'accessory4',
    Component: Accessory4,
    position: { bottom: -screenHeight * 0.035, left: screenWidth * 0.05 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'accessory5',
    Component: Accessory5,
    position: { bottom: -screenHeight * 0.03, left: screenWidth * 0.05 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'accessory6',
    Component: Accessory6,
    position: { bottom: screenHeight * 0.045, left: screenWidth * 0.055 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'accessory7',
    Component: Accessory7,
    position: { bottom: screenHeight * 0.01, left: screenWidth * 0.075 },
    size: { width: screenWidth * 0.25, height: screenHeight * 0.25 },
  },
  {
    id: 'accessory8',
    Component: Accessory8,
    position: { bottom: screenHeight * 0.01, left: screenWidth * 0.075 },
    size: { width: screenWidth * 0.25, height: screenHeight * 0.25 },
  },
  {
    id: 'accessory9',
    Component: Accessory9,
    position: { bottom: screenHeight * 0.05, left: screenWidth * 0.085 },
    size: { width: screenWidth * 0.25, height: screenHeight * 0.25 },
  },
  {
    id: 'accessory10',
    Component: Accessory10,
    position: { bottom: -screenHeight * 0.012, left: screenWidth * 0.07 },
    size: { width: screenWidth * 0.25, height: screenHeight * 0.25 },
  },
  {
    id: 'accessory11',
    Component: Accessory11,
    position: { bottom: screenHeight * 0.01, left: screenWidth * 0.17 },
    size: { width: screenWidth * 0.2, height: screenHeight * 0.2 },
  },
  {
    id: 'accessory12',
    Component: Accessory12,
    position: { bottom: screenHeight * 0.045, left: screenWidth * 0.085 },
    size: { width: screenWidth * 0.25, height: screenHeight * 0.25 },
  },
];
