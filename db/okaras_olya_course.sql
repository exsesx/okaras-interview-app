CREATE TYPE GENDER AS ENUM ('male', 'female');
CREATE TYPE STATUS AS ENUM ('deployed', 'draft', 'archived');
CREATE TYPE ANSWER_TYPE AS ENUM ('select one', 'select many', 'text', 'number');

CREATE TABLE IF NOT EXISTS users (
  user_id      SERIAL PRIMARY KEY,
  name         VARCHAR(20) DEFAULT NULL,
  username     VARCHAR(20) UNIQUE NOT NULL,
  email        VARCHAR(50) UNIQUE NOT NULL,
  organization VARCHAR(50) DEFAULT NULL,
  biography    TEXT        DEFAULT NULL,
  gender       GENDER      DEFAULT NULL,
  phone        VARCHAR(13) UNIQUE NOT NULL,
  country      VARCHAR(60)        NOT NULL,
  city         VARCHAR(80)        NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  project_id  SERIAL PRIMARY KEY,
  name        VARCHAR(20) NOT NULL,
  description TEXT DEFAULT NULL,
  version     INTEGER     NOT NULL,
  status      STATUS      NOT NULL,
  user_id     INTEGER REFERENCES users
);

CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL PRIMARY KEY,
  title varchar(150) NOT NULL,
  project_id INTEGER REFERENCES projects
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL PRIMARY KEY,
  answer_type ANSWER_TYPE NOT NULL,
  options varchar(50)[] DEFAULT NULL,
  question_id INTEGER UNIQUE REFERENCES questions
);

CREATE TABLE IF NOT EXISTS submissions (
  submission_id SERIAL PRIMARY KEY,
  submission_value varchar(100) NOT NULL,
  question_id INTEGER REFERENCES questions
);

-- ############################## Users: ###############################################################################

INSERT INTO users (name, username, email, organization, biography, gender, phone, country, city) VALUES
  ('Oleg Vanin', 'exsesx', 'exsesx@gmail.com', 'Freshcode Inc', 'test biography...', 'male', '+380966057779', 'Ukraine',
   'Zaporozhye');

INSERT INTO users (name, username, email, organization, biography, gender, phone, country, city) VALUES
  ('Ivan Ivan', 'ivanname', 'ivan@gmail.com', 'Freshcode Inc', 'test biography...2', 'male', '+380966057778', 'Ukraine',
   'Zaporozhye');

INSERT INTO users (name, username, email, organization, biography, gender, phone, country, city) VALUES
  ('Masha', 'mashalogin', 'masha@gmail.com', NULL, 'test biography...3', 'female', '+380966057777', 'Ukraine',
   'Zaporozhye');

-- #####################################################################################################################



-- ############################## Projects: ############################################################################

INSERT INTO projects (name, description, version, status, user_id) VALUES
  ('Project1', 'Project 1 for something', 1, 'draft', 1);

INSERT INTO projects (name, description, version, status, user_id) VALUES
  ('Project2', 'IDK Why', 2, 'draft', 1);

INSERT INTO projects (name, description, version, status, user_id) VALUES
  ('Project3', 'For something', 3, 'draft', 3);

INSERT INTO projects (name, description, version, status, user_id) VALUES
  ('Project4', 'Project 4 for something', 1, 'draft', 2);

-- #####################################################################################################################



-- ############################## Questions: ###########################################################################

INSERT INTO questions (title, project_id) VALUES
  ('Why so serious?', 1);

INSERT INTO questions (title, project_id) VALUES
  ('Why so serious?', 2);

INSERT INTO questions (title, project_id) VALUES
  ('Why so sad???', 1);

-- #####################################################################################################################



-- ############################## Answers: #############################################################################

INSERT INTO answers (answer_type, options, question_id) VALUES
  ('text', null, 1);

INSERT INTO answers (answer_type, options, question_id) VALUES
  ('select many', ARRAY['here it is', 'or maybe this', 'now'], 2);

INSERT INTO answers (answer_type, options, question_id) VALUES
  ('select one', '{"now", "now", "now"}', 3);

-- #####################################################################################################################

INSERT INTO submissions (submission_value, question_id) VALUES ('I dont know', 1);
INSERT INTO submissions (submission_value, question_id) VALUES ('???', 2);
INSERT INTO submissions (submission_value, question_id) VALUES ('Fuck off', 3);

SELECT * FROM submissions LEFT JOIN questions ON submissions.question_id = questions.question_id WHERE questions.question_id = 1;

SELECT * FROM submissions, questions WHERE submissions.question_id = questions.question_id AND submissions.question_id = 1;