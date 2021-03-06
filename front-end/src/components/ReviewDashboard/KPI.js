import React from 'react';
import clsx from 'clsx';
import { Box, Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: '#007360',
    height: 56,
    width: 56
  },
  positiveIcon: {
    color: '#007360'
  },
  positiveValue: {
    color: '#007360',
    marginRight: theme.spacing(1) 
  },
    negativeIcon: {
      color: '#a51417'
  },
  negativeValue: {
    color: '#a51417',
    marginRight: theme.spacing(1) 
  }
}));

const KPI = ({ title, average, changeFromLastWeek, sinceWeekPrior  }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography className="cardTitle" gutterBottom variant="h6">
              {title} 
            </Typography>
            <Typography className="KPI" variant="h3">
              {average}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
        <Typography className="cardCaption" variant="caption">
            This Week's Rating:&nbsp;&nbsp;
        </Typography>
        {
              sinceWeekPrior >= 7
                ? <>
                    <Typography className={classes.positiveValue} variant="body2">
                      {sinceWeekPrior}
                    </Typography>
                  </>
                : <>
                    <Typography className={classes.negativeValue} variant="body2">
                      {sinceWeekPrior}
                    </Typography>
                  </>
            }
        </Box>
        <Box mt={2} display="flex" alignItems="center">
        {
            changeFromLastWeek >= 0
              ? <>
                  <ArrowUpwardIcon className={classes.positiveIcon} />
                  <Typography className={classes.positiveValue} variant="body2">
                    {changeFromLastWeek}
                  </Typography>
                </>
              : <>
                  <ArrowDownwardIcon className={classes.negativeIcon} />
                  <Typography className={classes.negativeValue} variant="body2">
                    {changeFromLastWeek}
                  </Typography>
                </>
          }
          <Typography className="cardCaption" variant="caption">
            Change From Previous Week
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default KPI;
