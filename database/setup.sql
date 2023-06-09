DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS tokens CASCADE;
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password CHAR(60) NOT NULL,
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
  added_by INT,
  image_url VARCHAR(255),
  open BOOLEAN DEFAULT true,
  completed BOOLEAN DEFAULT false,
  accepted BOOLEAN DEFAULT false,
  accepted_by_id INT,
  PRIMARY KEY (post_id),
  FOREIGN KEY (accepted_by_id) REFERENCES users(user_id), 
  FOREIGN KEY (added_by) REFERENCES users(user_id) 
);

INSERT INTO posts (title, content, category, date_created, image_url, accepted) VALUES ('Junior Web Developer Wanted', 'We are looking for a junior web developer to join our team. You should have experience with HTML, CSS, and JavaScript.','Job' ,NOW(), 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80', true);

INSERT INTO posts (title, content, category, date_created, image_url, completed) VALUES ('Library Assistant Needed', 'Florin County Council is seeking a Library Assistant volunteer to help with staffing and organization of our local library. The ideal candidate will have a passion for books and community service.','Volunteer' ,NOW(), 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80', true);

INSERT INTO posts (title, content, category, date_created, image_url) VALUES ('Customer Service Representative Needed', 'We are seeking a customer service representative to help us provide excellent service to our residents. You should be friendly, outgoing, and able to handle a variety of customer inquiries.','Workshop' ,NOW(), 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');

INSERT INTO posts (title, content, category, date_created, image_url) VALUES ('Finance Internship Available', 'Are you interested in a career in finance? We have an internship available for a motivated and detail-oriented individual.','Job' ,NOW(), 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');

INSERT INTO posts (title, content, category, date_created, image_url) VALUES ('Parks and Recreation Coordinator Wanted', 'We are looking for an experienced Parks and Recreation Coordinator to help us manage our city parks and recreation facilities.','Volunteer' ,NOW(), 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');

INSERT INTO posts (title, content, category, date_created, image_url) VALUES ('Community Outreach Specialist Needed', 'We are seeking a Community Outreach Specialist to help us connect with residents and build strong relationships with our community.','Workshop' ,NOW(), 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');

INSERT INTO posts (title, content, category, date_created, image_url) VALUES ('Grant Writer Wanted', 'We are seeking an experienced Grant Writer to help us secure funding for our various programs and initiatives.','Volunteer' ,NOW(), 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');

INSERT INTO posts (title, content, category, date_created, image_url) VALUES ('Public Relations Internship Available', 'Are you interested in a career in public relations? We have an internship available for a motivated and creative individual.','Workshop' ,NOW(), 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');

INSERT INTO posts (title, content, category, date_created, image_url) VALUES ('City Planner Wanted', 'We are seeking an experienced City Planner to help us manage and shape our city growth and development.','Social' ,NOW(), 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');

INSERT INTO posts (title, content, category, date_created, image_url) VALUES ('Library Assistant Needed', 'Florin County Council is seeking a Library Assistant volunteer to help with staffing and organization of our local library. The ideal candidate will have a passion for books and community service.','Social' ,NOW(), 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');


CREATE TABLE tokens (
  token_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  token CHAR(36) UNIQUE NOT NULL,
  PRIMARY KEY (token_id),
  FOREIGN KEY (user_id) REFERENCES users("user_id")
);
