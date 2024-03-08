import axios from "axios";
import { formatRealm } from "./format-realm";
import { SheetCharacter } from "./get-sheet-characters";
import { assertPromiseFulfilledResult } from "./helpers/assert-fulfilled-promise";
import { Character } from "./types/character";

const getBlizzardCharacterProfile = async ({
  realmSlug,
  lowerCaseCharacterName,
  token,
}: {
  lowerCaseCharacterName: string;
  realmSlug: string;
  token: string;
}) => {
  const url = `https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${lowerCaseCharacterName}?namespace=profile-us&locale=en_US&access_token=${token}`;
  const response = await axios.get(url);
  const profile = response.data;

  return profile;
};

const getBlizzardCharacterQuests = async ({
  realmSlug,
  lowerCaseCharacterName,
  token,
}: {
  lowerCaseCharacterName: string;
  realmSlug: string;
  token: string;
}) => {
  const url = `https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${lowerCaseCharacterName}/quests/completed?namespace=profile-us&locale=en_US&access_token=${token}`;
  const response = await axios.get(url);
  const body = await response.data;

  return body.quests;
};

const getBlizzardCharacterMedia = async ({
  realmSlug,
  lowerCaseCharacterName,
  token,
}: {
  lowerCaseCharacterName: string;
  realmSlug: string;
  token: string;
}) => {
  try {
    const url = `https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${lowerCaseCharacterName}/character-media?namespace=profile-us&locale=en_US&access_token=${token}`;
    const response = await axios.get(url);
    const body = response.data;
    const media = Object.fromEntries(
      body.assets.map((asset: any) => [asset.key, asset.value])
    );

    return media;
  } catch (error) {
    return undefined;
  }
};

const getCharacter = async ({
  sheetCharacter,
  token,
}: {
  sheetCharacter: SheetCharacter;
  token: string;
}): Promise<Character> => {
  const lowerCaseCharacterName = sheetCharacter.characterName.toLowerCase();
  const realmSlug = formatRealm(sheetCharacter.realm);
  const [profile, quests, media] = await Promise.all([
    getBlizzardCharacterProfile({ lowerCaseCharacterName, realmSlug, token }),
    getBlizzardCharacterQuests({ lowerCaseCharacterName, realmSlug, token }),
    getBlizzardCharacterMedia({ lowerCaseCharacterName, realmSlug, token }),
  ]);

  return {
    levelerName: sheetCharacter.levelerName,
    realm: sheetCharacter.realm,
    id: profile.id,
    level: profile.level,
    faction: profile.faction.name,
    race: profile.race.name,
    class: profile.character_class.name,
    name: profile.name,
    completedQuests: quests.length,
    imageURL: media?.main,
  };
};

export const getCharacters = async ({
  sheetCharacters,
  token,
}: {
  sheetCharacters: SheetCharacter[];
  token: string;
}): Promise<Character[]> => {
  const settledCharacterPromises = await Promise.allSettled(
    sheetCharacters.map((sheetCharacter) =>
      getCharacter({ sheetCharacter, token })
    )
  );

  const fulfilledCharacterPromises = settledCharacterPromises.filter(
    assertPromiseFulfilledResult
  );

  const characters = fulfilledCharacterPromises.map(
    (characterPromise) => characterPromise.value
  );

  return characters;
};
