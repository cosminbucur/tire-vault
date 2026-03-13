-- Add is_active column to mechanics table
alter table "public"."mechanics" add column "is_active" boolean not null default true;
