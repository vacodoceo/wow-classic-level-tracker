CREATE TABLE IF NOT EXISTS "character_level_record" (
	"id" serial PRIMARY KEY NOT NULL,
	"character_id" integer,
	"level" text NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"realm" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character_level_record" ADD CONSTRAINT "character_level_record_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
