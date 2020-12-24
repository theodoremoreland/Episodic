// React
import React from 'react';

// Material UI
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { TextField } from '@material-ui/core';

export default function CompoundWrapper({inputSettings}) {
    const {
        label,
        label2,
        defaultValue,
        defaultValue2,
        multiline,
        answers,
        setAnswers
    } = inputSettings;

    const handleCompoundChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        
        setAnswers({...answers, [key] : {"Yes/No": value, "How?": answers[key]["How?"]} });
    };

    return (
        <div>
            <FormControl className="registrationCompoundRadioGroup" key={label} component="fieldset">
                <FormLabel component="legend">{label}</FormLabel>
                <RadioGroup row aria-label={label} name={label}  onChange={handleCompoundChange} defaultValue={defaultValue}>
                    <FormControlLabel value="Yes" control={<Radio />} label={"Yes"} />
                    <FormControlLabel value="No" control={<Radio />} label={"No"} />
                </RadioGroup>
            </FormControl>
            <TextField
                className="registrationCompoundTextField"
                key={`${label} ${label2}`}
                label={label2}
                type="text"
                multiline={multiline}
                rows={3}
                variant="standard"
                defaultValue={defaultValue2}
                onChange={(event) => setAnswers({...answers, [label] : {"Yes/No": answers[label]["Yes/No"], "How?": event.target.value || null} }) }
                // event.target.value becomes an empty string if users delete number after adding it
                // , thus '|| null' is needed to replace empty string with null. 
            />
        </div>
    );
}