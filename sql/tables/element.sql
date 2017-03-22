CREATE TABLE elements (
  id serial PRIMARY KEY,
  animal_id integer,
  species_id integer REFERENCES species(id),
  sex text,
  attributes jsonb,
  animal_key_mdb integer,
  ndow_species_code integer,
  alpha_code text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

COMMENT ON TABLE elements IS
'All encountered animals. Element refers to this table (the animals) as the root element of the database.';

COMMENT ON COLUMN elements.element_id IS
'A unique ID given to each encountered animals. This can be null. However animals that are handled should receive unique IDs';

COMMENT ON COLUMN elements.species_id IS
'A reference to the ID of the species in the species table.';

COMMENT ON COLUMN elements.sex IS
'The sex of the animal.';

COMMENT ON COLUMN elements.attributes IS
'Additional attributes about the animals stored as a JSON.';
