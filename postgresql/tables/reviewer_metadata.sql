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