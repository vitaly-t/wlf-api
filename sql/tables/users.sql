CREATE TABLE users (
  id serial PRIMARY KEY,
  username varchar(25) NOT NULL,
  password_hash varchar(35) NOT NULL,
  first_name varchar(35),
  last_name varchar(35),
  email TEXT NOT NULL UNIQUE check (email ~* '^.+@.+\..+$'),
  attributes jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
