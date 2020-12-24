import React from 'react';
import clsx from 'clsx';
import { Box, Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: '#007360',
    height: 56,
    width: 56
  },
  negativeIcon: {
    color: '#007360'
  },
  negativeValue: {
    color: '#007360',
    marginRight: theme.spacing(1) 
  },
    positiveIcon: {
      color: '#a51417'
  },
  positiveValue: {
    color: '#a51417',
    marginRight: theme.spacing(1) 
  }
}));

const Total = ({ totalPostive, SinceWeekPrior, totalChangeFromLastWeek }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography className="cardTitle" gutterBottom variant="h6">
              Cumulative Positive 
            </Typography>
            <Typography className="KPI" variant="h3">
              {totalPostive}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
        {
              SinceWeekPrior === 0
                ? <>
                    <AddIcon className={classes.negativeIcon} style={{"fontSize": "12px", "marginLeft": "12px"}}/>
                    <Typography className={classes.negativeValue} variant="body2">
                      {SinceWeekPrior}
                    </Typography>
                  </>
                : <>
                    <AddIcon className={classes.positiveIcon} style={{"fontSize": "12px", "marginLeft": "12px"}}/>
                    <Typography className={classes.positiveValue} variant="body2">
                      {SinceWeekPrior}
                    </Typography>
                  </>
            }
          <Typography className="cardCaption" variant="caption">
            Since Week Prior
          </Typography>
        </Box>
        <Box mt={2} display="flex" alignItems="center">
        {
            totalChangeFromLastWeek < 0
              ? <>
                  <ArrowDownwardIcon className={classes.negativeIcon} />
                  <Typography className={classes.negativeValue} variant="body2">
                    {Math.abs(totalChangeFromLastWeek)}
                  </Typography>
                </>
              : (totalChangeFromLastWeek === 0
                  ? <>
                      <ArrowDownwardIcon className={classes.positiveIcon} />
                      <Typography className={classes.positiveValue} variant="body2">
                        {Math.abs(totalChangeFromLastWeek)}
                      </Typography>
                    </>
                  : <>
                      <ArrowUpwardIcon className={classes.positiveIcon} />
                      <Typography className={classes.positiveValue} variant="body2">
                        {Math.abs(totalChangeFromLastWeek)}
                      </Typography>
                    </>
                )
          }
          <Typography className="cardCaption" variant="caption">
            Change From Previous Week
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Total;
