-- ______________________________ INSERT REVIEW QUESTIONS _____________________________

INSERT INTO review_questions(
	question
	, inputType
	, questionGroup
	, hoverText
	, required
	, active)
	VALUES(
		'Email'
		, 'SingleTextField'
		, ''
		, ''
		, true
		, true
		);

INSERT INTO review_questions(
	question
	, inputType
	, questionGroup
	, hoverText
	, required
	, active)
	VALUES(
		'Series'
		, 'Dropdown'
		, ''
		, ''
		, true
		, true
		);

INSERT INTO review_questions(
	question
	, inputType
	, questionGroup
	, hoverText
	, required
	, active)
	VALUES(
		'How would you rate the dialogue?'
		, 'DoubleDropdown'
		, 'Anime Vs Manga'
		, 'Consider things like whether or not the chracters express distinct viewpoints, quirks, and motivations.'
		, false
		, true
		);

INSERT INTO review_questions(
	question
	, inputType
	, questionGroup
	, hoverText
	, required
	, active)
	VALUES(
		'How would you rate the artwork?'
		, 'DoubleDropdown'
		, 'Anime Vs Manga'
		, 'Animation and/or illustrations depending on the medium.'
		, false
		, true
		);

INSERT INTO review_questions(
	question
	, inputType
	, questionGroup
	, hoverText
	, required
	, active)
	VALUES(
		'How would you rate the story-telling?'
		, 'DoubleDropdown'
		, 'Anime Vs Manga'
		, ''
		, false
		, true
		);

INSERT INTO review_questions(
	question
	, inputType
	, questionGroup
	, hoverText
	, required
	, active)
	VALUES(
		'How would you rate the voice acting?'
		, 'Dropdown'
		, 'Anime'
		, ''
		, false
		, true
		);

INSERT INTO review_questions(
	question
	, inputType
	, questionGroup
	, hoverText
	, required
	, active)
	VALUES(
		'How would you rate the sound and music?'
		, 'Dropdown'
		, 'Anime'
		, ''
		, false
		, true
	);

INSERT INTO review_questions(
	question
	, inputType
	, questionGroup
	, hoverText
	, required
	, active)
	VALUES(
		'Did this episode live up to your expectations?'
		, 'Elaborate'
		, 'Expectations'
		, ''
		, false
		, true
		);

INSERT INTO review_questions(
	question
	, inputType
	, questionGroup
	, hoverText
	, required
	, active)
	VALUES(
		'Are you excited for the next episode?'
		, 'Elaborate'
		, 'Expectations'
		, ''
		, false
		, true
		);

-- ______________________________ INSERT REVIEWERS _____________________________

INSERT INTO reviewers(username, firstname, lastname, emailaddress)
	VALUES('dev@demo.dev', 'Dev', 'Demo', 'dev@demo.dev');

INSERT INTO reviewers(username, firstname, lastname, emailaddress)
	VALUES('dev2@demo.dev', 'Dev2', 'Demo', 'dev2@demo.dev');

INSERT INTO reviewers(username, firstname, lastname, emailaddress)
	VALUES('dev3@demo.dev', 'Dev3', 'Demo', 'dev3@demo.dev');

INSERT INTO reviewers(username, firstname, lastname, emailaddress)
	VALUES('dev4@demo.dev', 'Dev4', 'Demo', 'dev4@demo.dev');

INSERT INTO reviewers(username, firstname, lastname, emailaddress)
	VALUES('dev5@demo.dev', 'Dev5', 'Demo', 'dev5@demo.dev');


-- ______________________________ INSERT SERIES _____________________________
INSERT INTO series (name, studio, genre)
VALUES('Jujutsu Kaisen', 'MAPPA', 'action');

INSERT INTO series (name, studio, genre)
VALUES('Attack On Titan', 'MAPPA', 'action');

INSERT INTO series (name, studio, genre)
VALUES('Fire Force', 'David Production', 'action');

INSERT INTO series (name, studio, genre)
VALUES('One-Punch Man', 'Madhouse', 'action');

INSERT INTO series (name, studio, genre)
VALUES('My Hero Academia', 'Bones', 'action');

INSERT INTO series (name, studio, genre)
VALUES('Mob Psycho 100', 'Bones', 'action');

INSERT INTO series (name, studio, genre)
VALUES('One Piece', 'Toei Animation', 'action-adventure');

INSERT INTO series (name, studio, genre)
VALUES('Demon Slayer', 'Ufotable', 'action');

INSERT INTO series (name, studio, genre)
VALUES('Black Clover', 'DLE', 'action');

INSERT INTO series (name, studio, genre)
VALUES('Dr. Stone', 'TMS/8PAN', 'adventure');