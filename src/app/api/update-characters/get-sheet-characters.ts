import { GoogleSpreadsheet } from "google-spreadsheet";

export type SheetCharacter = {
  levelerName: string;
  characterName: string;
  realm: string;
};

export const getSheetCharacters = async (): Promise<SheetCharacter[]> => {
  const doc = new GoogleSpreadsheet(
    "1SyaVjUQ_-5Il0UiW8uHoXYulXe8y0zPtt7PGzMLcLuM"
  );

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
    private_key: process.env.GOOGLE_PRIVATE_KEY as string,
  });

  await doc.loadInfo();

  // read rows
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  const characters = rows.map((row) => ({
    levelerName: row["Nombre Nivelador"],
    characterName: row["Nombre Personaje"],
    realm: row["Reino"],
  }));

  const filteredCharacters = characters.filter(
    (character) =>
      character.levelerName && character.characterName && character.realm
  );

  const trimmedCharacters = filteredCharacters.map((character) => ({
    levelerName: character.levelerName.trim(),
    characterName: character.characterName.trim(),
    realm: character.realm.trim(),
  }));

  return trimmedCharacters;
};
