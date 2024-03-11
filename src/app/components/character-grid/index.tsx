"use client";

import { CharacterWithLevelRecords } from "@/app/api/update-characters/types/character";
import { useContext, useMemo } from "react";
import { CharacterCard } from "./character-card";
import { SearchContext } from "@/app/context/search-provider";

export const CharacterGrid = ({
  characters,
}: {
  characters: CharacterWithLevelRecords[];
}) => {
  const { searchValue } = useContext(SearchContext);
  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const matchers = [
        character.name.toLowerCase(),
        character.class.toLowerCase(),
      ];

      return matchers
        .map((matcher) => matcher.includes(searchValue.toLowerCase()))
        .some(Boolean);
    });
  }, [characters, searchValue]);

  return (
    <div className="grid grid-cols-1 gap-[12px] p-2 pb-8 sm:gap-4 sm:p-4 md:grid-cols-3 md:gap-6">
      {filteredCharacters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};
