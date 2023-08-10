DO $$ BEGIN
 CREATE TYPE "status_enum" AS ENUM('active', 'planned', 'staging', 'retired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "comments" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT comments_id PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "contact_groups" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"comment_id" uuid,
	CONSTRAINT contact_groups_id PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "contacts" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"group" uuid,
	"title" text,
	"phone" text,
	"email" text,
	"address" text,
	"comment_id" uuid,
	CONSTRAINT contacts_id PRIMARY KEY("id"),
	CONSTRAINT "contacts_email_unique" UNIQUE("email")
);

CREATE TABLE IF NOT EXISTS "locations" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"site_id" uuid NOT NULL,
	"status" "status_enum" DEFAULT 'active' NOT NULL,
	CONSTRAINT locations_id PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "site_groups" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"comment_id" uuid,
	CONSTRAINT site_groups_id PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "sites" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"status" "status_enum" NOT NULL,
	"comment_id" uuid,
	CONSTRAINT sites_id PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "tenant_groups" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"comment_id" uuid,
	CONSTRAINT tenant_groups_id PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "tenants" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"tenant_group_id" uuid,
	"comment_id" uuid,
	CONSTRAINT tenants_id PRIMARY KEY("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "contacts_id_index" ON "contacts" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "sites_id_index" ON "sites" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "tenants_id_index" ON "tenants" ("id");
DO $$ BEGIN
 ALTER TABLE "contact_groups" ADD CONSTRAINT "contact_groups_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "contacts" ADD CONSTRAINT "contacts_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations" ADD CONSTRAINT "locations_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_groups" ADD CONSTRAINT "site_groups_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sites" ADD CONSTRAINT "sites_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tenant_groups" ADD CONSTRAINT "tenant_groups_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tenants" ADD CONSTRAINT "tenants_tenant_group_id_tenant_groups_id_fk" FOREIGN KEY ("tenant_group_id") REFERENCES "tenant_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tenants" ADD CONSTRAINT "tenants_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
