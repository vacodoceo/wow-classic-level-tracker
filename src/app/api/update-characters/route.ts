import { db } from "@/db";
import { getToken } from "./get-token";
import { storeCharacters } from "./store-characters";
import { storeCharactersLevelRecord } from "./store-characters-level-record";
import { getUpdatedCharacters } from "./get-updated-characters";

export const dynamic = "force-dynamic";

export async function POST() {
  const token = await getToken();
  const characters = await db.query.characters.findMany();
  const updatedCharacters = await getUpdatedCharacters({ characters, token });

  if (updatedCharacters.length === 0) return new Response();

  const storedRecordsPromise = storeCharactersLevelRecord(updatedCharacters);
  const storedCharactersPromise = storeCharacters(updatedCharacters);

  const [storedRecords, storedCharacters] = await Promise.all([
    storedRecordsPromise,
    storedCharactersPromise,
  ]);

  return new Response(JSON.stringify({ storedRecords, storedCharacters }));
}
