// React
import React from 'react';

// Material UI
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


export default function AlertWrapper(props) {
    const {
        alertMessageObj,
        alertIsActive,
        setAlertIsActive,
    } = props;

    const deactivateAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertIsActive(false);
    };
    
    return (
        <>
            <Snackbar open={alertIsActive} autoHideDuration={alertMessageObj.duration} onClose={deactivateAlert}>
                <MuiAlert elevation={6} variant="filled" transition={null} onClose={deactivateAlert} severity={alertMessageObj.severity}>
                    {alertMessageObj.text}
                </MuiAlert>
            </Snackbar>
        </>
    );
};