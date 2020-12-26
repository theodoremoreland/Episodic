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

    const handleChange = (name, value) => {
        if (isNaN(value)) {
            value = null;
        };

        if (name === "Anime") {
            setAnswers({...answers, [question] : {...answers[question], "anime": value} })
        }
        else {
            setAnswers({...answers, [question] : {...answers[question], "manga": value} })
        }; 
    };

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
                            <InputLabel id="selectAnimeRating" htmlFor="filled-age-native-simple">Anime</InputLabel>
                                <Select
                                    labelId="selectAnimeRating"
                                    native
                                    value={answers[question].anime}
                                    onChange={(event) => handleChange("Anime", event.target.value)}
                                    label="Anime"
                                >
                                    {[null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => <option key={num || "null"} value={num}>{num || "Have not watched corresponding episode(s)"}</option>)}
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
                            <InputLabel id="selectMangaRating" htmlFor="filled-age-native-simple">Manga</InputLabel>
                                <Select
                                    labelId="selectMangaRating"
                                    native
                                    value={answers[question].manga}
                                    onChange={(event) => handleChange("Manga", event.target.value)}
                                    label="Manga"
                                >
                                    {[null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => <option key={num || "null"} value={num}>{num || "Have not read corresponding chapter(s)"}</option>)}
                                </Select>
                            </FormControl>
                        : ""
                    }
                </Grid>
            </Grid>
    );
};