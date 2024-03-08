export type Character = {
  id: number;
  realm: string;
  level: number;
  faction: string;
  race: string;
  class: string;
  name: string;
  completedQuests: number;
  imageURL: string | null;
  lastLogin: Date;
};

export type LevelRecord = {
  level: number;
  timestamp: Date;
};

export type CharacterWithLevelRecords = Character & {
  levelRecords: LevelRecord[];
  levelingScore: number;
};
