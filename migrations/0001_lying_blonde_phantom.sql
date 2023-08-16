ALTER TABLE "sites" ADD COLUMN "site_group_id" uuid;
DO $$ BEGIN
 ALTER TABLE "sites" ADD CONSTRAINT "sites_site_group_id_site_groups_id_fk" FOREIGN KEY ("site_group_id") REFERENCES "site_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
