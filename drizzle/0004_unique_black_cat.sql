CREATE TABLE IF NOT EXISTS "budget" (
	"id" text PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"user_id" text NOT NULL
);
