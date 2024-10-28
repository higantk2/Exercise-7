import React, { useState, useEffect } from "react";
import "./App.css";

const questions = [
    {
        question: "What color do you get when you mix red and yellow?",
        choices: ["Green", "Orange", "Purple", "Blue"],
        correctAnswer: 1
    },
    {
        question: "What color do you get when you mix blue and yellow?",
        choices: ["Green", "Purple", "Red", "Orange"],
        correctAnswer: 0
    },
    {
        question: "What color is made by mixing red and blue?",
        choices: ["Pink", "Purple", "Orange", "Green"],
        correctAnswer: 1
    },
    {
        question: "What color do you get when you mix white and black?",
        choices: ["Gray", "Blue", "Brown", "Purple"],
        correctAnswer: 0
    }
];

function App() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isQuizOver, setIsQuizOver] = useState(false);

    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion(false);
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleNextQuestion = (isCorrect) => {
        if (isCorrect) setScore(score + 1);

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(10);
        } else {
            setIsQuizOver(true);
        }
    };

    const handleAnswer = (index) => {
        const isCorrect = index === questions[currentQuestionIndex].correctAnswer;
        handleNextQuestion(isCorrect);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(10);
        setIsQuizOver(false);
    };

    return (
        <div className="App">
            <div className="quiz-container">
                {isQuizOver ? (
                    <div className="result-section">
                        <h2>Quiz Over!</h2>
                        <p>Your score: {score} / {questions.length}</p>
                        <button onClick={restartQuiz} className="button">Retake Quiz</button>
                    </div>
                ) : (
                    <>
                        <h2 className="question">{questions[currentQuestionIndex].question}</h2>
                        <ul className="choices">
                            {questions[currentQuestionIndex].choices.map((choice, index) => (
                                <li key={index} onClick={() => handleAnswer(index)} className="choice">
                                    {choice}
                                </li>
                            ))}
                        </ul>
                        <div className="timer">Time Left: {timeLeft} seconds</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;