ALTER TABLE "character_level_record" RENAME TO "level_record";--> statement-breakpoint
ALTER TABLE "level_record" DROP CONSTRAINT "character_level_record_character_id_characters_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "level_record" ADD CONSTRAINT "level_record_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
