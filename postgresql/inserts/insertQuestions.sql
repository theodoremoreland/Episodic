-- ______________________________ ACTIVE QUESTIONS _____________________________

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