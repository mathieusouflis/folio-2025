import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'fr');
  CREATE TYPE "public"."enum_projects_project_contents_image_groups_images_ratio" AS ENUM('4-3', '16-10', '16-9', '21-9', '5-1');
  CREATE TYPE "public"."enum_projects_project_contents_image_groups_display" AS ENUM('columns', 'rows', 'grid');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_4_3_url" varchar,
  	"sizes_4_3_width" numeric,
  	"sizes_4_3_height" numeric,
  	"sizes_4_3_mime_type" varchar,
  	"sizes_4_3_filesize" numeric,
  	"sizes_4_3_filename" varchar,
  	"sizes_16_10_url" varchar,
  	"sizes_16_10_width" numeric,
  	"sizes_16_10_height" numeric,
  	"sizes_16_10_mime_type" varchar,
  	"sizes_16_10_filesize" numeric,
  	"sizes_16_10_filename" varchar,
  	"sizes_16_9_url" varchar,
  	"sizes_16_9_width" numeric,
  	"sizes_16_9_height" numeric,
  	"sizes_16_9_mime_type" varchar,
  	"sizes_16_9_filesize" numeric,
  	"sizes_16_9_filename" varchar,
  	"sizes_21_09_url" varchar,
  	"sizes_21_09_width" numeric,
  	"sizes_21_09_height" numeric,
  	"sizes_21_09_mime_type" varchar,
  	"sizes_21_09_filesize" numeric,
  	"sizes_21_09_filename" varchar,
  	"sizes_5_1_url" varchar,
  	"sizes_5_1_width" numeric,
  	"sizes_5_1_height" numeric,
  	"sizes_5_1_mime_type" varchar,
  	"sizes_5_1_filesize" numeric,
  	"sizes_5_1_filename" varchar
  );
  
  CREATE TABLE "collaborators" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"display_name" varchar,
  	"folio_owner" boolean,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_collaborators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"collaborator_id" integer
  );
  
  CREATE TABLE "projects_project_contents_image_groups_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"ratio" "enum_projects_project_contents_image_groups_images_ratio" DEFAULT '4-3' NOT NULL
  );
  
  CREATE TABLE "projects_project_contents_image_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"display" "enum_projects_project_contents_image_groups_display" DEFAULT 'columns' NOT NULL
  );
  
  CREATE TABLE "projects_project_contents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"description" jsonb
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"archive" boolean DEFAULT false NOT NULL,
  	"cover_id" integer NOT NULL,
  	"project_url" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"client_name" varchar,
  	"client_url" varchar,
  	"project_type_id" integer,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"roles_id" integer
  );
  
  CREATE TABLE "roles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "project_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "skills" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "skills_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "activities_blocks_medias_page_medias" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"folder" varchar
  );
  
  CREATE TABLE "activities_blocks_medias_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "activities_blocks_music_page_showcase_playlists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"playlist_url" varchar NOT NULL
  );
  
  CREATE TABLE "activities_blocks_music_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"approx_minutes_per_year" numeric NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "activities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "activities_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"collaborators_id" integer,
  	"projects_id" integer,
  	"roles_id" integer,
  	"project_types_id" integer,
  	"skills_id" integer,
  	"activities_id" integer,
  	"payload_kv_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "about_page_header_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_other_experiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_other_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"major" varchar NOT NULL,
  	"school" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "about_page_other_awwards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer NOT NULL,
  	"awwarder" varchar NOT NULL,
  	"mention" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"loader_first_name" varchar NOT NULL,
  	"loader_last_name" varchar NOT NULL,
  	"header_side_photo_id" integer NOT NULL,
  	"header_title" varchar NOT NULL,
  	"header_location" varchar NOT NULL,
  	"header_description" varchar NOT NULL,
  	"header_resumee_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"activities_id" integer,
  	"skills_id" integer
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_collaborators" ADD CONSTRAINT "projects_collaborators_collaborator_id_collaborators_id_fk" FOREIGN KEY ("collaborator_id") REFERENCES "public"."collaborators"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_collaborators" ADD CONSTRAINT "projects_collaborators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_project_contents_image_groups_images" ADD CONSTRAINT "projects_project_contents_image_groups_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_project_contents_image_groups_images" ADD CONSTRAINT "projects_project_contents_image_groups_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_project_contents_image_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_project_contents_image_groups" ADD CONSTRAINT "projects_project_contents_image_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_project_contents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_project_contents" ADD CONSTRAINT "projects_project_contents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_project_type_id_project_types_id_fk" FOREIGN KEY ("project_type_id") REFERENCES "public"."project_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_blocks_medias_page_medias" ADD CONSTRAINT "activities_blocks_medias_page_medias_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities_blocks_medias_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_blocks_medias_page" ADD CONSTRAINT "activities_blocks_medias_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_blocks_music_page_showcase_playlists" ADD CONSTRAINT "activities_blocks_music_page_showcase_playlists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities_blocks_music_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_blocks_music_page" ADD CONSTRAINT "activities_blocks_music_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities" ADD CONSTRAINT "activities_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_rels" ADD CONSTRAINT "activities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_rels" ADD CONSTRAINT "activities_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_collaborators_fk" FOREIGN KEY ("collaborators_id") REFERENCES "public"."collaborators"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_types_fk" FOREIGN KEY ("project_types_id") REFERENCES "public"."project_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_kv_fk" FOREIGN KEY ("payload_kv_id") REFERENCES "public"."payload_kv"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_header_socials" ADD CONSTRAINT "about_page_header_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_other_experiences" ADD CONSTRAINT "about_page_other_experiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_other_education" ADD CONSTRAINT "about_page_other_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_other_awwards" ADD CONSTRAINT "about_page_other_awwards_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_other_awwards" ADD CONSTRAINT "about_page_other_awwards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_header_side_photo_id_media_id_fk" FOREIGN KEY ("header_side_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_header_resumee_id_media_id_fk" FOREIGN KEY ("header_resumee_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_4_3_sizes_4_3_filename_idx" ON "media" USING btree ("sizes_4_3_filename");
  CREATE INDEX "media_sizes_16_10_sizes_16_10_filename_idx" ON "media" USING btree ("sizes_16_10_filename");
  CREATE INDEX "media_sizes_16_9_sizes_16_9_filename_idx" ON "media" USING btree ("sizes_16_9_filename");
  CREATE INDEX "media_sizes_21_09_sizes_21_09_filename_idx" ON "media" USING btree ("sizes_21_09_filename");
  CREATE INDEX "media_sizes_5_1_sizes_5_1_filename_idx" ON "media" USING btree ("sizes_5_1_filename");
  CREATE INDEX "collaborators_avatar_idx" ON "collaborators" USING btree ("avatar_id");
  CREATE INDEX "collaborators_updated_at_idx" ON "collaborators" USING btree ("updated_at");
  CREATE INDEX "collaborators_created_at_idx" ON "collaborators" USING btree ("created_at");
  CREATE INDEX "projects_collaborators_order_idx" ON "projects_collaborators" USING btree ("_order");
  CREATE INDEX "projects_collaborators_parent_id_idx" ON "projects_collaborators" USING btree ("_parent_id");
  CREATE INDEX "projects_collaborators_collaborator_idx" ON "projects_collaborators" USING btree ("collaborator_id");
  CREATE INDEX "projects_project_contents_image_groups_images_order_idx" ON "projects_project_contents_image_groups_images" USING btree ("_order");
  CREATE INDEX "projects_project_contents_image_groups_images_parent_id_idx" ON "projects_project_contents_image_groups_images" USING btree ("_parent_id");
  CREATE INDEX "projects_project_contents_image_groups_images_image_idx" ON "projects_project_contents_image_groups_images" USING btree ("image_id");
  CREATE INDEX "projects_project_contents_image_groups_order_idx" ON "projects_project_contents_image_groups" USING btree ("_order");
  CREATE INDEX "projects_project_contents_image_groups_parent_id_idx" ON "projects_project_contents_image_groups" USING btree ("_parent_id");
  CREATE INDEX "projects_project_contents_order_idx" ON "projects_project_contents" USING btree ("_order");
  CREATE INDEX "projects_project_contents_parent_id_idx" ON "projects_project_contents" USING btree ("_parent_id");
  CREATE INDEX "projects_cover_idx" ON "projects" USING btree ("cover_id");
  CREATE INDEX "projects_project_type_idx" ON "projects" USING btree ("project_type_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_skills_id_idx" ON "projects_rels" USING btree ("skills_id");
  CREATE INDEX "projects_rels_roles_id_idx" ON "projects_rels" USING btree ("roles_id");
  CREATE INDEX "roles_updated_at_idx" ON "roles" USING btree ("updated_at");
  CREATE INDEX "roles_created_at_idx" ON "roles" USING btree ("created_at");
  CREATE INDEX "project_types_updated_at_idx" ON "project_types" USING btree ("updated_at");
  CREATE INDEX "project_types_created_at_idx" ON "project_types" USING btree ("created_at");
  CREATE INDEX "skills_updated_at_idx" ON "skills" USING btree ("updated_at");
  CREATE INDEX "skills_created_at_idx" ON "skills" USING btree ("created_at");
  CREATE INDEX "skills_rels_order_idx" ON "skills_rels" USING btree ("order");
  CREATE INDEX "skills_rels_parent_idx" ON "skills_rels" USING btree ("parent_id");
  CREATE INDEX "skills_rels_path_idx" ON "skills_rels" USING btree ("path");
  CREATE INDEX "skills_rels_media_id_idx" ON "skills_rels" USING btree ("media_id");
  CREATE INDEX "activities_blocks_medias_page_medias_order_idx" ON "activities_blocks_medias_page_medias" USING btree ("_order");
  CREATE INDEX "activities_blocks_medias_page_medias_parent_id_idx" ON "activities_blocks_medias_page_medias" USING btree ("_parent_id");
  CREATE INDEX "activities_blocks_medias_page_order_idx" ON "activities_blocks_medias_page" USING btree ("_order");
  CREATE INDEX "activities_blocks_medias_page_parent_id_idx" ON "activities_blocks_medias_page" USING btree ("_parent_id");
  CREATE INDEX "activities_blocks_medias_page_path_idx" ON "activities_blocks_medias_page" USING btree ("_path");
  CREATE INDEX "activities_blocks_music_page_showcase_playlists_order_idx" ON "activities_blocks_music_page_showcase_playlists" USING btree ("_order");
  CREATE INDEX "activities_blocks_music_page_showcase_playlists_parent_id_idx" ON "activities_blocks_music_page_showcase_playlists" USING btree ("_parent_id");
  CREATE INDEX "activities_blocks_music_page_order_idx" ON "activities_blocks_music_page" USING btree ("_order");
  CREATE INDEX "activities_blocks_music_page_parent_id_idx" ON "activities_blocks_music_page" USING btree ("_parent_id");
  CREATE INDEX "activities_blocks_music_page_path_idx" ON "activities_blocks_music_page" USING btree ("_path");
  CREATE INDEX "activities_cover_idx" ON "activities" USING btree ("cover_id");
  CREATE INDEX "activities_updated_at_idx" ON "activities" USING btree ("updated_at");
  CREATE INDEX "activities_created_at_idx" ON "activities" USING btree ("created_at");
  CREATE INDEX "activities_rels_order_idx" ON "activities_rels" USING btree ("order");
  CREATE INDEX "activities_rels_parent_idx" ON "activities_rels" USING btree ("parent_id");
  CREATE INDEX "activities_rels_path_idx" ON "activities_rels" USING btree ("path");
  CREATE INDEX "activities_rels_media_id_idx" ON "activities_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_collaborators_id_idx" ON "payload_locked_documents_rels" USING btree ("collaborators_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("roles_id");
  CREATE INDEX "payload_locked_documents_rels_project_types_id_idx" ON "payload_locked_documents_rels" USING btree ("project_types_id");
  CREATE INDEX "payload_locked_documents_rels_skills_id_idx" ON "payload_locked_documents_rels" USING btree ("skills_id");
  CREATE INDEX "payload_locked_documents_rels_activities_id_idx" ON "payload_locked_documents_rels" USING btree ("activities_id");
  CREATE INDEX "payload_locked_documents_rels_payload_kv_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_kv_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "about_page_header_socials_order_idx" ON "about_page_header_socials" USING btree ("_order");
  CREATE INDEX "about_page_header_socials_parent_id_idx" ON "about_page_header_socials" USING btree ("_parent_id");
  CREATE INDEX "about_page_other_experiences_order_idx" ON "about_page_other_experiences" USING btree ("_order");
  CREATE INDEX "about_page_other_experiences_parent_id_idx" ON "about_page_other_experiences" USING btree ("_parent_id");
  CREATE INDEX "about_page_other_education_order_idx" ON "about_page_other_education" USING btree ("_order");
  CREATE INDEX "about_page_other_education_parent_id_idx" ON "about_page_other_education" USING btree ("_parent_id");
  CREATE INDEX "about_page_other_awwards_order_idx" ON "about_page_other_awwards" USING btree ("_order");
  CREATE INDEX "about_page_other_awwards_parent_id_idx" ON "about_page_other_awwards" USING btree ("_parent_id");
  CREATE INDEX "about_page_other_awwards_project_idx" ON "about_page_other_awwards" USING btree ("project_id");
  CREATE INDEX "about_page_header_header_side_photo_idx" ON "about_page" USING btree ("header_side_photo_id");
  CREATE INDEX "about_page_header_header_resumee_idx" ON "about_page" USING btree ("header_resumee_id");
  CREATE INDEX "about_page_rels_order_idx" ON "about_page_rels" USING btree ("order");
  CREATE INDEX "about_page_rels_parent_idx" ON "about_page_rels" USING btree ("parent_id");
  CREATE INDEX "about_page_rels_path_idx" ON "about_page_rels" USING btree ("path");
  CREATE INDEX "about_page_rels_media_id_idx" ON "about_page_rels" USING btree ("media_id");
  CREATE INDEX "about_page_rels_activities_id_idx" ON "about_page_rels" USING btree ("activities_id");
  CREATE INDEX "about_page_rels_skills_id_idx" ON "about_page_rels" USING btree ("skills_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "collaborators" CASCADE;
  DROP TABLE "projects_collaborators" CASCADE;
  DROP TABLE "projects_project_contents_image_groups_images" CASCADE;
  DROP TABLE "projects_project_contents_image_groups" CASCADE;
  DROP TABLE "projects_project_contents" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "roles" CASCADE;
  DROP TABLE "project_types" CASCADE;
  DROP TABLE "skills" CASCADE;
  DROP TABLE "skills_rels" CASCADE;
  DROP TABLE "activities_blocks_medias_page_medias" CASCADE;
  DROP TABLE "activities_blocks_medias_page" CASCADE;
  DROP TABLE "activities_blocks_music_page_showcase_playlists" CASCADE;
  DROP TABLE "activities_blocks_music_page" CASCADE;
  DROP TABLE "activities" CASCADE;
  DROP TABLE "activities_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "about_page_header_socials" CASCADE;
  DROP TABLE "about_page_other_experiences" CASCADE;
  DROP TABLE "about_page_other_education" CASCADE;
  DROP TABLE "about_page_other_awwards" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_rels" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_projects_project_contents_image_groups_images_ratio";
  DROP TYPE "public"."enum_projects_project_contents_image_groups_display";`)
}
