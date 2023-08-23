CREATE TABLE IF NOT EXISTS "device_types" (
	"id" serial NOT NULL,
	"name" text NOT NULL,
	"template" json,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT device_types_id PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "devices" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"site_id" integer NOT NULL,
	"rack_id" uuid,
	"comment" text,
	"qr_code_id" uuid,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT devices_id PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "interfaces" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"label" text,
	"device_id" uuid NOT NULL,
	"bridge_id" uuid,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT interfaces_id PRIMARY KEY("id"),
	CONSTRAINT "interfaces_bridge_id_unique" UNIQUE("bridge_id")
);

CREATE TABLE IF NOT EXISTS "qr_codes" (
	"id" serial NOT NULL,
	"device_id" uuid,
	"value" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT qr_codes_id PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "racks" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"units" numeric NOT NULL,
	"comment" text,
	"site_id" integer NOT NULL,
	"tenant_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT racks_id PRIMARY KEY("id")
);

ALTER TABLE "contacts" DROP CONSTRAINT "contacts_contact_group_id_contact_groups_id_fk";

ALTER TABLE "sites" DROP CONSTRAINT "sites_site_group_id_site_groups_id_fk";

ALTER TABLE "tenants" DROP CONSTRAINT "tenants_tenant_group_id_tenant_groups_id_fk";

CREATE UNIQUE INDEX IF NOT EXISTS "device_types_id_index" ON "device_types" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "device_types_name_index" ON "device_types" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "devices_name_index" ON "devices" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "qr_codes_id_index" ON "qr_codes" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "racks_name_index" ON "racks" ("name");
DO $$ BEGIN
 ALTER TABLE "contacts" ADD CONSTRAINT "contacts_contact_group_id_contact_groups_id_fk" FOREIGN KEY ("contact_group_id") REFERENCES "contact_groups"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sites" ADD CONSTRAINT "sites_site_group_id_site_groups_id_fk" FOREIGN KEY ("site_group_id") REFERENCES "site_groups"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tenants" ADD CONSTRAINT "tenants_tenant_group_id_tenant_groups_id_fk" FOREIGN KEY ("tenant_group_id") REFERENCES "tenant_groups"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "devices" ADD CONSTRAINT "devices_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "devices" ADD CONSTRAINT "devices_rack_id_racks_id_fk" FOREIGN KEY ("rack_id") REFERENCES "racks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "interfaces" ADD CONSTRAINT "interfaces_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "interfaces" ADD CONSTRAINT "interfaces_bridge_id_interfaces_id_fk" FOREIGN KEY ("bridge_id") REFERENCES "interfaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "racks" ADD CONSTRAINT "racks_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "racks" ADD CONSTRAINT "racks_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
