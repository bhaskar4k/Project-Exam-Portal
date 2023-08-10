import { useState } from 'react';
import '../CSS for Components/SingleExamModalForResult.css';
import QuestionShowForResult from './QuestionShowForResult';

const sessionName = localStorage.getItem('session_admin_name');

function SingleExamModal(props) {
    let exam_id = props.exam_id;
    let exam_name = props.exam_name;
    let exam_duration = props.exam_duration;
    let exam_question_count = props.exam_question_count;
    let exam_duration_real_format = exam_duration[0] + exam_duration[1] + "hr " + exam_duration[3] +
        exam_duration[4] + "min " + exam_duration[6] + exam_duration[6] + "sec ";

    let buttonID = "questionButton" + props.exam_id;
    let questionListControllerID = "questionListControllerID" + props.exam_id;
    let examInfoNameID = "examInfoNameID" + props.exam_id;
    let examInfoDurationID = "examInfoDurationID" + props.exam_id;
    let examInfoQuestionCountID = "examInfoQuestionCountID" + props.exam_id;
    let correntAnswerCountID = "correntAnswerCountID" + props.exam_id;
    let examPercentageID = "examPercentageID" + props.exam_id;
    let attendantID = "attendantID" + props.exam_id;
    let examInfoSetterID = "examInfoSetterID" + props.exam_id;

    // Open a single exam info
    function controlShowExamModal() {
        if (document.getElementById(exam_id).style.width === "400px") {
            for (let otherID = 1; otherID <= props.exam_count; otherID++) {
                if (otherID === exam_id) continue;
                document.getElementById(otherID).style.display = "none";
            }

            document.getElementById(exam_id).style.width = "98%";
            document.getElementById(exam_id).style.height = "auto";
            document.getElementById(buttonID).innerText = "Close Result";
            document.getElementById(questionListControllerID).style.display = "block";
            document.getElementById(examInfoNameID).style.fontSize = "24px";
            document.getElementById(examInfoDurationID).style.fontSize = "24px";
            document.getElementById(examInfoQuestionCountID).style.fontSize = "24px";
            document.getElementById(correntAnswerCountID).style.fontSize = "24px";
            document.getElementById(examPercentageID).style.fontSize = "24px";
            document.getElementById(attendantID).style.fontSize = "24px";
            document.getElementById(examInfoSetterID).style.fontSize = "24px";
        } else {
            setTimeout(function () {
                document.getElementById(exam_id).style.width = "400px";
                document.getElementById(exam_id).style.height = "auto";
                document.getElementById(buttonID).innerText = "View Result";
                document.getElementById(questionListControllerID).style.display = "none";
                document.getElementById(examInfoNameID).style.fontSize = "18px";
                document.getElementById(examInfoDurationID).style.fontSize = "18px";
                document.getElementById(examInfoQuestionCountID).style.fontSize = "18px";
                document.getElementById(correntAnswerCountID).style.fontSize = "18px";
                document.getElementById(examPercentageID).style.fontSize = "18px";
                document.getElementById(attendantID).style.fontSize = "18px";
                document.getElementById(examInfoSetterID).style.fontSize = "18px";
            }, 100);

            for (let otherID = 1; otherID <= props.exam_count; otherID++) {
                if (otherID === exam_id) continue;
                setTimeout(function () {
                    document.getElementById(otherID).style.display = "block";
                }, 200);
            }
        }
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
    let full_answer_list = props.answer_list;

    const [loadAllQuestions, setLoadAllQuestions] = useState("");
    const [loadSingleTime, setLoadSingleTime] = useState(true);
    const [correct_answer_count, set_correct_answer_count] = useState(0);
    const [percentage, set_percentage] = useState(0);

    if (loadSingleTime) loadAllQuestionList();

    function loadAllQuestionList() {
        setLoadSingleTime(false);
        var allQuestionList = [];
        let j = 1, count = 0;
        for (let i = 0; i < questionListArray.length; i++) {
            allQuestionList.push(
                <QuestionShowForResult
                    question_number={i + 1}
                    question_description={questionListArray[i].question}
                    option1={questionListArray[i].options[0]}
                    option2={questionListArray[i].options[1]}
                    option3={questionListArray[i].options[2]}
                    option4={questionListArray[i].options[3]}
                    answer={questionListArray[i].answer}
                    user_answer={full_answer_list[j]}
                />
            );
            if (questionListArray[i].answer === full_answer_list[j]) {
                count++;
            }
            j += 2;
        }

        set_percentage((count / questionListArray.length) * 100);
        set_correct_answer_count(count);
        setLoadAllQuestions(allQuestionList);
    }

    return (
        <>
            <div className="singleExamModal" id={exam_id} style={{ width: '400px', transition: '0.3s all ease-in-out', display: 'block' }}>
                <div className="singleExamModalInfo">
                    <p id={examInfoNameID}>Exam name: {exam_name}</p>
                    <p id={examInfoDurationID}>Exam duration: {exam_duration_real_format}</p>
                    <p id={examInfoQuestionCountID}>Exam question count: {exam_question_count}</p>
                    <p id={examInfoSetterID}>Exam setter: {sessionName}</p>
                    <p id={attendantID}>Attendant email: {props.emailOfStudentWhoGivesExam}</p>
                    <p id={correntAnswerCountID}>Correct answer: {correct_answer_count}</p>
                    <p id={examPercentageID}>Percentage: {percentage}%</p>

                    <div id={questionListControllerID} style={{ display: 'none', marginTop: '30px' }}>
                        {loadAllQuestions}
                    </div>
                </div>
                <button className="viewCloseExamButton" id={buttonID} onClick={controlShowExamModal}>View Result</button>
            </div>
        </>
    );
}

export default SingleExamModal;