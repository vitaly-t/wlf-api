CREATE TABLE mortalities (
  id serial PRIMARY KEY,
  event_id integer REFERENCES events(id),
  cause_of_death text,
  sub_cause text,
  euth_reason text,
  time_death time,
  carcass_age integer,
  femur_index numeric,
  necropsy boolean,
  final_diagnoses text,
  mort_comments text,
  attributes jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
