// React
import React from 'react';

// Material UI
import { TextField } from '@material-ui/core';


export default function TextFieldWrapper({inputSettings}) {
    const {label, type, multiline, defaultValue, disabled, setAnswers, answers} = inputSettings;
    const pattern = type === "tel" ? "[0-9]{3}-[0-9]{3}-[0-9]{4}" : undefined;

    return (
        <TextField
            className="registrationTextField"
            key={label}
            label={label}
            type={type}
            pattern={pattern}
            multiline={multiline}
            rows={2}
            InputProps={{ inputProps: { min: 0 } }}
            variant="standard"
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={(event) => setAnswers({...answers, [label] : event.target.value  || null})}
            // event.target.value becomes an empty string if users delete number after adding it
            // , thus '|| null' is needed to replace empty string with null. 
        />
    );
}