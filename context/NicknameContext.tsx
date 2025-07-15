import React, { useState, createContext, useContext } from "react";

const NicknameContext = createContext({
  nickname: "",
  setNickname: (name: string) => { },
});

export function NicknameProvider({ children }: { children: React.ReactNode }) {
  const [nickname, setNickname] = useState("");

  return (
    <NicknameContext.Provider value={{ nickname, setNickname }}>
      {children}
    </NicknameContext.Provider>
  );
}

export const useNickname = () => useContext(NicknameContext);