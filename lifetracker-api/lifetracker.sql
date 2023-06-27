\echo 'Delete and recreate lifetracker db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql


-- \echo 'Delete and recreate nutrition db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE lifetracker_test;
-- CREATE DATABASe nutrition;
-- \connect nutrition;

-- \i lifetracker-schema.sql

-- \echo 'Delete and recreate vaccine_hub_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE lifetracker_test;
-- CREATE DATABASE lifetracker_test;
-- \connect lifetracker_test

-- \i lifetracker_test-schema.sql