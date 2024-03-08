ALTER TABLE "level_record" RENAME TO "level_records";--> statement-breakpoint
ALTER TABLE "level_records" DROP CONSTRAINT "level_record_character_id_characters_id_fk";
--> statement-breakpoint
ALTER TABLE "level_records" ALTER COLUMN "timestamp" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "level_records" ALTER COLUMN "timestamp" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "level" integer;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "faction" text;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "race" text;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "class" text;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "completed_quests" integer;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "image_url" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "level_records" ADD CONSTRAINT "level_records_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
