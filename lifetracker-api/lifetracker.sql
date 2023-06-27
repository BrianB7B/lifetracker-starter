\echo 'Delete and recreate user db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE user;
CREATE DATABASe user;
\connect users;

\i lifetracker-schema.sql


\echo 'Delete and recreate nutrition db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE nutrition;
CREATE DATABASe nutrition;
\connect nutrition;

\i lifetracker-schema.sql

-- \echo 'Delete and recreate vaccine_hub_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE lifetracker_test;
-- CREATE DATABASE lifetracker_test;
-- \connect lifetracker_test

-- \i lifetracker_test-schema.sql