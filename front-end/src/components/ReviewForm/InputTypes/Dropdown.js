// React
import React from 'react';

// Material UI
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function Dropdown({inputSettings, options}) {
    const {
        question,
        hoverText,
        answers,
        setAnswers
    } = inputSettings;

    return (
        <>
            <Tooltip className="hoverText" title={hoverText} width={"600px"} arrow>
                <Typography className="questions" variant="h5" color="primary">
                    {question}
                </Typography>
            </Tooltip>
            <FormControl className="formDropdown" variant="filled">
            <Select
                native
                value={answers[question]}
                onChange={(event) => setAnswers({...answers, [question]: event.target.value})}
            >
                {options.map((option) => <option key={option} value={option}>{option}</option>)}
            </Select>
            </FormControl>
        </>
    );
};