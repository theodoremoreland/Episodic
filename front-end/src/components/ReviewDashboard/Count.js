import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

const Count = ({ count }) => {

  return (
    <Card style={{"height": "100%"}}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography className="cardTitle" gutterBottom variant="h6">
              Total Reviews Submitted 
            </Typography>
            <Typography className="KPI" variant="h3">
              {count}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Count;
