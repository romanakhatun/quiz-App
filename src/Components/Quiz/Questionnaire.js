import React from 'react';
import './Quiz.css';

const Questionnaire = ({ handleAnswer, showAnswer, nextQuestion, data: { question, correct_answer, answers, incorrect_answers } }) => {

    const shuffledAnswer = [correct_answer, ...incorrect_answers].sort(() => Math.random - 0.5);

    return (
        <>
            <h4 className="question"> <span className="text-danger">Question:  </span><span dangerouslySetInnerHTML={{ __html: question }} /></h4>

            <div className="grid-container">
                {shuffledAnswer.map((answer, idx) => {
                    const textColor = showAnswer ? answer === correct_answer ? 'text-green' : 'text-red' : 'text-black';
                    return (<button id="quizOption" key={idx} className={`${textColor}`} onClick={() => handleAnswer(answer)} dangerouslySetInnerHTML={{ __html: answer }} />
                    )
                })}.
                {showAnswer && <button className="btn" onClick={nextQuestion}>Next Question</button>}
            </div>
        </>
    );
};



export default Questionnaire;