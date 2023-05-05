DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tokens CASCADE;


CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password CHAR(50) NOT NULL,
  admin BOOLEAN DEFAULT false,
  points INT DEFAULT 0,
  PRIMARY KEY (user_id)
);

INSERT INTO users (username, password, admin) VALUES ('admin', 'admin', true);
INSERT INTO users (username, password) VALUES ('user1', 'user1');
INSERT INTO users (username, password) VALUES ('user2', 'user2');

CREATE TABLE posts (
  post_id INT GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL,
  date_created DATE NOT NULL,
  open BOOLEAN DEFAULT true,
  completed BOOLEAN DEFAULT false,
  accepted BOOLEAN DEFAULT false,
  accepted_by_id INT,
  PRIMARY KEY (post_id),
  FOREIGN KEY (accepted_by_id) REFERENCES users(user_id) 
);

INSERT INTO posts (title, content, category, date_created, accepted_by_id) VALUES ('Library Assistant Needed', 'Florin County Council is seeking a Library Assistant volunteer to help with staffing and organization of our local library. The ideal candidate will have a passion for books and community service.','Volunteer' , NOW(), 2);

CREATE TABLE tokens (
  token_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  token CHAR(36) UNIQUE NOT NULL,
  PRIMARY KEY (token_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
