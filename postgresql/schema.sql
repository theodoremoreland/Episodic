CREATE TABLE review_questions (
    question_id SERIAL,
    question TEXT NOT NULL,
  	inputType TEXT NOT NULL,
  	questionGroup TEXT,
  	hoverText TEXT,
  	required BOOLEAN NOT NULL,
    active BOOLEAN NOT NULL,
    PRIMARY KEY ("question_id"),
    UNIQUE (question, active)
);


CREATE TABLE reviewers (
   reviewer_id  serial primary key,
   username  VARCHAR(30),
   firstname  VARCHAR(50),
   lastname  VARCHAR(50),
   emailaddress  VARCHAR(100)     
);


CREATE TABLE series (
   series_id  serial primary key,
   name  varchar(100),
   studio  varchar(100),
   genre varchar(100)
);


CREATE TABLE reviews(
   entry_id  serial primary key,
   series_id  int,
   enteredby_id  int,
   dateentered  timestamp DEFAULT now(),
   review  jsonb,
   CONSTRAINT fk_series
    FOREIGN KEY(series_id)
        REFERENCES series(series_id),
   CONSTRAINT fk_reviewer
    FOREIGN KEY(enteredby_id)
        REFERENCES reviewers(reviewer_id)        
);


CREATE TABLE reviewer_metadata(
   metadata_id serial,
   reviewer_id  int,
   dateentered  timestamp DEFAULT now(),
   metadata  json,
   active boolean,
   PRIMARY KEY ("metadata_id"),
   CONSTRAINT fk_reviewer
    FOREIGN KEY(reviewer_id)
        REFERENCES reviewers(reviewer_id)
);