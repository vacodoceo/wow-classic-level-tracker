import { gql } from "@apollo/client";
import { GraphQLClient } from "../../clients/graphql-client";
import { Character } from "./types/character";

export const storeCharacters = async (characters: Character[]) => {
  const graphQLClient = await GraphQLClient.getInstance();

  const UPSERT_CHARACTERS = gql`
    mutation InsertLevelRecords($characters: [Characters_insert_input!]!) {
      insert_Characters(
        objects: $characters
        on_conflict: {
          constraint: Characters_pkey
          update_columns: [
            class
            completedQuests
            faction
            imageURL
            level
            levelerName
            name
            race
            realm
          ]
        }
      ) {
        affected_rows
        returning {
          id
          class
          completedQuests
          faction
          imageURL
          level
          levelerName
          name
          race
          realm
        }
      }
    }
  `;

  const storedCharacters = await graphQLClient.mutate({
    mutation: UPSERT_CHARACTERS,
    variables: { characters },
  });

  return storedCharacters;
};
