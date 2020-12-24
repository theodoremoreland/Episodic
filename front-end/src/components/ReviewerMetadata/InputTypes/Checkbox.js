// React
import React from 'react';

// Material UI
import { Checkbox } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

export default function CheckboxWrapper({inputSettings}) {
    const {defaultValue, label, options, answers, setAnswers} = inputSettings;
    
    const handleCheckboxChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        const set = new Set(answers[key]);

        if (event.target.checked) {
            set.add(value);
        }
        else {
            set.delete(value);
        }
        setAnswers({...answers, [key] : [...set]});
    };

    return (
        <FormControl component="fieldset" className="registrationCheckbox">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup row>
                {
                    options.map((option) => {
                            let checkbox = <Checkbox color="primary" value={option} onChange={handleCheckboxChange} name={label} key={`checkbox-${option}`}/>;

                            if (Array.isArray(defaultValue)) {
                                checkbox = defaultValue.includes(option)
                                    ? <Checkbox defaultChecked color="primary" value={option} onChange={handleCheckboxChange} name={label} key={`checkbox-${option}`}/>
                                    : checkbox
                            }
                            
                            return <FormControlLabel
                                    control={checkbox}
                                    label={option}
                                    key={`checkboxlabel-${option}`}
                                    />;
                        }   
                    )
                }
            </FormGroup>
        </FormControl>
    );
}