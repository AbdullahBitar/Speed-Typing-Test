import React, { useState, useEffect } from 'react';
import './result.css';

const Result = (props) => {
    const {correct} = props;
    return (
        <div>
            <h1>YOUR WPM = {correct}</h1>
        </div>
    );
};

export default Result;