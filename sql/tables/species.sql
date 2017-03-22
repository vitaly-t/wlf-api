CREATE TABLE species (
  id serial PRIMARY KEY,
  common_name text NOT NULL,
  species_code text,
  genus text,
  species text,
  subspecies text,
  class text,
  subclass text,
  attributes jsonb,
  ndow_id integer,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

COMMENT ON TABLE species IS
'A lookup table for all the vertebrate species in Nevada.';

COMMENT ON COLUMN species.common_name IS
'The common english name for the species.';

COMMENT ON COLUMN species.genus IS
'The genus of the species.';

COMMENT ON COLUMN species.species IS
'The species of the species.';

COMMENT ON COLUMN species.sub_species IS
'The sub species of the species';

COMMENT ON COLUMN species.attributes IS
'Any additional attributes for the species.';

COMMENT ON COLUMN species.created_at IS
'Timestamp that the row is created.';

COMMENT ON COLUMN species.updated_at IS
'Timestamp that the row was last updated.';
