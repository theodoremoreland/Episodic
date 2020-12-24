// React
import React from 'react';

// Material UI
import Tooltip from '@material-ui/core/Tooltip';
import { TextField, Typography } from '@material-ui/core';

export default function SinlgeTextField({inputSettings}) {
    const {
        question,
        hoverText,
        required,
        school,
        email,
        answers,
        setAnswers
    } = inputSettings;

    const defaultValue = question === "Email" ? email : (question === "School" ? school : null);
    const disabled = (question === "Email" || question === "School") ? true : false;
    const variant = (question === "Email" || question === "School") ? "filled" : "outlined";
    const type = question.includes("number") ? "number" : "text";

    return (
        <>
            <Tooltip className="hoverText" title={hoverText} width={"600px"} arrow>
                <Typography className="questions" variant="h5" color="primary">
                    {question}
                </Typography>
            </Tooltip>
            <TextField
                disabled={disabled}
                className="SingleTextField"
                variant={variant}
                type={type}
                InputProps={{ inputProps: { min: 0 } }}
                defaultValue={defaultValue}
                required={required}
                onChange={(event) => setAnswers({...answers, [question] : event.target.value})}
            />
        </>
    );
};