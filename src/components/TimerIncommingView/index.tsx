import React from 'react';

// Hooks
import { useState, useEffect } from "react";

// Context custom hook
import { useDataContext } from '../../context/IncommingOrderContext';

// Styles
import './style.css'

export const TimerIncommingView = () => {

    // Bring data using context
    const { setIsIncommingOrder } = useDataContext();

    // State variables
    const [mins, setMinutes] = useState(0);
    const [secs, setSeconds] = useState(10);

    // useEffect to manage the interval API to create a timer
    useEffect(() => {

        let sampleInterval = setInterval(() => {
            if (secs > 0) {
                setSeconds(secs - 1);
            }
            if (secs === 0) {
                if (mins === 0) {
                    setIsIncommingOrder(false)
                    clearInterval(sampleInterval);
                } else {
                    setMinutes(mins - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            clearInterval(sampleInterval);
        };
    })

    return (
        <div className='TimerIncommingView'>
            <p>
                Declined in {"0"}
                {mins}:{secs < 10 ? `0${secs}` : secs}
            </p>
        </div>
    );
}

export default TimerIncommingView;
