import { useState } from 'react';
import '../CSS for Components/QuestionShowForResult.css';

function QuestionShowForResult(props) {
    const [backgroundColorForOption1, setBackgroundColorForOption1] = useState("#fff7de");
    const [backgroundColorForOption2, setBackgroundColorForOption2] = useState("#fff7de");
    const [backgroundColorForOption3, setBackgroundColorForOption3] = useState("#fff7de");
    const [backgroundColorForOption4, setBackgroundColorForOption4] = useState("#fff7de");

    const [colorForOption1, setColorForOption1] = useState("black");
    const [colorForOption2, setColorForOption2] = useState("black");
    const [colorForOption3, setColorForOption3] = useState("black");
    const [colorForOption4, setColorForOption4] = useState("black");

    const [loader1, setLoader1] = useState(true);

    if (loader1) setColorForOption();
    function setColorForOption() {
        if (props.user_answer === "0") {
            return;
        }
        if (props.answer === props.user_answer) {
            if (props.answer === "1") {
                setBackgroundColorForOption1("#09b000");
                setColorForOption1("white");
            } else if (props.answer === "2") {
                setBackgroundColorForOption2("#09b000");
                setColorForOption2("white");
            } else if (props.answer === "3") {
                setBackgroundColorForOption3("#09b000");
                setColorForOption3("white");
            } else {
                setBackgroundColorForOption4("#09b000");
                setColorForOption4("white");
            }
        } else {
            if (props.answer === "1") {
                setBackgroundColorForOption1("#09b000");
                setColorForOption1("white");
                if (props.user_answer === "2") {
                    setBackgroundColorForOption2("red");
                    setColorForOption2("white");
                } else if (props.user_answer === "3") {
                    setBackgroundColorForOption3("red");
                    setColorForOption3("white");
                } else if (props.user_answer === "4") {
                    setBackgroundColorForOption4("red");
                    setColorForOption4("white");
                }
            } else if (props.answer === "2") {
                setBackgroundColorForOption2("#09b000");
                setColorForOption2("white");
                if (props.user_answer === "1") {
                    setBackgroundColorForOption1("red");
                    setColorForOption1("white");
                } else if (props.user_answer === "3") {
                    setBackgroundColorForOption3("red");
                    setColorForOption3("white");
                } else if (props.user_answer === "4") {
                    setBackgroundColorForOption4("red");
                    setColorForOption4("white");
                }
            } else if (props.answer === "3") {
                setBackgroundColorForOption3("#09b000");
                setColorForOption3("white");
                if (props.user_answer === "1") {
                    setBackgroundColorForOption1("red");
                    setColorForOption1("white");
                } else if (props.user_answer === "2") {
                    setBackgroundColorForOption2("red");
                    setColorForOption2("white");
                } else if (props.user_answer === "4") {
                    setBackgroundColorForOption4("red");
                    setColorForOption4("white");
                }
            } else {
                setBackgroundColorForOption4("#09b000");
                setColorForOption4("white");
                if (props.user_answer === "1") {
                    setBackgroundColorForOption1("red");
                    setColorForOption1("white");
                } else if (props.user_answer === "2") {
                    setBackgroundColorForOption2("red");
                    setColorForOption2("white");
                } else if (props.user_answer === "3") {
                    setBackgroundColorForOption3("red");
                    setColorForOption3("white");
                }
            }
        }
        setLoader1(false);
    }

    return (
        <>
            <div>
                <h5 className="question_name_show">Question No: {props.question_number} - {props.question_description}</h5>
                <h5 className="question_option" style={{ backgroundColor: backgroundColorForOption1, color: colorForOption1 }}>Option 1: {props.option1}</h5>
                <h5 className="question_option" style={{ backgroundColor: backgroundColorForOption2, color: colorForOption2 }}>Option 2: {props.option2}</h5>
                <h5 className="question_option" style={{ backgroundColor: backgroundColorForOption3, color: colorForOption3 }}>Option 3: {props.option3}</h5>
                <h5 className="question_option" id="question_option4" style={{ backgroundColor: backgroundColorForOption4, color: colorForOption4 }}>Option 4: {props.option4}</h5>
            </div>
        </>
    );
}

export default QuestionShowForResult;