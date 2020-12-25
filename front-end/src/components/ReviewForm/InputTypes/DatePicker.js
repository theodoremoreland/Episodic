// React
import React from 'react';

// Material UI
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';

// Other third party
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

// Custom utils
import { toPartialISOString } from '../DateFormatters';
import { isNotCurrentOrPreviousSaturday } from '../DateFilters';

export default function DatePickerWrapper(props) {
    const { date, setDate, answers, setAnswers } = props;
    const hoverText = "";

    const handleDateChange = (date) => {
        const weekEnding = toPartialISOString(date);
        setDate(date);
        setAnswers({...answers, "Week Ending": weekEnding});
    };

    return (
        <>
            <Tooltip className="hoverText" title={hoverText} width={"600px"} arrow>
                <Typography id="weekEndingLabel" className="questions" variant="h5" color="primary">
                    Week Ending
                </Typography>
            </Tooltip>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    inputVariant="standard"
                    format="MM-dd-yyyy"
                    margin="normal"
                    id="weekEndingDatePicker"
                    shouldDisableDate={isNotCurrentOrPreviousSaturday}
                    required={true}
                    value={date}
                    onChange={(selectedDate) => handleDateChange(selectedDate)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        </>
    );
}