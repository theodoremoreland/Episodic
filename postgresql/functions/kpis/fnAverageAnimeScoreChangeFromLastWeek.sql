CREATE OR REPLACE FUNCTION "fnAverageAnimeScoreChangeFromLastWeek"(
  _series text)
    RETURNS DECIMAL
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
DECLARE _series_id INTEGER;
DECLARE _view1_average_this_week DECIMAL;
DECLARE _view2_average_this_week DECIMAL;
DECLARE _view1_average_last_week DECIMAL;
DECLARE _view2_average_last_week DECIMAL;

BEGIN
    _series_id = (SELECT series_id FROM series WHERE name = _series);

    _view1_average_this_week = (
      SELECT
        AVG(
            (value::jsonb ->> 'anime')::int
          )
      FROM v_anime_vs_manga
      WHERE series_id = _series_id
        AND weekEnding > (NOW() - INTERVAL '7 days')
    );

    _view2_average_this_week = (
      SELECT 
        AVG(value::int)
      FROM v_anime
      WHERE series_id = _series_id
        AND weekEnding > (NOW() - INTERVAL '7 days')
      );

    _view1_average_last_week = (
      SELECT
        AVG(
            (value::jsonb ->> 'anime')::int
          )
      FROM v_anime_vs_manga
      WHERE series_id = _series_id
        AND weekEnding < (NOW() - INTERVAL '7 days')
        AND weekEnding > (NOW() - INTERVAL '14 days')
    );

    _view2_average_last_week = (
      SELECT 
        AVG(value::int)
      FROM v_anime
      WHERE series_id = _series_id
        AND weekEnding < (NOW() - INTERVAL '7 days')
        AND weekEnding > (NOW() - INTERVAL '14 days')
      );

  RETURN TRUNC(
	  	(_view1_average_this_week + _view2_average_this_week) / 2
	  	-
	  	(_view1_average_last_week + _view2_average_last_week) / 2
	  , 2);
END;
$BODY$;