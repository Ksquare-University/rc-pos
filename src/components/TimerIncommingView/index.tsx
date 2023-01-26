import React from 'react';
import { useState, useEffect } from "react";
import './style.css'

export const TimerIncommingView = () => {
    const [mins, setMinutes] = useState(0);
    const [secs, setSeconds] = useState(10);

    useEffect(() => {
        let sampleInterval = setInterval(() => {
            if (secs > 0) {
                setSeconds(secs - 1);
            }
            if (secs === 0) {
                if (mins === 0) {
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
