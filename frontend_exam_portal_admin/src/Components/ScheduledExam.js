import '../CSS for Components/ScheduledExam.css';
import SingleExamModal from './SingleExamModal';
import NotificationPopup from './NotificationPopup';
import React, { useState } from 'react';

const sessionEmail = localStorage.getItem('session_admin_email');

function ScheduledExam() {
    // State management for notification popup
    const [notificationPopup, setNotificationPopup] = useState("");

    function openNotificationPopup(status, message) {
        setNotificationPopup(<NotificationPopup status={status} message={message} />);
    }

    // Show popup
    function notify(status, message) {
        openNotificationPopup(status, message);
        let timeoutId = setTimeout(() => {
            setNotificationPopup("");
            clearTimeout(timeoutId);
        }, 3000);
    }

    // Check sessionEmail and show error message if necessary
    const [checker, setChecker] = useState(true);
    const [checker1, setChecker1] = useState(true);

    if (checker === true) checkForLoggedIn();

    function checkForLoggedIn() {
        if (sessionEmail === "" || sessionEmail === null) {
            console.log("CALL ASCHE")
            openNotificationPopup("2", "Please login to access this section");
            setChecker(false);
            let timeoutId = setTimeout(() => {
                setNotificationPopup("");
                clearTimeout(timeoutId);
                window.location.reload();
            }, 3000);
            return;
        }
        if (checker1 === true) getAllScheduledExamInfo();
    }


    const [allExamComponents, setAllExamComponents] = useState([]);
    async function getAllScheduledExamInfo() {
        try {
            const response = await fetch('http://localhost:8080/get_all_scheduled_exam_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: sessionEmail
            });

            const jsonResponse = await response.json();
            var allExamInfo = [];

            let j = 1;
            jsonResponse.forEach(obj => {
                // Access the properties of each object
                //const examID = obj.examID;
                const examID = j;
                const examName = obj.examName;
                const examDuration = obj.examDuration;
                const examQuestionCount = obj.examQuestionCount;
                const examQuestionList = obj.examQuestionList;
                const examSetterEmail = obj.examSetterEmail;

                allExamInfo.push(
                    <SingleExamModal
                        exam_id={examID}
                        exam_name={examName}
                        exam_duration={examDuration}
                        exam_question_count={examQuestionCount}
                        exam_question_list={examQuestionList}
                        exam_setter_email={examSetterEmail}
                        exam_count={jsonResponse.length}
                    />
                );
                j++;
            });

            setAllExamComponents(allExamInfo);
            setChecker1(false);
        } catch (error) {
            notify("0", "Internal server error");
            setChecker1(false);
        }
    }

    return (
        <>

            <div className="allScheduledExamParent" id="allScheduledExamParent">
                <h1 className="headlineOfScheduledExam">Scheduled Exam</h1>
                <div className="allScheduledExam">
                    {allExamComponents}
                </div>
            </div>
            {notificationPopup}

        </>
    );
}

export default ScheduledExam;