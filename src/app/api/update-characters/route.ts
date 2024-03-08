import { getCharacters } from "./get-characters";
import { getSheetCharacters } from "./get-sheet-characters";
import { getToken } from "./get-token";
import { storeCharacters } from "./store-characters";
import { storeCharactersLevelRecord } from "./store-characters-level-record";

export async function POST() {
  const token = await getToken();
  const sheetCharacters = await getSheetCharacters();
  const characters = await getCharacters({ sheetCharacters, token });

  const storedRecordsPromise = storeCharactersLevelRecord(characters);
  const storedCharactersPromise = storeCharacters(characters);

  const [storedRecords, storedCharacters] = await Promise.all([
    storedRecordsPromise,
    storedCharactersPromise,
  ]);

  return new Response(JSON.stringify({ storedRecords, storedCharacters }));
}
