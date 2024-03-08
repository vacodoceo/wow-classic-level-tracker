export const getCharacterAverageRecentLeveling = (character: {
  levelRecords: {
    level: number;
    timestamp: Date;
  }[];
}): number => {
  const newestRecord = character.levelRecords.slice(-1)[0];
  const threeDaysBeforeOrOldestRecord = character.levelRecords.slice(
    -3 * 24,
  )[0];

  return (
    ((newestRecord.level - threeDaysBeforeOrOldestRecord.level) * 100_000_000) /
    (Date.now() - threeDaysBeforeOrOldestRecord.timestamp.getTime())
  );
};
