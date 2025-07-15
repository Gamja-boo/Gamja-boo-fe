import { Dimensions } from 'react-native';
import Cloth1 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth1.svg';
import Cloth2 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth2.svg';
import Cloth3 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth3.svg';
import Cloth4 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth4.svg';
import Cloth5 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth5.svg';
import Cloth6 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth6.svg';
import Cloth7 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth7.svg';
import Cloth8 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth8.svg';
import Cloth9 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth9.svg';
import Cloth10 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth10.svg';
import Cloth11 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth11.svg';
import Cloth12 from '@/app_assets/character_screen/customizing_screen/choose_cloth/cloth12.svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const clothItems = [
  {
    id: 'cloth1',
    Component: Cloth1,
    position: { bottom: screenHeight * 0.015, left: screenWidth * 0.055 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'cloth2',
    Component: Cloth2,
    position: { bottom: screenHeight * 0.015, left: screenWidth * 0.055 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'cloth3',
    Component: Cloth3,
    position: { bottom: screenHeight * 0.015, left: screenWidth * 0.055 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'cloth4',
    Component: Cloth4,
    position: { bottom: screenHeight * 0.015, left: screenWidth * 0.055 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'cloth5',
    Component: Cloth5,
    position: { bottom: screenHeight * 0.015, left: screenWidth * 0.055 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'cloth6',
    Component: Cloth6,
    position: { bottom: screenHeight * 0.015, left: screenWidth * 0.055 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'cloth7',
    Component: Cloth7,
    position: { bottom: -screenHeight * 0.08 },
    size: { width: screenWidth * 0.42, height: screenHeight * 0.42 },
  },
  {
    id: 'cloth8',
    Component: Cloth8,
    position: { bottom: -screenHeight * 0.07 },
    size: { width: screenWidth * 0.4, height: screenHeight * 0.4 },
  },
  {
    id: 'cloth9',
    Component: Cloth9,
    position: { bottom: -screenHeight * 0.07, left: screenWidth * 0.045 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'cloth10',
    Component: Cloth10,
    position: { bottom: -screenHeight * 0.06, left: screenWidth * 0.045 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'cloth11',
    Component: Cloth11,
    position: { bottom: -screenHeight * 0.065, left: screenWidth * 0.045 },
    size: { width: screenWidth * 0.3, height: screenHeight * 0.3 },
  },
  {
    id: 'cloth12',
    Component: Cloth12,
    position: { bottom: -screenHeight * 0.13 },
    size: { width: screenWidth * 0.4, height: screenHeight * 0.4 },
  },
];
