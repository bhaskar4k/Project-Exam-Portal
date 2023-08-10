import '../CSS for Components/Question.css';

function Question(props) {
    let questionID = props.index + "question";
    let option1 = props.index + "option1";
    let option2 = props.index + "option2";
    let option3 = props.index + "option3";
    let option4 = props.index + "option4";
    let correntAnswer = props.index + "correntAnswer";
    return (
        <>
            <div className="aQuestion">
                <p className="questionNumber">Question no: {props.index}</p>
                <textarea className="normalInput questionWrite" type="text" id={questionID} placeholder="Set question"></textarea>
                <input className="normalInput" type="text" id={option1} placeholder="Set option 1"></input>
                <input className="normalInput" type="text" id={option2} placeholder="Set option 2"></input>
                <input className="normalInput" type="text" id={option3} placeholder="Set option 3"></input>
                <input className="normalInput" type="text" id={option4} placeholder="Set option 4"></input>
                <input className="normalInput" type="text" id={correntAnswer} placeholder="Set correct answer [ Write option number like 1/2/3/4 ]"></input>
            </div>
        </>
    );
}

export default Question;