import '../CSS for Components/AddExam.css';
import Question from './Question';
import React, { useState } from 'react';
import NotificationPopup from './NotificationPopup';

const sessionEmail = localStorage.getItem('session_admin_email');
function AddExam() {
    // State management for notification popup
    const [notificationPopup, setNotificationPopup] = useState("");

    function openNotificationPopup(status, message) {
        setNotificationPopup(<NotificationPopup status={status} message={message} />);
    }

    function notify(status, message) {
        openNotificationPopup(status, message);
        let timeoutId = setTimeout(() => {
            setNotificationPopup("");
            clearTimeout(timeoutId);
        }, 3000);
    }

    // Check sessionEmail and show error message if necessary
    const [checker, setChecker] = useState("NULL");
    if (checker === "NULL") checkIfLoggedIn();
    function checkIfLoggedIn() {
        if (sessionEmail === "" || sessionEmail === null) {
            openNotificationPopup("2", "Please login to access this section");
            setChecker("FALSE");
            let timeoutId = setTimeout(() => {
                setNotificationPopup("");
                clearTimeout(timeoutId);
                window.location.reload();
            }, 3000);
            return;
        }
    }

    // State management of question list
    const [questionlist, setQuestionlist] = useState([]);

    // Load All question list
    function getAllQuestionList() {
        let currentQuestionList = [];
        let countOfQuestion = document.getElementById("numberOfQuestion").value;

        for (let index = 1; index <= countOfQuestion; index++) {
            currentQuestionList.push(<Question index={`${index}`} />);
        }
        setQuestionlist(currentQuestionList);
    }

    // Get exam info
    function getExamnInfo() {
        let examName = document.getElementById("examName").value;
        let examDuration = document.getElementById("examDuration").value;
        let countOfQuestion = document.getElementById("numberOfQuestion").value;

        if (examName === "" || examName === null || examDuration === "" || examDuration === null || countOfQuestion === "" || countOfQuestion === null) {
            notify("2", "Please fillup exam name, duration and count of question");
            return;
        }

        var pattern = /^\d{2}-\d{2}-\d{2}$/;
        if (examDuration.length !== 8 || examDuration[2] !== '-' || examDuration[5] !== '-' || !pattern.test(examDuration)) {
            notify("2", "Please follow proper formatting of exam duration");
            return;
        }

        let questionString = "";
        for (let index = 1; index <= countOfQuestion; index++) {
            let questionID = index + "question";
            let option1ID = index + "option1";
            let option2ID = index + "option2";
            let option3ID = index + "option3";
            let option4ID = index + "option4";
            let correntAnswerID = index + "correntAnswer";

            let question = document.getElementById(questionID).value;
            let option1 = document.getElementById(option1ID).value;
            let option2 = document.getElementById(option2ID).value;
            let option3 = document.getElementById(option3ID).value;
            let option4 = document.getElementById(option4ID).value;
            let correctAnswer = document.getElementById(correntAnswerID).value;

            if (question === "" || question === null || option1 === "" || option1 === null || option2 === "" || option2 === null || option3 === "" || option3 === null || option4 === "" || option4 === null || correctAnswer === "" || correctAnswer === null) {
                notify("2", "Please fillup all field data of question no: " + index);
                return;
            }

            if (correctAnswer < 1 || correctAnswer > 4) {
                notify("2", "Correct answer should be in between 1 and 4 of question no: " + index);
                return;
            }

            questionString += "[" + question + "|" + option1 + "|" + option2 + "|" + option3 + "|" + option4 + "|" + correctAnswer + "]";
        }

        console.log(questionString);

        const examInfo = {
            examName: examName,
            examDuration: examDuration,
            examQuestionCount: countOfQuestion,
            examQuestionList: questionString,
            examSetterEmail: sessionEmail
        };

        setExam(examInfo);
    }

    // Set exam
    async function setExam(examInfo) {
        try {
            const response = await fetch('http://localhost:8080/set_exam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(examInfo)
            });

            const wholeResponse = await response.text();

            let message = "", status = wholeResponse[0];
            for (let i = 2; i < wholeResponse.length; i++) {
                message += wholeResponse[i];
            }

            notify(status, message);
        } catch (error) {
            notify("0", "Internal server error");
        }
    }

    return (
        <>

            <div className="addExamMainParent">
                <div className="addExamContainer">
                    <div className="addQuestionForm">
                        <h2>ADD EXAM</h2>
                        <input id="examName" className="normalInput" placeholder="Enter the name of exam"></input><br></br>
                        <input id="examDuration" className="normalInput" placeholder="Enter the duration of exam like this - [HH-MM-SS] [If Exam is 1 hour and 30 minutes then enter 01-30-00]"></input><br></br>
                        <input id="numberOfQuestion" className="normalInput" placeholder="Enter the number of questions"></input>
                        <button className="profileBtn" onClick={getAllQuestionList}><span>Get Question List</span><span>Get List</span></button>
                    </div>

                    <div className="questionList">
                        {questionlist}
                        <button className="profileBtn" onClick={getExamnInfo}><span>Set Exam</span><span>Do Set Exam</span></button>
                    </div>
                </div>
            </div>
            {notificationPopup}

        </>
    );
}

export default AddExam;