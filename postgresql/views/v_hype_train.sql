DROP VIEW IF EXISTS v_hype_train;
CREATE or REPLACE VIEW v_hype_train AS
  SELECT key, value, series_id, TO_DATE(answers ->> 'Week Ending', 'YYYY-MM-DD') as weekEnding FROM absences
  CROSS JOIN LATERAL jsonb_each_text(answers)
  WHERE
  	key IN (SELECT question FROM review_questions WHERE questiongroup = 'Hype Train')
    AND dateentered IN (SELECT MAX(dateentered) FROM absences GROUP BY series_id, TO_DATE(answers ->> 'Week Ending', 'YYYY-MM-DD'))
  ORDER BY series_id, weekEnding DESC, key;