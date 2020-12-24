// React
import React from 'react';

// Material UI
import Skeleton from '@material-ui/lab/Skeleton';


export default function LoadingScreen() {
    return (
        <>
        { Array.from(new Array(4)).map((arr, index) =>
            <div key={`skeleton-container${index}`}>
                <Skeleton variant="text" height={45} width={"20%"}/>
                <Skeleton variant="text" height={75} width={"100%"}/>
                <Skeleton variant="text" height={75} width={"100%"}/>
                <Skeleton variant="text" height={75} width={"100%"}/>
                <Skeleton variant="text" height={75} width={"100%"}/>
            </div>
            )
        }
        <Skeleton height={60} width={"30%"}/>
        </>
    );
};