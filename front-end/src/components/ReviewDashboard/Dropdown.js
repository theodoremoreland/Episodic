// React
import React from 'react';

// Material UI
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function Dropdown({series, selectedSeries, setSelectedSeries}) {
    return (
        <>
            <Tooltip className="hoverText" title={""} width={"600px"} arrow>
                <Typography style={{"marginTop": "5px"}} id="dropdownTitle" variant="h5">
                    Change Series
                </Typography>
            </Tooltip>
            <FormControl className="dashboardDropdown" variant="filled">
            <Select
                native
                value={selectedSeries}
                onChange={(event) => setSelectedSeries(event.target.value)}
            >
                {series.map((series) => <option key={series} value={series}>{series}</option>)}
            </Select>
            </FormControl>
        </>
    );
};