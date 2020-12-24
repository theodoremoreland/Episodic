CREATE TABLE schools (
   school_id  serial primary key,
   district_id int,
   name  varchar(100),
   affiliation  varchar(100),
   address  varchar(200),
   grades  varchar(100),
   sizestudentbody  int,
   CONSTRAINT fk_district
    FOREIGN KEY(district_id)
        REFERENCES districts(district_id)
);


CREATE TABLE users (
   user_id  serial primary key,
   district_id  int,
   school_id  int,
   username  VARCHAR(30),
   firstname  VARCHAR(50),
   lastname  VARCHAR(50),
   emailaddress  VARCHAR(100),
   phone VARCHAR(15),
   CONSTRAINT fk_district
    FOREIGN KEY(district_id)
        REFERENCES districts(district_id),
   CONSTRAINT fk_school
    FOREIGN KEY(school_id)
        REFERENCES schools(school_id)       
);


CREATE TABLE absences(
   entry_id  serial primary key,
   district_id  int,
   school_id  int,
   enteredby_id  int,
   dateentered  timestamp DEFAULT now(),
   answers  jsonb,
   CONSTRAINT fk_district
    FOREIGN KEY(district_id)
        REFERENCES districts(district_id),
   CONSTRAINT fk_school
    FOREIGN KEY(school_id)
        REFERENCES schools(school_id),
   CONSTRAINT fk_user
    FOREIGN KEY(enteredby_id)
        REFERENCES users(user_id)        
);


CREATE TABLE school_metadata(
   "ID" serial,
   school_id  int,
   enteredby_id  int,
   dateentered  timestamp DEFAULT now(),
   metadata  json,
   active boolean,
   PRIMARY KEY ("ID"),
   CONSTRAINT fk_school
    FOREIGN KEY(school_id)
        REFERENCES schools(school_id),
   CONSTRAINT fk_user
    FOREIGN KEY(enteredby_id)
        REFERENCES users(user_id)
);