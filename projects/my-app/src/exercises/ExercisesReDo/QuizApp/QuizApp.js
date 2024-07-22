import { useReducer, useEffect } from "react";
const questions = [
    {
      id: 1,
      text: "Which database is used in the MERN stack?",
      options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
      correctAnswer: "MongoDB",
    },
    {
      id: 2,
      text: "Which framework is used to build the front end in the MERN stack?",
      options: ["Angular", "Vue", "React", "Svelte"],
      correctAnswer: "React",
    },
    {
      id: 3,
      text: "Which library is used for building user interfaces in the MERN stack?",
      options: ["Vue", "Angular", "React", "Ember"],
      correctAnswer: "React",
    },
    {
      id: 4,
      text: "Which framework is used for backend development in the MERN stack?",
      options: ["Django", "Express", "Laravel", "Spring"],
      correctAnswer: "Express",
    },
    {
      id: 5,
      text: "Node.js is built on which JavaScript engine?",
      options: ["V8", "SpiderMonkey", "Chakra", "JavaScriptCore"],
      correctAnswer: "V8",
    },
  ];
const initialState = {
    currentQuestion: 0, 
    answers: {},
    score: null,
    isSubmitted: false
}

const reducer = (state,action) => {
    switch (action.type) {
        case "NEXT_QUESTION": 
            return {...state, currentQuestion: state.currentQuestion + 1}
        case "PREV_QUESTION":
            return {...state, currentQuestion: state.currentQuestion - 1}
        case "ANS_QUESTION":
            return {...state, answers: {...state.answers, [action.payload.questionId]: action.payload.option}}
        case "SET_SCORE":
            return {...state, score: action.payload, isSubmitted: true}
        case "RETAKE_QUIZ":
            return {...initialState}
        default:
            return state
    }
}


    

export default function QuizApp () {

    const [state, dispatch] = useReducer(reducer, localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) : initialState)

    const renderQuestion = () => {

        const question = questions[state.currentQuestion]
        
        return (<div>
                {question.id}. {question.text} <br/><br/>
                {questions[state.currentQuestion].options.map(opt => {
                    return (<>
                        <input
                            type="radio"
                            id={opt}
                            name={`question_${question.id}`}
                            checked={opt === state.answers[question.id]}
                            onChange={e=>{
                                dispatch({type:"ANS_QUESTION", payload: {questionId: question.id, option: opt}})
                            }}
                        />
                        <label htmlFor={opt}>{opt}</label>
                </>)})}
        </div>)}

    const handleNext = () => {
        dispatch({type: "NEXT_QUESTION"})
    }

    const handlePrev = () => {
        dispatch({type: "PREV_QUESTION"})
    }

    const handleSubmit = () => {
        let score = 0;
        for (let qId in state.answers){
            const question = questions.find(ele => ele.id == qId)
            if (question.correctAnswer === state.answers[qId]){
                score++
            }
        }        
        dispatch({type:"SET_SCORE", payload: score})
    }

    const handleRetake = () => {
        dispatch({type: "RETAKE_QUIZ"})
    }
    
    useEffect(() => {
        localStorage.setItem("state", JSON.stringify(state))
    }, [state])
    
    return(
        <div>
            <h1>Quiz App</h1>
            {state.isSubmitted ? 
            (<>
            <h2>Your Score - {state.score}</h2>
            <button onClick={handleRetake}>Retake Quiz</button>
            </>) : (<>
            {renderQuestion()}
            <br/>
            {state.currentQuestion > 0 && <button onClick={handlePrev}>Previous</button>}            
            {state.currentQuestion < questions.length -1 && <button onClick={handleNext}>Next</button>}
            <button onClick={handleSubmit}>Submit</button>
            </>)
            }
                 
        </div>
    )
}