import { CharacterWithLevelRecords } from "@/app/api/update-characters/types/character";

export const getCharacterAverageRecentLeveling = (
  character: CharacterWithLevelRecords
): number => {
  const newestRecord = character.LevelRecords.slice(-1)[0];
  const threeDaysBeforeOrOldestRecord = character.LevelRecords.slice(
    -3 * 24
  )[0];

  return (
    ((newestRecord.level - threeDaysBeforeOrOldestRecord.level) * 100_000_000) /
    (Date.now() - new Date(threeDaysBeforeOrOldestRecord.timestamp).getTime())
  );
};
