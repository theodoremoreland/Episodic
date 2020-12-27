CREATE OR REPLACE FUNCTION "fnSeriesAnimeReviewsCount"(
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
    SELECT
      COUNT(DISTINCT weekending)
    FROM v_anime
    WHERE
      value IS NOT NULL
      AND series_id = _series_id
    );


  RETURN (_review_count );
  
END;
$BODY$;