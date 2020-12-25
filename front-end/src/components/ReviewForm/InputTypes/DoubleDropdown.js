// React
import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


export default function DoubleDropdown({inputSettings}) {
    const {
        question,
        hoverText,
        answers,
        setAnswers
    } = inputSettings;

   // alert(JSON.stringify(answers[question]));

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

                {/* Field for 'anime' */}
                <Grid item xs={6}>
                    {
                        answers[question] !== undefined
                        ?   <FormControl className="formDropdown" variant="filled"> 
                            <InputLabel htmlFor="filled-age-native-simple">Anime</InputLabel>
                                <Select
                                    native
                                    value={answers[question].anime}
                                    onChange={(event) => setAnswers({...answers, [question] : {...answers[question], "anime": event.target.value} })}
                                    label="Anime"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => <option key={num} value={num}>{num}</option>)}
                                </Select>
                            </FormControl>
                        : ""
                    }
                </Grid>

                {/* Field for 'manga' */}
                <Grid item xs={6}>
                    {
                        answers[question] !== undefined
                        ?   <FormControl className="formDropdown" variant="filled"> 
                            <InputLabel htmlFor="filled-age-native-simple">Manga</InputLabel>
                                <Select
                                    native
                                    value={answers[question].manga}
                                    onChange={(event) => setAnswers({...answers, [question] : {...answers[question], "manga": event.target.value} })}
                                    label="Manga"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => <option key={num} value={num}>{num}</option>)}
                                </Select>
                            </FormControl>
                        : ""
                    }
                </Grid>
            </Grid>
    );
};