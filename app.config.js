import 'dotenv/config';

export default {
  expo: {
    name: 'GamJa-boo',
    slug: 'gamja-boo',
    version: '1.0.0',
    owner: 'byunggillee',
    icon: './assets/gamjaMainCharacter.png',
    splash: {
      image: './assets/gamjaMainCharacter.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    android: {
      package: 'com.pnu_apptive.gamjaboo',
    },
    ios: {
      bundleIdentifier: 'com.pnu_apptive.gamjaboo',
    },
    extra: {
      env: process.env.ENV,
      apiBaseUrl: process.env.API_BASE_URL,
      eas: {
        projectId: '8c9e3900-f24f-4f52-ae3a-e8f8e8c4ea90',
      },
    },
  },
};
