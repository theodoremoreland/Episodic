CREATE OR REPLACE FUNCTION "fnSeriesMangaReviewsCount"(
  _series text)
    RETURNS INTEGER
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
DECLARE _series_id INTEGER;
DECLARE _review_count INTEGER;

BEGIN
  _series_id = (SELECT series_id FROM series WHERE name = _series);
  _review_count = (
    WITH valid_reviews AS (
      SELECT 
        SUM(
          COALESCE((value::jsonb ->> 'manga')::int, 0)
        ) as review_points
      FROM v_anime_vs_manga
      WHERE series_id = _series_id
      GROUP BY weekending, enteredby_id
    )
    SELECT COUNT(*) FROM valid_reviews WHERE review_points > 0
    );

  RETURN (_review_count );
  
END;
$BODY$;