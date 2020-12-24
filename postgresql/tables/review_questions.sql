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