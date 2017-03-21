CREATE TABLE api.elements (
  id serial PRIMARY KEY,
  element_id integer,
  species_id integer REFERENCES api.species(id),
  temp integer,
  sex varchar(6),
  attributes jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

COMMENT ON TABLE api.elements IS
'All encountered animals. Element refers to this table (the animals) as the root element of the database.';

COMMENT ON COLUMN api.elements.element_id IS
'A unique ID given to each encountered animals. This can be null. However animals that are handled should receive unique IDs';

COMMENT ON COLUMN api.elements.species_id IS
'A reference to the ID of the species in the species table.';

COMMENT ON COLUMN api.elements.sex IS
'The sex of the animal.';

COMMENT ON COLUMN api.elements.attributes IS
'Additional attributes about the animals stored as a JSON.';
