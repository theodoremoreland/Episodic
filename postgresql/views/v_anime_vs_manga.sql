DROP VIEW IF EXISTS v_anime_vs_manga;
CREATE or REPLACE VIEW v_anime_vs_manga AS
  SELECT key, value, series_id, TO_DATE(answers ->> 'Week Ending', 'YYYY-MM-DD') as weekEnding FROM absences
  CROSS JOIN LATERAL jsonb_each_text(answers)
  WHERE
  	key IN (SELECT question FROM review_questions WHERE questiongroup = 'Anime Vs Manga')
	AND dateentered IN (SELECT MAX(dateentered) FROM absences GROUP BY series_id, TO_DATE(answers ->> 'Week Ending', 'YYYY-MM-DD'))
  ORDER BY series_id, weekEnding DESC, key;