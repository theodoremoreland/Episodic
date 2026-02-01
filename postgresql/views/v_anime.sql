DROP VIEW IF EXISTS v_anime;
CREATE or REPLACE VIEW v_anime AS
  SELECT key, value, enteredby_id, series_id, TO_DATE(review ->> 'Week Ending', 'YYYY-MM-DD') as weekEnding FROM reviews
  CROSS JOIN LATERAL jsonb_each_text(review)
  WHERE
  	key IN (SELECT question FROM review_questions WHERE questiongroup = 'Anime')
    AND dateentered IN (SELECT MAX(dateentered) FROM reviews GROUP BY enteredby_id, series_id, TO_DATE(review ->> 'Week Ending', 'YYYY-MM-DD'))
  ORDER BY enteredby_id, series_id, weekEnding DESC, key;
