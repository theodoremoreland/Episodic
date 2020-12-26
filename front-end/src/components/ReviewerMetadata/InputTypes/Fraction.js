// React
import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@material-ui/core';

// Custom styles
import './Fraction.css';


export default function FractionWrapper({inputSettings}) {
    const {label, defaultValue, defaultValue2, setAnswers, answers} = inputSettings;

    return (  
            <Grid container spacing={2}>

                {/* Label w/ hover text */}
                <Grid item xs={12}>
                    <Typography className="fractionTitle" variant="h5" color="primary">
                        {label}
                    </Typography>
                </Grid>

                {/* Field for 'Students' */}
                <Grid item xs={4} className="numerator">
                    <TextField
                            label="Anime"
                            variant="standard"
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            defaultValue={defaultValue}
                            onChange={(event) => setAnswers({...answers, [label] : {...answers[label], "anime": event.target.value || null}})}
                            // event.target.value becomes an empty string if users delete number after adding it
                            // , thus '|| null' is needed to replace empty string with null. 
                    />
                </Grid>
                <Grid item xs={4} className="fractionDividerContainer">
                    <Typography className="fractionDivider" variant="h3">
                            {"/"}
                    </Typography>
                </Grid>
                {/* Field for 'Manga' */}
                <Grid item xs={4} className="denominator">
                    <TextField
                        label="Manga"
                        variant="standard"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        defaultValue={defaultValue2}
                        onChange={(event) => setAnswers({...answers, [label] : {...answers[label], "manga": event.target.value || null}}) }
                        // event.target.value becomes an empty string if users delete number after adding it
                        // , thus '|| null' is needed to replace empty string with null.
                    />
                </Grid>
            </Grid>
    )
};