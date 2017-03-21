CREATE TABLE vitals (
  id serial PRIMARY KEY,
  event_id integer REFERENCES events(id),
  time_rec time,
  measurement text,
  value numeric,
  interval integer,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
