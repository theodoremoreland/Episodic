CREATE OR REPLACE FUNCTION "fnGetSeriesReviewCount"(
  _series text)
    RETURNS INTEGER
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
DECLARE _review_count INTEGER;
DECLARE _series_id INTEGER;

BEGIN
  _series_id = (select series_id from series where name = _series);
  _review_count = (select COUNT(*) from reviews where series_id = _series_id);

  RETURN _review_count;

END;
$BODY$;