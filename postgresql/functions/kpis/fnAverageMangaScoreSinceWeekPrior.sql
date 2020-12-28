CREATE OR REPLACE FUNCTION "fnAverageMangaScoreSinceWeekPrior"(
  _series text)
    RETURNS DECIMAL
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
DECLARE _series_id INTEGER;
DECLARE _average_this_week DECIMAL;

BEGIN
    _series_id = (SELECT series_id FROM series WHERE name = _series);

    _average_this_week = (
      SELECT
        AVG(
            (value::jsonb ->> 'manga')::int
          )
      FROM v_anime_vs_manga
      WHERE series_id = _series_id
        AND weekEnding > (NOW() - INTERVAL '7 days')
    );

  RETURN TRUNC(_average_this_week, 2);
END;
$BODY$;