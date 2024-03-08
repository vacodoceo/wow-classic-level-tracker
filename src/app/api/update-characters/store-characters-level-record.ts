import { db } from "@/db";
import { Character } from "./types/character";
import { levelRecords as levelRecordsSchema } from "@/db/schema";

export const storeCharactersLevelRecord = async (characters: Character[]) => {
  const levelRecords = characters.map((character) => ({
    characterId: character.id,
    level: character.level,
  }));

  const storedLevelRecord = await db
    .insert(levelRecordsSchema)
    .values(levelRecords);

  return storedLevelRecord;
};
