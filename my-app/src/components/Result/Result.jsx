import React, { useState, useEffect } from 'react';
import './result.css';


const Result = (props) => {
    const {correct} = props;

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div>
            <h1>Words Per Minute = {correct}</h1>
            <button onClick={handleRefresh}>Try again</button>            
        </div>
    );
};

export default Result;