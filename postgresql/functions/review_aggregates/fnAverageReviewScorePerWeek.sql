CREATE OR REPLACE FUNCTION "fnAverageReviewScorePerWeek"()
    RETURNS TABLE(weekEnding DATE, average NUMERIC)
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN
  
  RETURN QUERY (
    WITH per_week_per_view AS (
      WITH v_anime_vs_manga_per_week AS (
        SELECT
        AVG(
          ((value::jsonb ->> 'anime')::int + (value::jsonb ->> 'manga')::int) / 2
        ) as average
        , avm.weekEnding
        FROM v_anime_vs_manga avm
        GROUP BY avm.weekEnding
      )
      SELECT
        AVG(
        value::int
        ) as average
        , a.weekEnding
      FROM v_anime a
      GROUP BY a.weekEnding
      UNION ALL
      SELECT * FROM v_anime_vs_manga_per_week
    )
    SELECT
      pwpv.weekEnding
	    , TRUNC(AVG(pwpv.average), 2) as average
      FROM per_week_per_view pwpv
      GROUP BY pwpv.weekEnding
      ORDER BY pwpv.weekEnding DESC
  );

END;
$BODY$;