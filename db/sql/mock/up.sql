-- seed species
INSERT INTO species (
  common_name, genus, species, subspecies, class, subclass
)
VALUES
  ('American badger', 'Taxidea', 'taxus', '', 'Mammal', 'furbearer'),
  ('American black bear', 'Ursus', 'americanus', '', 'Mammal', 'Furbearer'),
  ('American kestrel', 'Falco', 'sparverius', '', 'Bird', 'Raptor');

-- seed elements
INSERT INTO elements (
  animal_id, species_id, sex
)
VALUES
  (10000, 1, 'male'),
  (10001, 2, 'female'),
  (10002, 2, 'male'),
  (10003, 3, 'female');
