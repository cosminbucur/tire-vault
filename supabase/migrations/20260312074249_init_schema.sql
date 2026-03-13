create type "public"."tire_location" as enum ('car', 'storage');

create type "public"."tire_rim" as enum ('plate', 'alloy');

create type "public"."tire_season" as enum ('summer', 'winter', 'all_season');

create type "public"."tire_type" as enum ('regular', 'runflat');

create type "public"."tire_wear" as enum ('good', 'ok', 'warning', 'danger');


  create table "public"."customers" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "first_name" text not null,
    "last_name" text not null,
    "company" text,
    "phone" text not null,
    "email" text not null,
    "created_at" timestamp with time zone default now()
      );



  create table "public"."mechanics" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "first_name" text not null,
    "last_name" text not null,
    "created_at" timestamp with time zone default now()
      );



  create table "public"."tires" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "visit_id" uuid,
    "brand" text not null,
    "width" text not null,
    "height" text not null,
    "diameter_type" text not null,
    "tire_type" public.tire_type not null,
    "season" public.tire_season not null,
    "rim_type" public.tire_rim not null,
    "wear_indicator" public.tire_wear not null,
    "location" public.tire_location not null,
    "created_at" timestamp with time zone default now()
      );



  create table "public"."visits" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "customer_id" uuid,
    "license_plate" text not null,
    "mechanic_id" uuid,
    "services_performed" text not null,
    "notes" text,
    "status" text default 'Pending'::text,
    "storage_point" text,
    "caps_number" text,
    "visit_date" date default CURRENT_DATE,
    "created_at" timestamp with time zone default now()
      );


CREATE UNIQUE INDEX customers_email_key ON public.customers USING btree (email);

CREATE UNIQUE INDEX customers_pkey ON public.customers USING btree (id);

CREATE UNIQUE INDEX mechanics_pkey ON public.mechanics USING btree (id);

CREATE UNIQUE INDEX tires_pkey ON public.tires USING btree (id);

CREATE UNIQUE INDEX visits_pkey ON public.visits USING btree (id);

alter table "public"."customers" add constraint "customers_pkey" PRIMARY KEY using index "customers_pkey";

alter table "public"."mechanics" add constraint "mechanics_pkey" PRIMARY KEY using index "mechanics_pkey";

alter table "public"."tires" add constraint "tires_pkey" PRIMARY KEY using index "tires_pkey";

alter table "public"."visits" add constraint "visits_pkey" PRIMARY KEY using index "visits_pkey";

alter table "public"."customers" add constraint "customers_email_key" UNIQUE using index "customers_email_key";

alter table "public"."tires" add constraint "tires_visit_id_fkey" FOREIGN KEY (visit_id) REFERENCES public.visits(id) ON DELETE CASCADE not valid;

alter table "public"."tires" validate constraint "tires_visit_id_fkey";

alter table "public"."visits" add constraint "visits_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE not valid;

alter table "public"."visits" validate constraint "visits_customer_id_fkey";

alter table "public"."visits" add constraint "visits_mechanic_id_fkey" FOREIGN KEY (mechanic_id) REFERENCES public.mechanics(id) ON DELETE CASCADE not valid;

alter table "public"."visits" validate constraint "visits_mechanic_id_fkey";

grant delete on table "public"."customers" to "anon";

grant insert on table "public"."customers" to "anon";

grant references on table "public"."customers" to "anon";

grant select on table "public"."customers" to "anon";

grant trigger on table "public"."customers" to "anon";

grant truncate on table "public"."customers" to "anon";

grant update on table "public"."customers" to "anon";

grant delete on table "public"."customers" to "authenticated";

grant insert on table "public"."customers" to "authenticated";

grant references on table "public"."customers" to "authenticated";

grant select on table "public"."customers" to "authenticated";

grant trigger on table "public"."customers" to "authenticated";

grant truncate on table "public"."customers" to "authenticated";

grant update on table "public"."customers" to "authenticated";

grant delete on table "public"."customers" to "service_role";

grant insert on table "public"."customers" to "service_role";

grant references on table "public"."customers" to "service_role";

grant select on table "public"."customers" to "service_role";

grant trigger on table "public"."customers" to "service_role";

grant truncate on table "public"."customers" to "service_role";

grant update on table "public"."customers" to "service_role";

grant delete on table "public"."mechanics" to "anon";

grant insert on table "public"."mechanics" to "anon";

grant references on table "public"."mechanics" to "anon";

grant select on table "public"."mechanics" to "anon";

grant trigger on table "public"."mechanics" to "anon";

grant truncate on table "public"."mechanics" to "anon";

grant update on table "public"."mechanics" to "anon";

grant delete on table "public"."mechanics" to "authenticated";

grant insert on table "public"."mechanics" to "authenticated";

grant references on table "public"."mechanics" to "authenticated";

grant select on table "public"."mechanics" to "authenticated";

grant trigger on table "public"."mechanics" to "authenticated";

grant truncate on table "public"."mechanics" to "authenticated";

grant update on table "public"."mechanics" to "authenticated";

grant delete on table "public"."mechanics" to "service_role";

grant insert on table "public"."mechanics" to "service_role";

grant references on table "public"."mechanics" to "service_role";

grant select on table "public"."mechanics" to "service_role";

grant trigger on table "public"."mechanics" to "service_role";

grant truncate on table "public"."mechanics" to "service_role";

grant update on table "public"."mechanics" to "service_role";

grant delete on table "public"."tires" to "anon";

grant insert on table "public"."tires" to "anon";

grant references on table "public"."tires" to "anon";

grant select on table "public"."tires" to "anon";

grant trigger on table "public"."tires" to "anon";

grant truncate on table "public"."tires" to "anon";

grant update on table "public"."tires" to "anon";

grant delete on table "public"."tires" to "authenticated";

grant insert on table "public"."tires" to "authenticated";

grant references on table "public"."tires" to "authenticated";

grant select on table "public"."tires" to "authenticated";

grant trigger on table "public"."tires" to "authenticated";

grant truncate on table "public"."tires" to "authenticated";

grant update on table "public"."tires" to "authenticated";

grant delete on table "public"."tires" to "service_role";

grant insert on table "public"."tires" to "service_role";

grant references on table "public"."tires" to "service_role";

grant select on table "public"."tires" to "service_role";

grant trigger on table "public"."tires" to "service_role";

grant truncate on table "public"."tires" to "service_role";

grant update on table "public"."tires" to "service_role";

grant delete on table "public"."visits" to "anon";

grant insert on table "public"."visits" to "anon";

grant references on table "public"."visits" to "anon";

grant select on table "public"."visits" to "anon";

grant trigger on table "public"."visits" to "anon";

grant truncate on table "public"."visits" to "anon";

grant update on table "public"."visits" to "anon";

grant delete on table "public"."visits" to "authenticated";

grant insert on table "public"."visits" to "authenticated";

grant references on table "public"."visits" to "authenticated";

grant select on table "public"."visits" to "authenticated";

grant trigger on table "public"."visits" to "authenticated";

grant truncate on table "public"."visits" to "authenticated";

grant update on table "public"."visits" to "authenticated";

grant delete on table "public"."visits" to "service_role";

grant insert on table "public"."visits" to "service_role";

grant references on table "public"."visits" to "service_role";

grant select on table "public"."visits" to "service_role";

grant trigger on table "public"."visits" to "service_role";

grant truncate on table "public"."visits" to "service_role";

grant update on table "public"."visits" to "service_role";


