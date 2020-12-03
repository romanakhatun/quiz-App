import React, { useState, useEffect } from 'react';
import './Quiz.css'
import Hero from '../Home/Hero';
import { WebsiteName } from '../../App';
import Questionnaire from './Questionnaire';

const Quiz = () => {
    document.title = WebsiteName;

    const [ questions, setQuestions ] = useState([]);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ score, setScore ] = useState(0);
    const [ showAnswer, setShowAnswer ] = useState(false);

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&type=multiple')
            .then(res => res.json())
            .then(data => {
                // const questions = data.results.map(question => ({
                //     ...question,
                //     answers: [
                //         question.correct_answer,
                //         ...question.incorrect_answers,
                //     ].sort(() => Math.random - 0.5)
                // }));
                // setQuestions(questions);
                setQuestions(data.results)
            });
    }, []);

    const handleAnswer = (answer) => {
        if (!showAnswer) {
            if (answer === questions[ currentIndex ].correct_answer) {
                setScore(score + 1)
            }
        }
        setShowAnswer(true)
    }

    // Next Question
    const nextQuestion = () => {
        setCurrentIndex(currentIndex + 1)
        setShowAnswer(false);
    }

    return (
        <>
            <Hero title="Quiz" />
            <div className="quizWrapper">
                {questions.length > 0 ?
                    currentIndex >= questions.length ?
                        <p><strong>Game Ended !!! Your Score is:</strong> {score}</p> :
                        <Questionnaire data={questions[ currentIndex ]} handleAnswer={handleAnswer} showAnswer={showAnswer} nextQuestion={nextQuestion} /> :
                    <p className="text-center">Loading...</p>
                }
            </div>
        </>
    )
};

export default Quiz;