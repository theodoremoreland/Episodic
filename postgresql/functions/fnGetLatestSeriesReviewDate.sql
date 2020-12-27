CREATE OR REPLACE FUNCTION "fnGetLatestSeriesReviewDate"(
  _series text)
    RETURNS DATE
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
DECLARE _series_id INTEGER;

BEGIN
  _series_id = (select series_id from series where name = _series);

  RETURN (
    SELECT 
      review ->> 'Week Ending' AS "Week Ending"
    FROM reviews
    WHERE series_id = _series_id
    ORDER BY "Week Ending" DESC
    LIMIT 1
  );

END;
$BODY$;