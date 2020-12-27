CREATE OR REPLACE FUNCTION "fnAverageMangaScoreChangeFromLastWeek"(
  _series text)
    RETURNS DECIMAL
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
DECLARE _series_id INTEGER;
DECLARE _average_this_week DECIMAL;
DECLARE _average_last_week DECIMAL;

BEGIN
    _series_id = (SELECT series_id FROM series WHERE name = _series);

    _average_this_week = (
      SELECT
        AVG(
            (value::jsonb ->> 'manga')::int
          )
      FROM v_anime_vs_manga
      WHERE series_id = _series_id
        AND EXTRACT(year FROM weekEnding) = EXTRACT(year FROM NOW())
        AND EXTRACT(week FROM weekEnding) = EXTRACT(week FROM NOW()) 

    );

    _average_last_week = (
      SELECT
        AVG(
            (value::jsonb ->> 'manga')::int
          )
      FROM v_anime_vs_manga
      WHERE series_id = _series_id
        AND EXTRACT(year FROM weekEnding) = EXTRACT(year FROM NOW())
        AND EXTRACT(week FROM weekEnding) = EXTRACT(week FROM NOW()) - 1

    );

  RETURN TRUNC(_average_this_week - _average_last_week, 2);
END;
$BODY$;