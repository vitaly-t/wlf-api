CREATE TABLE locations (
  id serial PRIMARY KEY,
  loc_name varchar,
  loc_type varchar(25),
  loc_easting numeric,
  loc_northing numeric,
  loc_latitude numeric,
  loc_longitude numeric,
  geom geometry(Point, 4326),
  loc_accuracy numeric,
  loc_quality varchar(25),
  loc_source varchar(25),
  loc_mtn_range varchar(50),
  loc_hunt_unit integer,
  loc_mgmt_area integer,
  loc_id_tmp integer,
  attributes jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

COMMENT ON TABLE locations IS
'Reference table for all the locations stored in the database.';

COMMENT ON COLUMN locations.loc_name IS
'The name of the location, i.e. Beehive, South Creek, etc.';

COMMENT ON COLUMN locations.loc_type IS
'The type of location for the event. For instance, XY = the actual XY coordinates from a GPS. Geography = an geographic description of the location. Mountain Range, City, Hunt Unit all refer to polygon scale reference on a map. These should be used as a last resort.';

COMMENT ON COLUMN locations.loc_easting IS
'The UTM NAD84 easting of the coordinates.';

COMMENT ON COLUMN locations.loc_northing IS
'The UTM NAD84 northing of the coordinates.';

COMMENT ON COLUMN locations.loc_latitiude IS
'The WGS83 longitude of the coordinates.';

COMMENT ON COLUMN locations.loc_longitude IS
'The WGS83 latitude of the coordinates.';

COMMENT ON COLUMN locations.geom IS
'The spatially explicit coordinates.';

COMMENT ON COLUMN locations.loc_accuracy IS
'The accuracy of the coordinates if taken from a GPS.';

COMMENT ON COLUMN locations.loc_source IS
'The source of the coordinates. If from a GPS then GPS. If from a geography, city, etc. then Map.';

COMMENT ON COLUMN locations.loc_mtn_range IS
'The mountain range the event occured in. This can be the same as the loc_name.';

COMMENT ON COLUMN locations.loc_hunt_unit IS
'The hunt unit that the event occured in. This can be the same as the loc_name.';

COMMENT ON COLUMN locations.loc_mgmt_area IS
'The management are that the event occured in. This can be the same as the loc_name, but should be used as a last resort.';
