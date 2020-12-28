import React from 'react';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, useTheme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const GroupedBarChart = ({ series, reviewScoresPerWeek, reviewScoresPerWeekBySeries }) => {
  const classes = useStyles();
  const theme = useTheme();
  const labels = [];
  const seriesData = [];
  const totalData = [];
  const barOptions = { 
    barThickness: 25,
    maxBarThickness: 25,
    barPercentage: 0.5,
    categoryPercentage: 0.5
  };

  for (let i = 0; i < reviewScoresPerWeek.length; i++) {
    const weekForTotal = reviewScoresPerWeek[i];
    const dateForTotal = weekForTotal[0];
    const ratingForTotalDate = weekForTotal[1];

    for (let j = 0; j < reviewScoresPerWeekBySeries.length; j++) {
      const weekForseries = reviewScoresPerWeekBySeries[j];
      const dateForSeries = weekForseries[0];
      const ratingForSeriesDate = weekForseries[1];

      if (dateForSeries === dateForTotal) {
        labels.push(dateForSeries);
        seriesData.push(ratingForSeriesDate || 0);
        totalData.push(ratingForTotalDate || 0);
      };
    };
  }


  const yAxisMax = () => {
    let max = Math.max(...seriesData, ...totalData);
    max = Math.ceil(max / 10) * 10;
    return max;
  };

  const data = {
    datasets: [
      {
        backgroundColor: '#4A4883',
        data: seriesData.slice(0, 6).reverse(),
        label: series,
        ...barOptions
      },
      {
        backgroundColor: '#d2ccc4',
        data: totalData.slice(0, 6).reverse(),
        label: 'All series',
        ...barOptions
      }
    ],
    labels: labels.slice(0, 6).reverse()
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: true,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            max: yAxisMax(),
            min: 0,
            stepSize: yAxisMax() / 10
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader className="cardTitle" title="Averages Comparison" />
      <Divider />
      <CardContent>
        <Box height={450} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default GroupedBarChart;