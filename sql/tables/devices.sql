CREATE TABLE devices (
  id serial PRIMARY KEY,
  serial_num text UNIQUE,
  frequency real,
  vendor text,
  model text,
  device_type text,
  network text,
  mfg_date date,
  vhf_lot text,
  attributes jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
