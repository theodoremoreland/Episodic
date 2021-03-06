CREATE OR REPLACE FUNCTION "fnAverageAnimeScore"(
  _series text)
    RETURNS DECIMAL
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
DECLARE _series_id INTEGER;
DECLARE _view1_average DECIMAL;
DECLARE _view2_average DECIMAL;

BEGIN
  _series_id = (SELECT series_id FROM series WHERE name = _series);
  _view1_average = (
        SELECT
      AVG(
          (value::jsonb ->> 'anime')::int
        )
    FROM v_anime_vs_manga
    WHERE series_id = _series_id
  );
  _view2_average = (SELECT AVG(value::int) FROM v_anime WHERE series_id = _series_id);

  RETURN TRUNC( (_view1_average + _view2_average) / 2, 2 );
  
END;
$BODY$;