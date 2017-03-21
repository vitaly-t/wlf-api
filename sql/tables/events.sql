CREATE TABLE events (
  id serial PRIMARY KEY,
  element_id integer REFERENCES elements(id),
  project_id integer REFERENCES projects(id),
  user_id integer REFERENCES users(id),
  cap_loc_id integer REFERENCES locations(id),
  rel_loc_id integer REFERENCES locations(id),
  status varchar(25),
  event_date date,
  event_time time,
  end_time time,
  enc_method varchar(50),
  enc_reason varchar(50),
  reencounter boolean,
  relocated boolean,
  tag_number varchar(10),
  comments text,
  folder_url varchar,
  qaqc_flag boolean,
  attributes jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

COMMENT ON TABLE events IS
'Every animal (element) must be encounter (or be an event). This table store all the information releted to the encounter event.';
