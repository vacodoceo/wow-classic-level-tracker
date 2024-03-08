"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

export const SearchContext = createContext({
  searchValue: "",
  setSearchValue: (value: string) => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}
