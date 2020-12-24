// React
import React from 'react';

// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


export default function Dropdown({inputSettings, seriesOptions}) {
    const {
        question,
        required,
        answers,
        setAnswers
    } = inputSettings;

    return (
        <>
            <FormControl className="formDropdown" variant="filled">
            <InputLabel htmlFor="filled-age-native-simple">{question}</InputLabel>
            <Select
                native
                value={answers[question]}
                onChange={(event) => setAnswers({[question]: event.target.value})}
                label="Series"
            >
                {[...seriesOptions].map((series) => <option key={series || "null"} value={series}>{series || "null"}</option>)}
            </Select>
            </FormControl>
        </>
    );
};