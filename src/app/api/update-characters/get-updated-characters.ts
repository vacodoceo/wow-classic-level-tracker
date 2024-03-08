import axios from "axios";
import { formatRealm } from "./format-realm";
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
  const url = `https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${lowerCaseCharacterName}?namespace=profile-classic-us&locale=en_US&access_token=${token}`;
  const response = await axios.get(url);
  const profile = response.data;

  return profile;
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
    const url = `https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${lowerCaseCharacterName}/character-media?namespace=profile-classic-us&locale=en_US&access_token=${token}`;
    const response = await axios.get(url);
    const body = response.data;

    const media = Object.fromEntries(
      body.assets.map((asset: any) => [asset.key, asset.value]),
    );

    return media;
  } catch (error) {
    return undefined;
  }
};

const getCharacter = async ({
  character,
  token,
}: {
  character: { id: number; name: string; realm: string };
  token: string;
}): Promise<Character> => {
  const lowerCaseCharacterName = character.name.toLowerCase();
  const realmSlug = formatRealm(character.realm);

  const [profile, media] = await Promise.all([
    getBlizzardCharacterProfile({ lowerCaseCharacterName, realmSlug, token }),
    getBlizzardCharacterMedia({ lowerCaseCharacterName, realmSlug, token }),
  ]);

  return {
    realm: character.realm,
    id: character.id,
    level: profile.level,
    faction: profile.faction.name,
    race: profile.race.name,
    class: profile.character_class.name,
    name: profile.name,
    completedQuests: 0,
    imageURL: media?.avatar,
    lastLogin: new Date(profile.last_login_timestamp),
  };
};

export const getUpdatedCharacters = async ({
  characters,
  token,
}: {
  characters: { id: number; name: string; realm: string }[];
  token: string;
}): Promise<Character[]> => {
  const settledCharacterPromises = await Promise.allSettled(
    characters.map((character) => getCharacter({ character, token })),
  );

  settledCharacterPromises
    .filter((promise) => promise.status === "rejected")
    .forEach((promise) => {
      console.error((promise as PromiseRejectedResult).reason);
    });

  const fulfilledCharacterPromises = settledCharacterPromises.filter(
    assertPromiseFulfilledResult,
  );

  const updatedCharacters = fulfilledCharacterPromises.map(
    (characterPromise) => characterPromise.value,
  );

  return updatedCharacters;
};
