import React, { useState, useEffect } from 'react';
import '../CSS for Components/Clock.css';

function Clock(props) {
    let timeInSeconds = props.timeInSeconds;
    const [time, setTime] = useState(timeInSeconds);
    const [showtime, setShowTime] = useState(convertSecondsToTime(timeInSeconds));

    const [backgroundColor, setBackgroundColor] = useState("green");
    let firstColorChangingInterval = timeInSeconds - (timeInSeconds / 4);
    let secondColorChangingInterval = timeInSeconds - (2 * (timeInSeconds / 4));
    let thirdColorChangingInterval = timeInSeconds - (3 * (timeInSeconds / 4));

    useEffect(() => {
        const intervalId = setInterval(() => {
            let curTime = time - 1;

            if (curTime >= firstColorChangingInterval) {
                setBackgroundColor("green");
            } else if (curTime >= secondColorChangingInterval) {
                setBackgroundColor("orange");
            } else if (curTime >= thirdColorChangingInterval) {
                setBackgroundColor("orangered");
            } else {
                setBackgroundColor("red");
            }

            if (curTime >= 0) {
                setTime(curTime);
                setShowTime(convertSecondsToTime(curTime));
            } else {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    });

    function convertSecondsToTime(timeInSeconds) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
        return formattedTime;
    }

    function padZero(number) {
        return number.toString().padStart(2, '0');
    }

    return (
        <div>
            <div className="curTimer" style={{ backgroundColor, transition: '0.3s all ease-in-out' }}>{showtime}</div>
        </div>
    );
}

export default Clock;
