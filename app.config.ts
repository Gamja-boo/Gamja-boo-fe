import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

const config = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'GamJa-boo',
  slug: 'gamja-boo',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  icon: './assets/gamjaMainCharacter.png',
  splash: {
    image: './assets/gamjaMainCharacter.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.pnu_apptive.gamjaboo',
  },
  android: {
    package: 'com.pnu_apptive.gamjaboo',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          compileSdkVersion: 33,
          targetSdkVersion: 33,
          kotlinVersion: '1.8.10',
        },
        ios: {
          deploymentTarget: '13.0',
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
    router: {
      origin: false,
    },
    eas: {
      projectId: '8c9e3900-f24f-4f52-ae3a-e8f8e8c4ea90',
    },
  },
});

export default config;
