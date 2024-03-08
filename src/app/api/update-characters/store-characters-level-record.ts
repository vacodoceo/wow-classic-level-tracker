import { gql } from "@apollo/client";
import { GraphQLClient } from "../../clients/graphql-client";
import { Character } from "./types/character";

export const storeCharactersLevelRecord = async (characters: Character[]) => {
  const graphQLClient = await GraphQLClient.getInstance();

  const levelRecords = characters.map((character) => ({
    characterId: character.id,
    level: character.level,
  }));

  const INSERT_LEVEL_RECORDS = gql`
    mutation InsertLevelRecords($levelRecords: [LevelRecords_insert_input!]!) {
      insert_LevelRecords(objects: $levelRecords) {
        affected_rows
        returning {
          id
          characterId
          level
          timestamp
        }
      }
    }
  `;

  const storedLevelRecord = await graphQLClient.mutate({
    mutation: INSERT_LEVEL_RECORDS,
    variables: { levelRecords },
  });

  return storedLevelRecord;
};
