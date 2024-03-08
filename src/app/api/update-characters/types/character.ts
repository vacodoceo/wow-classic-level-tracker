export type Character = {
  levelerName: string;
  realm: string;
  id: number;
  level: number;
  faction: string;
  race: string;
  class: string;
  name: string;
  completedQuests: number;
  imageURL: string | null;
};

export type LevelRecord = {
  level: number;
  timestamp: string;
};

export type CharacterWithLevelRecords = Character & {
  LevelRecords: LevelRecord[];
  levelingScore: number;
};
