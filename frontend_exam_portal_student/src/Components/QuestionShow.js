import '../CSS for Components/QuestionShow.css';

function QuestionShow(props) {
    let optionID = props.exam_id + "question" + props.question_number;

    function uncheckRadio() {
        var radioButtons = document.getElementsByName(optionID);

        for (var i = 0; i < radioButtons.length; i++) {
            radioButtons[i].checked = false;
        }
    }

    return (
        <>
            <div>
                <div className="oneQuestion">
                    <h5 className="question_name_show">Q{props.question_number} : {props.question_description}</h5>
                    <div className="question_option">
                        <input className="optionInput" type="radio" id={props.option1} name={optionID} value={props.option1}></input>
                        <label className="optionLabel" htmlFor={props.option1}>{props.option1}</label><br></br>

                        <input className="optionInput" type="radio" id={props.option2} name={optionID} value={props.option2}></input>
                        <label className="optionLabel" htmlFor={props.option2}>{props.option2}</label><br></br>

                        <input className="optionInput" type="radio" id={props.option3} name={optionID} value={props.option3}></input>
                        <label className="optionLabel" htmlFor={props.option3}>{props.option3}</label><br></br>

                        <input className="optionInput" type="radio" id={props.option4} name={optionID} value={props.option4}></input>
                        <label className="optionLabel" htmlFor={props.option4}>{props.option4}</label><br></br>
                    </div>
                    <button className="optionUncheck" onClick={uncheckRadio}>Clear Selection</button>
                </div>
            </div>
        </>
    );
}

export default QuestionShow;