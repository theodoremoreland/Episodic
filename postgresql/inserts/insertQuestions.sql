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
		'How would you rate the dialogue (on a scale of 1 to 10)?'
		, 'DoubleTextField'
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
		'How would you rate the artwork (on a scale of 1 to 10)?'
		, 'DoubleTextField'
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
		'How would you rate the story-telling (on a scale of 1 to 10)?'
		, 'DoubleTextField'
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
		'How would you rate the voice acting (on a scale of 1 to 10)?'
		, 'SingleTextField'
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
		'How would you rate the sound and music (on a scale of 1 to 10)?'
		, 'SingleTextField'
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
		, 'Hype Train'
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
		, 'Hype Train'
		, ''
		, false
		, true
		);