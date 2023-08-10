import '../CSS for Components/NotificationPopup.css';
import React, { useState, useEffect } from 'react';

function NotificationPopup(props) {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        let timeoutId = null;
        timeoutId = setTimeout(() => {
            setOpacity(1);
            clearTimeout(timeoutId);
        }, 300);

    });

    let backgroundColor;
    if (props.status === "1") {
        backgroundColor = "rgb(15, 179, 0)";
    } else if (props.status === "0") {
        backgroundColor = "red";
    } else {
        backgroundColor = "rgb(255, 98, 8)";
    }

    return (
        <div>
            <div id="popupModal" style={{ backgroundColor, opacity }}>
                <div className="popupParentContainer">
                    <p id="popUpData">{props.message}</p>
                </div>
            </div>
        </div>
    );
}

export default NotificationPopup;