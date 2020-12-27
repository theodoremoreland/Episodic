CREATE OR REPLACE FUNCTION "fnBuildDashboardJSON"(
  _series text)
    RETURNS json
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN

  RETURN (
    SELECT json_build_object(
                              'anime_reviews_count', (SELECT "fnSeriesAnimeReviewsCount"(_series))
                              ,'average_anime_score', (SELECT "fnAverageAnimeScore"(_series))
                              ,'avergae_anime_score_change_from_last_week', (SELECT "fnAverageAnimeScoreChangeFromLastWeek"(_series))
                              ,'average_anime_score_since_week_prior', (SELECT "fnAverageAnimeScoreSinceWeekPrior"(_series))

                              ,'manga_reviews_count', (SELECT "fnSeriesMangaReviewsCount"(_series))
                              ,'average_manga_score', (SELECT "fnAverageMangaScore"(_series))
                              ,'average_manga_score_change_from_last_week', (SELECT "fnAverageMangaScoreChangeFromLastWeek"(_series))
                              ,'average_manga_score_since_week_prior', (SELECT "fnAverageMangaScoreSinceWeekPrior"(_series))

                              ,'series_review_count', (SELECT "fnGetSeriesReviewCount"(_series))
                              ,'latest_series_review_date', (SELECT "fnGetLatestSeriesReviewDate"(_series))
                            )
  );

END;
$BODY$;