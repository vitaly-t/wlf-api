CREATE TABLE biometrics (
  id serial PRIMARY KEY,
  event_id integer REFERENCES events(id),
  measurement text,
  value numeric,
  units text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
