import '../CSS for Components/Welcome.css';
import NotificationPopup from './NotificationPopup';
import React, { useState } from 'react';

let notificationPopup = null, APIstatus = null, notificationMessage = null;
let count = 1;
let sessionEmail = localStorage.getItem('session_admin_email');
function Welcome() {
    // State management for notification popup
    const [notificationPopupStatus, setNotificationPopupStatus] = useState(false);

    let loggedinAdminName = localStorage.getItem('session_admin_name');
    if (loggedinAdminName && count === 1) {
        openNotificationPopup();
    }

    function openNotificationPopup() {
        if (notificationPopupStatus) return;
        setNotificationPopupStatus(true);
        APIstatus = "1";
        notificationMessage = "Welcome [ " + loggedinAdminName + " ]";
    }

    if (notificationPopupStatus) {
        notificationPopup = <NotificationPopup status={APIstatus} message={notificationMessage} />;
        let timeoutId = setTimeout(() => {
            setNotificationPopupStatus(false);
            notificationPopup = null;
            APIstatus = null;
            notificationMessage = null;
            count = 0;
            clearTimeout(timeoutId);
        }, 3000);
    }

    // State management for notification popup
    const [notificationPopup1, setNotificationPopup1] = useState("");

    function openNotificationPopup1(status, message) {
        setNotificationPopup1(<NotificationPopup status={status} message={message} />);
    }

    function notify(status, message) {
        let timeoutId1 = setTimeout(() => {
            openNotificationPopup1(status, message);
            let timeoutId = setTimeout(() => {
                setNotificationPopup1("");
                clearTimeout(timeoutId);
            }, 3000);
            clearTimeout(timeoutId1);
        }, 3000);

    }

    // Fetching admin's whole data from database
    const [admin_exam_exam_info, set_admin_exam_exam_info] = useState({
        adminCount: 0,
        studentCount: 0,
        scheduledExamCount: 0
    });

    const getAdminStudentExamDataFromDB = async () => {
        try {
            const response = await fetch('http://localhost:8080/get_admin_student_exam_count_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: sessionEmail
            });

            const jsonResponse = await response.json();
            console.log(jsonResponse)
            set_admin_exam_exam_info(jsonResponse);
        } catch (error) {
            notify("0", "Internal server error in fetching admin, student and exam count");
        }
        setLoadSingleTime(false);
    };

    // Get data from DB
    const [loadSingleTime, setLoadSingleTime] = useState(true);
    if (loadSingleTime) getAdminStudentExamDataFromDB();

    return (
        <>
            <div className="parentContainer">
                <div className="adminCount childContainer">
                    <i className="fa fa-user-secret fa-4x" aria-hidden="true"></i>
                    <div className="childContainerInfo">
                        <p>Total Admin</p>
                        <p>{admin_exam_exam_info.adminCount}</p>
                    </div>
                </div>
                <div className="studentCount childContainer">
                    <i className="fa fa-user fa-4x" aria-hidden="true"></i>
                    <div className="childContainerInfo">
                        <p>Total Students</p>
                        <p>{admin_exam_exam_info.studentCount}</p>
                    </div>
                </div>
                <div className="upcomingExamCount childContainer">
                    <i className="fa fa-list fa-4x" aria-hidden="true"></i>
                    <div className="childContainerInfo">
                        <p>Total Scheduled Exam</p>
                        <p>{admin_exam_exam_info.scheduledExamCount}</p>
                    </div>
                </div>
                <div className="completedExamCount childContainer">
                    <i className="fa fa-check-square fa-4x" aria-hidden="true"></i>
                    <div className="childContainerInfo">
                        <p>Total Completed Exam</p>
                        <p>{admin_exam_exam_info.completedExamCount}</p>
                    </div>
                </div>
            </div>

            {notificationPopup}
            {notificationPopup1}
        </>
    );
}

export default Welcome;