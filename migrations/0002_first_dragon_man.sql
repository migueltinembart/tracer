ALTER TABLE "contact_groups" DROP CONSTRAINT "contact_groups_comment_id_comments_id_fk";

ALTER TABLE "contacts" DROP CONSTRAINT "contacts_comment_id_comments_id_fk";

ALTER TABLE "site_groups" DROP CONSTRAINT "site_groups_comment_id_comments_id_fk";

ALTER TABLE "sites" DROP CONSTRAINT "sites_comment_id_comments_id_fk";

ALTER TABLE "tenant_groups" DROP CONSTRAINT "tenant_groups_comment_id_comments_id_fk";

ALTER TABLE "tenants" DROP CONSTRAINT "tenants_comment_id_comments_id_fk";

DROP TABLE "comments";
ALTER TABLE "contact_groups" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "contact_groups" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "contacts" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "contacts" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "locations" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "locations" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "site_groups" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "site_groups" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "sites" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "sites" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "tenant_groups" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "tenant_groups" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "tenants" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "tenants" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "contact_groups" DROP COLUMN IF EXISTS "comment_id";
ALTER TABLE "contacts" DROP COLUMN IF EXISTS "comment_id";
ALTER TABLE "site_groups" DROP COLUMN IF EXISTS "comment_id";
ALTER TABLE "sites" DROP COLUMN IF EXISTS "comment_id";
ALTER TABLE "tenant_groups" DROP COLUMN IF EXISTS "comment_id";
ALTER TABLE "tenants" DROP COLUMN IF EXISTS "comment_id";