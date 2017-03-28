-- delete * from species and reset pkey
TRUNCATE TABLE species RESTART IDENTITY CASCADE;

-- delete * from elements and reset pkey
TRUNCATE TABLE elements RESTART IDENTITY CASCADE;
