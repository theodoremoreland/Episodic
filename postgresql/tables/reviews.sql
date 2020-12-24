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