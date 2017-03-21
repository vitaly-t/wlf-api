CREATE TABLE samples (
  id serial PRIMARY KEY,
  event_id integer REFERENCES events(id),
  sample text,
  destination text,
  test text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
