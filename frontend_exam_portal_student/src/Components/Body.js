import '../CSS for Components/Body.css';
import Profile from './Profile';
import Welcome from './Welcome';
import ViewResult from './ViewResult';
import ScheduledExam from './ScheduledExam';
import SignUp from './SignUp';
import React, { useState, useEffect } from 'react';

function Body() {
    // Controlling the component that has to be loaded on the right side of body
    const [loadRightSection, setLoadRightSection] = useState("welcome");

    function doLoadAdminProfile() {
        setLoadRightSection("profile");
    }

    function doLoadViewResult() {
        setLoadRightSection("viewResult");
    }

    function doLoadDashboard() {
        setLoadRightSection("welcome");
    }

    function doLoadScheduledExam() {
        setLoadRightSection("scheduledExam");
    }

    function doLoadSignUp() {
        setLoadRightSection("signUp");
    }

    let rightSectionRenderer;

    if (loadRightSection === "welcome") {
        rightSectionRenderer = <Welcome />
    } else if (loadRightSection === "profile") {
        rightSectionRenderer = <Profile />
    } else if (loadRightSection === "viewResult") {
        rightSectionRenderer = <ViewResult />
    } else if (loadRightSection === "scheduledExam") {
        rightSectionRenderer = <ScheduledExam />
    } else if (loadRightSection === "signUp") {
        rightSectionRenderer = <SignUp />
    }

    // Controlling session management after admin login
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Changing button from signup/login to logout and vice-versa
    useEffect(() => {
        const sessionData = localStorage.getItem('session_student_email');
        console.log(sessionData)
        if (sessionData) {
            setIsLoggedIn(true);
        }
    }, []);

    if (isLoggedIn) {
        document.getElementById("loginSignUpButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "block";
    }

    function doLogout() {
        localStorage.removeItem('session_student_email');
        localStorage.removeItem('session_student_name');
        setIsLoggedIn(false);
        window.location.reload();
    }

    let leftSideContainerParentID = "leftSideContainerParentID";
    let leftSideContainerChildID1 = "leftSideContainerChildID1";
    let leftSideContainerChildID2 = "leftSideContainerChildID2";

    let rightSideContainerParentID = "rightSideContainerParentID";

    return (
        <div>
            <div className="allMenuParent">
                <div className="allMenuLeftSideContainer" id={leftSideContainerParentID} style={{ width: '20%' }}>
                    <div id={leftSideContainerChildID1} style={{ display: 'block' }}>
                        <p className="allMenuLeftSideContainerButton" onClick={doLoadDashboard}>Dashboard</p>
                        <p className="allMenuLeftSideContainerButton" onClick={doLoadAdminProfile}>Student Profile</p>
                        <p className="allMenuLeftSideContainerButton" onClick={doLoadViewResult}>View Result</p>
                        <p className="allMenuLeftSideContainerButton" onClick={doLoadScheduledExam}>Scheduled Exam</p>
                    </div>

                    <div id={leftSideContainerChildID2} style={{ display: 'block' }}>
                        <p id="loginSignUpButton" className="allMenuLeftSideContainerButton" onClick={doLoadSignUp} style={{ display: 'block' }}>LOGIN/SIGNUP</p>
                        <p id="logoutButton" className="allMenuLeftSideContainerButton" onClick={doLogout} style={{ display: 'none' }}>LOGOUT</p>
                    </div>
                </div>

                <div className="allMenuRightSideContainer" id={rightSideContainerParentID} style={{ width: '70%', marginLeft: '60px' }}>
                    {rightSectionRenderer}
                </div>
            </div>
        </div>
    );
}

export default Body;