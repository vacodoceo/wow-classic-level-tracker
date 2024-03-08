import { CharacterGrid } from "@/app/components/character-grid";
import { SearchMenu } from "@/app/components/search-menu";
import SearchProvider from "@/app/context/search-provider";
import { getCharacterAverageRecentLeveling } from "@/helpers/get-character-average-recent-leveling";
import { sortBy } from "lodash-es";
import { CharacterWithLevelRecords } from "./api/update-characters/types/character";
import { db } from "@/db";

export const dynamic = "force-dynamic";

async function getCharacters(): Promise<CharacterWithLevelRecords[]> {
  const characters = await db.query.characters.findMany({
    with: {
      levelRecords: true,
    },
  });

  const filteredCharacters = characters.filter(
    (character) => character.levelRecords.length > 1,
  );

  const characterWithLevelingData = filteredCharacters.map((character) => {
    const levelingScore = getCharacterAverageRecentLeveling(character);

    return {
      ...character,
      LevelRecords: sortBy(character.levelRecords, ["timestamp"]).reverse(),
      levelingScore,
    };
  });

  return sortBy(characterWithLevelingData, [
    "levelingScore",
  ]).reverse() as CharacterWithLevelRecords[];
}

const Home = async () => {
  const characters = await getCharacters();

  return (
    <main className="mx-auto max-w-screen-lg space-y-8">
      <SearchProvider>
        <SearchMenu />
        <CharacterGrid characters={characters} />
      </SearchProvider>
    </main>
  );
};

export default Home;
