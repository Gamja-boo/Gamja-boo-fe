import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Skin from '@/app_assets/character_screen/customizing_screen/skin1.svg';
import { useGamdoring } from '@/context/GamdoringContext';

const { width: screenWidth } = Dimensions.get('window');

export function Gamdoring() {
  const { gamdoring } = useGamdoring();

  return (
    <View style={styles.container}>
      <Skin />
      <Text style={styles.text}>{gamdoring}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: screenWidth * 0.035,
  },
  text: {
    color: '#ADD69F',
    fontWeight: 'bold',
    fontSize: screenWidth * 0.047,
  },
});
