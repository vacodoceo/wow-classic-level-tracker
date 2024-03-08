import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  realm: text("realm").notNull(),
  level: integer("level").notNull(),
  faction: text("faction"),
  race: text("race"),
  class: text("class"),
  completedQuests: integer("completed_quests"),
  imageURL: text("image_url"),
  lastLogin: timestamp("last_login"),
});

export const levelRecords = pgTable("level_records", {
  id: serial("id").primaryKey(),
  characterId: integer("character_id").references(() => characters.id),
  level: integer("level").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const characterRelations = relations(characters, ({ many }) => ({
  levelRecords: many(levelRecords),
}));

export const levelRecordRelations = relations(levelRecords, ({ one }) => ({
  character: one(characters, {
    fields: [levelRecords.characterId],
    references: [characters.id],
  }),
}));
