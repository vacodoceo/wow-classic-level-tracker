import { Character } from "./types/character";
import { db } from "@/db";
import { characters as charactersSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

export const storeCharacters = async (characters: Character[]) => {
  const storedCharacters = await Promise.all(
    characters.map(async (character) =>
      db
        .update(charactersSchema)
        .set(character)
        .where(eq(charactersSchema.id, character.id)),
    ),
  );

  return storedCharacters;
};
