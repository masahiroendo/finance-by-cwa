CREATE TABLE IF NOT EXISTS "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"plaid_id" text,
	"user_id" text NOT NULL
);
