// React 
import React, {useState, useEffect} from 'react';

// Material UI
import Skeleton from '@material-ui/lab/Skeleton';
import { Container, Grid, Typography } from '@material-ui/core';

// Custom components
import Alert from '../Alert';
import Count from './Count';
import KPI from './KPI';
import GroupedBarChart from './GroupedBarChart';
import DonutChart from './DonutChart';
import Dropdown from './Dropdown';

// Styles
import './Container.css';

function DashboardContainer() {
  const [series, setSeries] = useState(undefined);
  const [selectedSeries, setSelectedSeries] = useState(undefined);

  const [animeReviewsCount, setAnimeReviewsCount] = useState(undefined);
  const [averageAnimeScore, setAverageAnimeScore] = useState(undefined);
  const [averageAnimeScoreChangeFromLastWeek, setAverageAnimeScoreChangeFromLastWeek] = useState(undefined);
  const [averageAnimeScoreSinceWeekPrior, setAverageAnimeScoreSinceWeekPrior] = useState(undefined);

  const [mangaReviewsCount, setMangaReviewsCount] = useState(undefined);
  const [averageMangaScore, setAverageMangaScore] = useState(undefined);
  const [averageMangaScoreChangeFromLastWeek, setAverageMangaScoreChangeFromLastWeek] = useState(undefined);
  const [averageMangaScoreSinceWeekPrior, setAverageMangaScoreSinceWeekPrior] = useState(undefined);

  const [seriesReviewCount, setSeriesReviewCount] = useState(undefined);
  const [latestSeriesReviewDate, setLatestSeriesReviewDate] = useState(undefined);

  const [reviewScoresPerWeekBySeries, setReviewScoresPerWeekBySeries] = useState(undefined);
  const [reviewScoresPerWeek, setReviewScoresPerWeek] = useState(undefined);

  // ALERT STATE
  const [alertIsActive, setAlertIsActive] = useState(false);
  const [alertMessageObj, setAlertMessageObj] = useState({text: "", severity: "", duration: 0});


  const getSeries = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    };

    await fetch(`${process.env.REACT_APP_EPISODIC_API_ENDPOINT}/series`, requestOptions)
        .then(function (response) {
            if (response.status !== 200) {
                return Promise.reject(`${response.status} ${response.statusText}`);
            };
            return response.json();
        })
        .then(function (data) {
            setSeries(data);
            setSelectedSeries(data[0]);
        })
        .catch(error => {
            const text = `Failed to retrive user series data. ${error.toString()}`;
            setAlertMessageObj({
                text,
                "severity": "error",
                "duration": 10_000
            });
            setAlertIsActive(true);
        });
  };

  const getDashboard = async () => {
    const requestOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
    };

    await fetch(`${process.env.REACT_APP_EPISODIC_API_ENDPOINT}/get-dashboard-json?series=${selectedSeries}`, requestOptions)
      .then(function (response) {
        if (response.status !== 200) {
            return Promise.reject(`${response.status} ${response.statusText}`);
        };

        return response.json();
      })
      .then(response => {
        setAnimeReviewsCount(response.main_dashboard_data.anime_reviews_count || 0);
        setAverageAnimeScore(response.main_dashboard_data.average_anime_score || 0);
        setAverageAnimeScoreChangeFromLastWeek(response.main_dashboard_data.avergae_anime_score_change_from_last_week || 0);
        setAverageAnimeScoreSinceWeekPrior(response.main_dashboard_data.average_anime_score_since_week_prior || 0);

        setMangaReviewsCount(response.main_dashboard_data.manga_reviews_count || 0);
        setAverageMangaScore(response.main_dashboard_data.average_manga_score || 0);
        setAverageMangaScoreChangeFromLastWeek(response.main_dashboard_data.average_manga_score_change_from_last_week || 0);
        setAverageMangaScoreSinceWeekPrior(response.main_dashboard_data.average_manga_score_since_week_prior || 0);

        setSeriesReviewCount(response.main_dashboard_data.series_review_count || 0);
        setLatestSeriesReviewDate(response.main_dashboard_data.latest_series_review_date || 0);

        setReviewScoresPerWeekBySeries(response.review_scores_per_week_by_series);
        setReviewScoresPerWeek(response.review_scores_per_week);
      })
      .catch(error => {
          const text = `Error receiving dashboard data. ${error.toString()}.`;
          console.error(text);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
    getSeries();
  }, []);

  useEffect(() => { 
    getDashboard();
    // eslint-disable-next-line
  }, [selectedSeries]); 

  return (
    <Container maxWidth={false} id="dashboard">
      <Grid container spacing={3}>
        <Grid item id="dashboardTitleContainer" xs={12}>
          { latestSeriesReviewDate === undefined
              ? <Skeleton variant="rect" height={40} width={"30%"}/>
              : <div>
                  <Typography id="dashboardTitle">
                    Weekly Metrics for {selectedSeries}
                  </Typography>
                  <Typography id="dashboardSubTitle">
                    Newest episode reviewed: {latestSeriesReviewDate}
                  </Typography>
                </div>
          }
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          {
            averageAnimeScore === undefined || averageAnimeScoreChangeFromLastWeek === undefined || averageAnimeScoreSinceWeekPrior === undefined
            ? <Skeleton id="input" variant="rect" height={200}/>
            : <KPI title={"Average Anime Rating"} average={averageAnimeScore} changeFromLastWeek={averageAnimeScoreChangeFromLastWeek} sinceWeekPrior={averageAnimeScoreSinceWeekPrior} />
          }
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          {
            averageMangaScore === undefined || averageMangaScoreChangeFromLastWeek === undefined || averageMangaScoreSinceWeekPrior === undefined
            ? <Skeleton id="input" variant="rect" height={200}/>
            : <KPI title={"Average Manga Rating"} average={averageMangaScore} changeFromLastWeek={averageMangaScoreChangeFromLastWeek} sinceWeekPrior={averageMangaScoreSinceWeekPrior} />
          }
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          {
            seriesReviewCount === undefined
            ? <Skeleton id="input" variant="rect" height={200}/>
            : <Count title={"Review Forms Submitted"} count = {seriesReviewCount} />
          }
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          {
            series === undefined
            ? <Skeleton id="input" variant="rect" height={200}/>
            : <Dropdown series={series} selectedSeries={selectedSeries} setSelectedSeries={setSelectedSeries} />
          }
        </Grid>
        <Grid item xs={12} md={8}>
          {
            reviewScoresPerWeek === undefined || reviewScoresPerWeekBySeries === undefined
            ? <Skeleton id="input" variant="rect" height={600}/>
            : <GroupedBarChart series={selectedSeries} reviewScoresPerWeek={reviewScoresPerWeek} reviewScoresPerWeekBySeries={reviewScoresPerWeekBySeries} />
          }
        </Grid>
        <Grid item xs={12} md={4}>
          {
            animeReviewsCount === undefined || mangaReviewsCount === undefined
            ? <Skeleton id="input" variant="rect" height={600}/> 
            : <DonutChart animeReviewsCount = {animeReviewsCount} mangaReviewsCount = {mangaReviewsCount} />
          }
        </Grid>
      </Grid>

      <Alert 
                alertMessageObj={alertMessageObj}
                alertIsActive={alertIsActive}
                setAlertIsActive={setAlertIsActive}
            />
    </Container>
  );
};

export default DashboardContainer;
