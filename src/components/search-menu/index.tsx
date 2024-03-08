"use client";

import { SearchContext } from "@/context/search-provider";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";

export const SearchMenu = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const isBigScreen = useMediaQuery({ query: "(min-width: 512px)" });

  return (
    <div className="w-full px-2 sm:px-4">
      <label className="relative mx-auto flex h-14 w-full max-w-xl overflow-hidden rounded-lg">
        <input
          id="search-input"
          type="text"
          className="w-full bg-[#272a30] px-14 text-gray-300 outline-none transition focus:bg-white focus:text-gray-600"
          placeholder={
            isBigScreen
              ? "Search by character name, leveler name, etc..."
              : "Search..."
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <span className="absolute inset-y-0 left-4 flex items-center">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
        </span>
      </label>
    </div>
  );
};
