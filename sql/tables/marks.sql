CREATE TABLE marks (
  id serial PRIMARY KEY,
  mark_type text,
  mark_id text,
  mark_color text,
  mark_location text,
  date_given date,
  date_removed date,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

COMMENT ON TABLE marks IS
'Identification tags or marks given to the animal. These can include eartags, bird bands, PIT tags, etc.';
