// React
import React from 'react';

// Material UI
import Skeleton from '@material-ui/lab/Skeleton';


export default function SubmissionFormLoadingScreen() {
    return (
        <>
        { Array.from(new Array(5)).map((arr, index) =>
            <div key={`skeleton-container${index}`}>
                <Skeleton variant="text" height={25} width={"20%"}/>
                <Skeleton id="input" variant="rect" height={80}/>
            </div>
            )
        }
        <Skeleton key={`button-skeleton`} height={60} width={"30%"}/>
        </>
    );
};