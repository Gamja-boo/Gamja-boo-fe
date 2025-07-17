import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type GamdoringContextType = {
  gamdoring: number;
  setGamdoring: (amount: number) => Promise<void>;
  substractGamdoring: (amount: number) => Promise<void>;
  resetGamdoring: () => Promise<void>;
};

const GamdoringContext = createContext<GamdoringContextType>({
  gamdoring: 0,
  setGamdoring: async () => {},
  substractGamdoring: async () => {},
  resetGamdoring: async () => {},
});

export const GamdoringProvider = ({ children }: { children: React.ReactNode }) => {
  const [gamdoring, setGamdoringState] = useState(0);

  useEffect(() => {
    const loadGamdoring = async () => {
      const saved = await AsyncStorage.getItem("gamdoring");
      if (saved === null) {
        await AsyncStorage.setItem("gamdoring", "100");
        setGamdoringState(100);
      } else {
        setGamdoringState(parseInt(saved, 10));
      }
    };
    loadGamdoring();
  }, []);

  const setGamdoring = async (amount: number) => {
    setGamdoringState(amount);
    await AsyncStorage.setItem("gamdoring", amount.toString());
  };

  const substractGamdoring = async (amount: number) => {
    const newAmount = gamdoring - amount;
    setGamdoringState(newAmount);
    await AsyncStorage.setItem("gamdoring", newAmount.toString());
  };

  const resetGamdoring = async () => {
    setGamdoringState(100);
    await AsyncStorage.removeItem("gamdoring");
  };

  return (
    <GamdoringContext.Provider
      value={{ gamdoring, setGamdoring, substractGamdoring, resetGamdoring }}>
        {children}
      </GamdoringContext.Provider>
  );
};

export const useGamdoring = () => useContext(GamdoringContext);