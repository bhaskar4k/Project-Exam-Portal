import { useState } from 'react';
import '../CSS for Components/SingleExamModal.css';
import QuestionShow from './QuestionShow';
import NotificationPopup from './NotificationPopup';
import Clock from './Clock';

const sessionEmail = localStorage.getItem('session_student_email');
function SingleExamModal(props) {
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


    let exam_id1 = "exam_id" + props.exam_id;
    let exam_id = props.exam_id;
    let exam_name = props.exam_name;
    let exam_duration = props.exam_duration;
    let exam_question_count = props.exam_question_count;
    let exam_duration_real_format = exam_duration[0] + exam_duration[1] + "hr " + exam_duration[3] +
        exam_duration[4] + "min " + exam_duration[6] + exam_duration[6] + "sec ";

    function convertTimeToSeconds(timeString) {
        const [hours, minutes, seconds] = timeString.split('-').map(Number);

        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return totalSeconds;
    }

    const examDurationInSeconds = convertTimeToSeconds(props.exam_duration);
    const [clock, setClock] = useState("");

    let buttonID = "questionButton" + props.exam_id;
    let questionListControllerID = "questionListControllerID" + props.exam_id;
    let examInfoNameID = "examInfoNameID" + props.exam_id;
    let examInfoDurationID = "examInfoDurationID" + props.exam_id;
    let examInfoQuestionCountID = "examInfoQuestionCountID" + props.exam_id;
    let examProtocolID = "examProtocolID" + props.exam_id;
    let submitButtonID = "submitButtonID" + props.exam_id;
    let examInfoContainer = "examInfoContainer" + props.exam_id;
    let examTimerID = "examTimerID" + props.exam_id;

    const [goFull, setGoFull] = useState(false);

    // control a single exam modal
    function controlShowExamModal() {
        if (document.getElementById(exam_id1).style.width === "320px") {
            for (let otherID = 1; otherID <= props.exam_count; otherID++) {
                let actual_other_id = "exam_id" + otherID;
                if (actual_other_id === exam_id1) continue;
                document.getElementById(actual_other_id).style.display = "none";
            }

            document.getElementById(exam_id1).style.width = "98%";
            document.getElementById(exam_id1).style.height = "auto";
            document.getElementById(examInfoNameID).style.fontSize = "24px";
            document.getElementById(examInfoDurationID).style.fontSize = "24px";
            document.getElementById(examInfoQuestionCountID).style.fontSize = "24px";
            document.getElementById(buttonID).innerText = "Close Exam";
            document.getElementById(buttonID).style.fontSize = "20px";
            document.getElementById(examProtocolID).style.display = "block";
        } else {
            setTimeout(function () {
                document.getElementById(exam_id1).style.width = "320px";
                document.getElementById(exam_id1).style.height = "auto";
                document.getElementById(buttonID).innerText = "Attend Exam";
                document.getElementById(questionListControllerID).style.display = "none";
                document.getElementById(examInfoNameID).style.fontSize = "18px";
                document.getElementById(examInfoDurationID).style.fontSize = "18px";
                document.getElementById(examInfoQuestionCountID).style.fontSize = "18px";
                document.getElementById(buttonID).style.fontSize = "16px";
                document.getElementById(examProtocolID).style.display = "none";
            }, 100);

            for (let otherID = 1; otherID <= props.exam_count; otherID++) {
                let actual_other_id = "exam_id" + otherID;
                if (actual_other_id === exam_id1) continue;
                setTimeout(function () {
                    document.getElementById(actual_other_id).style.display = "block";
                }, 200);
            }
        }
    }

    // For making it full screen
    function full() {
        let e = document.getElementById(exam_id1);
        if (!goFull) {
            e?.requestFullscreen();
            setGoFull(true);
        }
    }

    function startCountdown() {
        let count = examDurationInSeconds;

        const countdownInterval = setInterval(() => {
            console.log(count);
            count--;

            if (count < 0) {
                clearInterval(countdownInterval);
                console.log("Countdown completed!");
                submitExam();
            }
        }, 1000);
    }

    // Start exam
    function startExam() {
        document.getElementById(questionListControllerID).style.display = "block";
        document.getElementById(questionListControllerID).style.paddingTop = "220px";
        document.getElementById(examTimerID).style.display = "block";
        setClock(<Clock timeInSeconds={examDurationInSeconds} />);
        startCountdown();
        document.getElementById(examProtocolID).style.display = "none";
        document.getElementById(submitButtonID).style.display = "block";
        document.getElementById(buttonID).style.display = "none";
        document.getElementById(exam_id1).style.paddingTop = "30px";
        document.getElementById(exam_id1).style.paddingBottom = "100px";

        document.getElementById(examInfoNameID).style.fontSize = "35px";
        document.getElementById(examInfoNameID).style.fontWeight = "600";
        document.getElementById(examInfoDurationID).style.display = "none";
        document.getElementById(examInfoQuestionCountID).style.display = "none";

        document.getElementById(examInfoContainer).style.width = "800px";
        document.getElementById(examInfoContainer).style.height = "180px";
        document.getElementById(examInfoContainer).style.padding = "10px 0";
        document.getElementById(examInfoContainer).style.borderRadius = "30px";
        document.getElementById(examInfoContainer).style.left = "50%";
        document.getElementById(examInfoContainer).style.transform = "translateX(-50%)";
        document.getElementById(examInfoContainer).style.backgroundColor = "white";
        document.getElementById(examInfoContainer).style.position = "fixed";
        document.getElementById(examInfoContainer).style.zIndex = "100";

        document.getElementById(examInfoContainer).style.border = "3px solid rgb(209, 209, 209)";
        document.getElementById(examInfoContainer).style.boxShadow = "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px";
        full();
    }

    // Get question list 
    const questionListArray = parseQuestionList(props.exam_question_list);

    function parseQuestionList(questionList) {
        const questions = questionList.split("][");

        return questions.map((question) => {
            const parts = question.replace("[", "").replace("]", "").split("|");
            const questionText = parts[0];
            const options = parts.slice(1, 5);
            const answer = parts[5];

            return {
                question: questionText,
                options: options,
                answer: answer,
            };
        });
    }

    // Load all question one by one
    const [loadAllQuestions, setLoadAllQuestions] = useState("");
    const [loadSingleTime, setLoadSingleTime] = useState(true);

    if (loadSingleTime) loadAllQuestionList();

    function loadAllQuestionList() {
        setLoadSingleTime(false);
        var allQuestionList = [];
        for (let i = 0; i < questionListArray.length; i++) {
            allQuestionList.push(
                <QuestionShow
                    exam_id={exam_id}
                    question_number={i + 1}
                    question_description={questionListArray[i].question}
                    option1={questionListArray[i].options[0]}
                    option2={questionListArray[i].options[1]}
                    option3={questionListArray[i].options[2]}
                    option4={questionListArray[i].options[3]}
                    answer={questionListArray[i].answer}
                />
            );
        }
        setLoadAllQuestions(allQuestionList);
    }

    // Submit this exam
    function submitExam() {
        doSubmitExam();

        document.getElementById(questionListControllerID).style.display = "none";
        document.getElementById(questionListControllerID).style.paddingTop = "0px";
        document.getElementById(examTimerID).style.display = "none";
        setClock("");
        document.getElementById(examProtocolID).style.display = "block";
        document.getElementById(submitButtonID).style.display = "none";
        document.getElementById(buttonID).style.display = "block";
        document.getElementById(exam_id1).style.paddingTop = "10px";
        document.getElementById(exam_id1).style.paddingBottom = "10px";

        document.getElementById(examInfoNameID).style.fontSize = "24px";
        document.getElementById(examInfoDurationID).style.display = "block";
        document.getElementById(examInfoQuestionCountID).style.display = "block";
        document.getElementById(examInfoNameID).style.fontWeight = "500";

        document.getElementById(examInfoContainer).style.width = "auto";
        document.getElementById(examInfoContainer).style.height = "";
        document.getElementById(examInfoContainer).style.padding = "0";
        document.getElementById(examInfoContainer).style.borderRadius = "0px";
        document.getElementById(examInfoContainer).style.left = "0";
        document.getElementById(examInfoContainer).style.transform = "";
        document.getElementById(examInfoContainer).style.backgroundColor = "";
        document.getElementById(examInfoContainer).style.position = "";
        document.getElementById(examInfoContainer).style.zIndex = "";
        document.getElementById(examInfoContainer).style.border = "";
        document.getElementById(examInfoContainer).style.boxShadow = "";

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setGoFull(false);
    }

    function doSubmitExam() {
        let fullAnswerList = "|";
        for (let i = 1; i <= exam_question_count; i++) {
            let answerOptionID = exam_id + "question" + i;
            console.log(answerOptionID);
            var radioButtons = document.getElementsByName(answerOptionID);
            let curAnswer = "0";

            for (let j = 0; j < radioButtons.length; j++) {
                let option = j + 1;
                if (radioButtons[j].checked) {
                    curAnswer = option;
                    break;
                }
            }

            fullAnswerList += curAnswer + "|";
        }
        const allanswerList = {
            examID: exam_id,
            emailOfStudentWhoGivesExam: sessionEmail,
            answerList: fullAnswerList
        };

        console.log(allanswerList)

        submitThisExam(allanswerList);

        async function submitThisExam(allanswerList) {
            try {
                const response = await fetch('http://localhost:8080/submit_the_exam', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(allanswerList)
                });

                const wholeResponse = await response.text();

                let message = "", status = wholeResponse[0];
                for (let i = 2; i < wholeResponse.length; i++) {
                    message += wholeResponse[i];
                }

                if (status === "1") {
                    notify(status, message);
                } else {
                    notify(status, message);
                }
            } catch (error) {
                notify("0", "Internal server error");
            }
        }
    }

    return (
        <>
            <div className="singleExamModal" id={exam_id1} style={{ width: '320px', transition: '0.3s all ease-in-out', display: 'block', overflow: 'auto' }}>
                <div className="singleExamModalInfo">

                    <div id={examProtocolID} style={{ display: 'none' }}>
                        <ul className="examProtocol">
                            <li>You can't change current tab/undo the full screen.</li>
                            <li>On the top side you will have your timer going on and you have to submit within that time interval.</li>
                            <li>If you don't submit by your own then exam will be auto-submitted when the timer becomes 00:00:00</li>
                            <li style={{ paddingTop: '20px' }}>Best of luck</li>
                        </ul>
                        <button className="startExamButton" onClick={startExam}>Start Exam</button>
                    </div>

                    <div id={examInfoContainer} className="examInfoContainer">
                        <p id={examInfoNameID}>Exam name: {exam_name}</p>
                        <p id={examInfoDurationID}>Exam duration: {exam_duration_real_format}</p>
                        <p id={examInfoQuestionCountID}>Exam question count: {exam_question_count}</p>
                        <div id={examTimerID} style={{ display: 'none' }}>
                            {clock}
                        </div>

                    </div>

                    <div id={questionListControllerID} style={{ display: 'none', marginTop: '30px' }}>
                        {loadAllQuestions}
                    </div>
                </div>
                <button className="viewCloseExamButton" id={buttonID} style={{ display: 'block' }} onClick={controlShowExamModal}>Attend Exam</button>
                <button className="startExamButton submitExamButton" id={submitButtonID} style={{ display: 'none' }} onClick={submitExam}>Submit Exam</button>
            </div>
            {notificationPopup}
        </>
    );
}

export default SingleExamModal;