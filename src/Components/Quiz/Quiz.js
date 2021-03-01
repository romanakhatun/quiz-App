import React, { useState, useEffect } from 'react';
import { WebsiteName } from '../../App';
import { Link } from 'react-router-dom';
import './Quiz.css';
import Hero from '../Home/Hero';
import Questionnaire from './Questionnaire';
import Auth from '../Auth/useAuth';

const Quiz = () => {
    document.title = WebsiteName;
    const auth = Auth();

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&type=multiple')
            .then(res => res.json())
            .then(data => { setQuestions(data.results) });
    }, []);

    const handleAnswer = (answer) => {
        if (!showAnswer) {
            if (answer === questions[currentIndex].correct_answer) {
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
            <Hero title="Let's Start Quiz 🙋" />
            <div className="quizWrapper">
                {
                    auth.user ?
                        <div>
                            {questions.length > 0 ?
                                currentIndex >= questions.length ? (
                                    <div>
                                        <p><strong>Game Ended !!! Your Score is:</strong> {score}</p>
                                        <button className="btn"><a href="/quiz">Restart Quiz</a></button>
                                    </div>
                                ) : (<Questionnaire data={questions[currentIndex]} handleAnswer={handleAnswer} showAnswer={showAnswer} nextQuestion={nextQuestion} />
                                    ) : (<p className="text-center">Loading...</p>)
                            }
                        </div> :
                        <div>
                            <p>You need to first <span className="text-red"><Link to="/entry">Register/login</Link> </span> </p>
                            <p>Then Start Quiz</p>
                        </div>
                }
            </div>
        </>
    )
};

export default Quiz;