import { CharacterGrid } from "@/components/character-grid";
import { SearchMenu } from "@/components/search-menu";
import SearchProvider from "@/context/search-provider";
import { getCharacterAverageRecentLeveling } from "@/helpers/get-character-average-recent-leveling";
import { gql } from "@apollo/client";
import { sortBy } from "lodash-es";
import { GraphQLClient } from "./clients/graphql-client";
import { CharacterWithLevelRecords } from "./api/update-characters/types/character";

export const revalidate = 0;

async function getCharacters(): Promise<CharacterWithLevelRecords[]> {
  const graphQLClient = await GraphQLClient.getInstance();

  const CHARACTERS = gql`
    query GetCharacters {
      Characters {
        LevelRecords {
          timestamp
          level
        }
        class
        completedQuests
        faction
        id
        imageURL
        level
        levelerName
        name
        race
        realm
      }
    }
  `;

  const { data } = await graphQLClient.query({ query: CHARACTERS });

  const { Characters: characters } = data;

  const characterWithLevelingData = characters.map(
    (character: CharacterWithLevelRecords) => {
      const levelingScore = getCharacterAverageRecentLeveling(character);

      return {
        ...character,
        LevelRecords: sortBy(character.LevelRecords, ["timestamp"]).reverse(),
        levelingScore,
      };
    }
  );

  return sortBy(characterWithLevelingData, ["levelingScore"]).reverse();
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
