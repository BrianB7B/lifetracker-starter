CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  username    VARCHAR(250),
  password    VARCHAR(250) NOT NULL,
  first_name  VARCHAR(250) NOT NULL,
  last_name   VARCHAR(250) NOT NULL,
  email       VARCHAR(250) NOT NULL
);


CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  exercise_name VARCHAR(250) NOT NULL,
  exercise_type VARCHAR(250) NOT NULL,
  duration INTEGER NOT NULL,
  intensity INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users (id)
);
