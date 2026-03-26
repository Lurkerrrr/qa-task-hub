CREATE TABLE "bugs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"priority" varchar(50) NOT NULL,
	"severity" varchar(50) NOT NULL,
	"status" varchar(50) DEFAULT 'Open',
	"assignee" varchar(255),
	"steps" text,
	"date" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
