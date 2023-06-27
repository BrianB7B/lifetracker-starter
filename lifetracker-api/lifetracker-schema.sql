CREATE TABLE users (
  id         VARCHAR(250) NOT NULL,
  username   VARCHAR(250) NOT NULL,
  password   VARCHAR(250) NOT NULL,
  first_name VARCHAR(250) NOT NULL,
  last_name  VARCHAR(250) NOT NULL,
  email      VARCHAR(250) NOT NULL,
  created_at VARCHAR(250) NOT NULL,
  updated_at VARCHAR(250) NOT NULL

);

CREATE TABLE nutrition (
  id         VARCHAR(250) NOT NULL,
  username   VARCHAR(250) NOT NULL,
  category   VARCHAR(250) NOT NULL,
  calories VARCHAR(250) NOT NULL,
  image_url  VARCHAR(250) NOT NULL,
  user_id      VARCHAR(250) NOT NULL,
  created_at VARCHAR(250) NOT NULL
);
