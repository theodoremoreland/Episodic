// React
import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { TextField, Typography } from '@material-ui/core';


export default function DoubleTextField({inputSettings}) {
    const {
        question,
        hoverText,
        required,
        answers,
        setAnswers
    } = inputSettings;

    return (  
            <Grid container spacing={2}>
                {/* Label w/ hover text */}
                <Grid item xs={12}>
                    <Tooltip className="hoverText" title={hoverText} width={"600px"} arrow>
                        <Typography className="questions" variant="h5" color="primary">
                            {question}
                        </Typography>
                    </Tooltip>
                </Grid>

                {/* Field for 'faculty/staff' */}
                <Grid item xs={6}>
                    <TextField
                            className="DoubleTextField"
                            label="Faculty/Staff"
                            variant="outlined"
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            required={required}
                            onChange={(event) => setAnswers({...answers, [question] : {...answers[question], "faculty/staff": event.target.value || null}})}
                            // event.target.value becomes an empty string if users delete number after adding it
                            // , thus '|| null' is needed to replace empty string with null. 
                    />
                </Grid>

                {/* Field for 'students' */}
                <Grid item xs={6}>
                    <TextField
                        className="DoubleTextField"
                        label="Students"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        required={required}
                        onChange={(event) => setAnswers({...answers, [question] : {...answers[question], "students": event.target.value || null}})}
                        // event.target.value becomes an empty string if users delete number after adding it
                        // , thus '|| null' is needed to replace empty string with null.
                    />
                </Grid>
            </Grid>
    );
};