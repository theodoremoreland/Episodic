// React
import React from 'react';

// Material UI
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioWrapper({inputSettings}) {
    const {label, options, defaultValue, answers, setAnswers} = inputSettings;

    const handleRadioChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        
        setAnswers({...answers, [key] : value});
    };

    return (
        <FormControl className="registrationRadioGroup" key={label} component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup aria-label={label} name={label}  onChange={handleRadioChange} defaultValue={defaultValue}>
                {
                    options.map((option) => 
                        <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                    )
                }
            </RadioGroup>
        </FormControl>
    )
}