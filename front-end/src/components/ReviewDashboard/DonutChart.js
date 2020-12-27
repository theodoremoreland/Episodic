import React from 'react';
import clsx from 'clsx';
import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, colors, makeStyles, useTheme } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const DonutChart = ({ animeReviewsCount, mangaReviewsCount }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [animeReviewsCount, mangaReviewsCount],
        backgroundColor: [
          '#4A4883',
          '#BC2628'
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Anime Reviews', 'Manga Reviews']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const positive = [
    {
      title: 'Anime Reviews',
      value: animeReviewsCount,
      icon: SupervisorAccountIcon,
      color: '#4A4883'
    },
    {
      title: 'Manga Reviews',
      value: mangaReviewsCount,
      icon: PeopleAltIcon,
      color: '#BC2628'
    }
  ];

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader className="cardTitle" title="Cumulative Reviews" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {positive.map(({ color, icon: Icon, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Icon color="action" />
              <Typography className="cardSubtitle" variant="body1">
                {title}
              </Typography>
              <Typography className="KPI" style={ { color } } variant="h2">
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DonutChart;