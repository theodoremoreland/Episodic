// React
import React, { useEffect, useState } from 'react';

// Material UI
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { TextField, Typography } from '@material-ui/core';

export default function Elaborate({inputSettings}) {
    const {question, hoverText, answers, setAnswers} = inputSettings;
    const options = ["Yes", "No"];
    const [radioValue, setRadioValue] = useState("");

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setRadioValue(value);
        setAnswers({...answers, [question] : value});
    };

    // Initialize answer prior to user selecting a value.
    useEffect(() => {
        setAnswers({...answers, [question] : undefined});
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Unchecks radio if answers have been reset.
    useEffect(() => {
        if ( (answers[question] === null || answers[question] === undefined) && radioValue !== "") {
            setRadioValue("");
        }
    }, [answers[question], radioValue]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <Tooltip className="hoverText" title={hoverText} width={"600px"} arrow>
            <Typography className="questions" variant="h5" color="primary">
                {/* Replaces question's trailing question mark with space, then add trailing question mark to hoverText */}
                {question.replace(/\?$/, " ")}{hoverText + "?"}
            </Typography>
        </Tooltip>
        <FormControl className="ElaborateRadioControl" key={question} component="fieldset">
            <RadioGroup aria-label={question} name={question}  value={radioValue} onChange={handleRadioChange}>
                {
                    options.map((option) => 
                        <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                    )
                }
            </RadioGroup>
        </FormControl>
        { radioValue === "No"
            ?           
                <TextField
                    className="ElaborateTextField"
                    variant="standard"
                    type="text"
                    label="Why not?"
                    required
                    onChange={(event) => setAnswers({...answers, [question] : `${radioValue}. ${event.target.value}`})}
                />
            : ""
        }
    </>
    )
};