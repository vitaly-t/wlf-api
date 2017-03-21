CREATE TABLE abundances (
  id serial PRIMARY KEY,
  event_id integer REFERENCES events(id),
  female integer,
  male integer,
  unk_sex integer,
  adult integer,
  young integer,
  unk_age integer,
  attributes jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
