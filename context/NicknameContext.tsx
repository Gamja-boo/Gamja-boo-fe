import React, { useState, createContext, useContext, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const NicknameContext = createContext({
  nickname: '',
  setNickname: (name: string) => {},
});

export function NicknameProvider({ children }: { children: React.ReactNode }) {
  const [nickname, setNicknameState] = useState("");

  useEffect(() => {
    const loadNickname = async () => {
      const storedName = await AsyncStorage.getItem("nickname");
      if (storedName) {
        setNicknameState(storedName);
      }
    };
    loadNickname();
  }, []);

  const setNickname = async (name: string) => {
    setNicknameState(name);
    await AsyncStorage.setItem("nickname", name);
  };

  return (
    <NicknameContext.Provider value={{ nickname, setNickname }}>
      {children}
    </NicknameContext.Provider>
  );
}

export const useNickname = () => useContext(NicknameContext);
