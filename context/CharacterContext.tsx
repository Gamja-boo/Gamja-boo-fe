import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CharacterState = {
  skin: string | null;
  cloth: string | null;
  accessory: string | null;
};

type ContextType = {
  character: CharacterState;
  setCharacter: (state: CharacterState) => void;
  resetCharacter: () => void;
};

const CharacterContext = createContext<ContextType>({
  character: { skin: null, cloth: null, accessory: null },
  setCharacter: () => {},
  resetCharacter: () => {},
});

export const CharacterProvider = ({ children }: { children: React.ReactNode }) => {
  const [character, setCharacterState] = useState<CharacterState>({
    skin: null,
    cloth: null,
    accessory: null,
  });

  const resetCharacter = async () => {
    const empty: CharacterState = { skin: null, cloth: null, accessory: null };
    setCharacterState(empty);
    await AsyncStorage.removeItem('character');
  };

  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem('character');
      if (saved) {
        setCharacterState(JSON.parse(saved));
      }
    };
    loadData();
  }, []);

  const setCharacter = async (state: CharacterState) => {
    setCharacterState(state);
    await AsyncStorage.setItem('character', JSON.stringify(state));
  };

  return (
    <CharacterContext.Provider value={{ character, setCharacter, resetCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);
