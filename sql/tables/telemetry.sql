CREATE TABLE telemetry (
  id serial PRIMARY KEY,
  device_id integer REFERENCES devices(id),
  serial_num text,
  date_given date,
  date_removed date,
  attributes jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
