CREATE TABLE reviewer_metadata(
   "ID" serial,
   enteredby_id  int,
   dateentered  timestamp DEFAULT now(),
   metadata  json,
   active boolean,
   PRIMARY KEY ("ID"),
   CONSTRAINT fk_series
    FOREIGN KEY(series_id)
        REFERENCES series(series_id),
   CONSTRAINT fk_reviewer
    FOREIGN KEY(enteredby_id)
        REFERENCES reviewers(reviewer_id)
);