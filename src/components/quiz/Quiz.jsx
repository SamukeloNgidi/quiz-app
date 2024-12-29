import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data.jsx';

const Quiz = () => {

    let [index, setIndex] = useState(0); //0 = first question
    let [question, setQuestion] = useState(data[index]); //first array will be loaded to questions
    let [lock, setLock] = useState(false); //lock the answer after selecting
    let [score, setScore] = useState(0); //score of the user
    let [result, setResult] = useState(false); //show the result after the last question

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let option_array = [option1, option2, option3, option4];

    const checkAnswer = (e, answer) => {
        if (lock === false) {
            //check if the answer is correct
            if (question.ans === answer) {
                e.target.classList.add('correct');
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add('wrong');
                setLock(true);
                //highlight the correct answer
                option_array[question.ans - 1].current.classList.add('correct');
            }
        }
    }

    const next = () => {
        if (lock === true) { //an option is selected
            if (index === data.length - 1) { //last question
                setResult(true);
                return 0; //do not execute the remaining statements
            }

            setIndex(++index);
            setQuestion(data[index]);
            setLock(false); //allow to select the answer
            option_array.map((option) => { //remove the highlight of the options when next button is clicked
                option.current.classList.remove('wrong');
                option.current.classList.remove('correct');
                return null;
            });
        }
    }

    const resetQuiz = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
        /*option_array.map((option) => {
            option.current.classList.remove('wrong');
            option.current.classList.remove('correct');
            return null;
        });*/
    }

    return (
        <div className='container'>
            <h2>React Quiz App</h2>
            <hr />
            {result ? <></> : <>
                <h3>{index + 1}. {question.question}</h3>
                <ul>
                    <li ref={option1} onClick={(e) => { checkAnswer(e, 1) }}>{question.option1}</li>
                    <li ref={option2} onClick={(e) => { checkAnswer(e, 2) }}>{question.option2}</li>
                    <li ref={option3} onClick={(e) => { checkAnswer(e, 3) }}>{question.option3}</li>
                    <li ref={option4} onClick={(e) => { checkAnswer(e, 4) }}>{question.option4}</li>
                </ul>
                <button onClick={next}>Next</button>
                <div className="index">{index + 1} of {data.length} questions</div>
            </>}

            {result ? <>
                <h3>Your score is {score} out of {data.length}</h3>
                <button onClick={resetQuiz}>Reset</button>
            </> : <></>}

            <br />
            <hr className='short-line'/>
            <div className="footer">
                © 2024 Samukelo Ngidi. All rights reserved.
            </div>
            
        </div>
    )
}

export default Quiz