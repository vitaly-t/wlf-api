CREATE TABLE projects (
  id serial PRIMARY KEY,
  proj_name varchar(75),
  proj_desc varchar(75),
  proj_loc varchar(75),
  proj_start date,
  proj_end date,
  attributes jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

COMMENT ON TABLE projects IS
'Project related information. Each encounter event must be associated with a project.';
