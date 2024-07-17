import {useState, useContext} from "react"
import {UserContext} from "./UserContext"

export default function AddQuestions () {

    const [questionText, setQuestionText] = useState('')
    const [options, setOptions] = useState(['','','',''])
    const [correctAnswer, setCorrectAnswer] = useState('')
    const {dispatch} = useContext(UserContext)

    const handleOptionChange = (index, value) => {
        const newOptions = [...options]
        newOptions[index] = value
        setOptions(newOptions)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newQuestion = {
            name: `question${Date.now()}`,
            questionText, 
            options,
            correctAnswer
        }
        dispatch({type:"ADD_QUESTION", payload: newQuestion})
        setQuestionText('')
        setOptions(['','','',''])
        setCorrectAnswer('')        
    }

    return (<>
        <h3>Add Questions</h3>

        <form onSubmit={handleSubmit}>
            <label>Question Text</label><br/>
            <textarea 
                type="text"
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
            />        
            {options.length > 0 && options.map((option, index) => {
                return (                    
                    <div key={index}>
                        <input
                            type="text"
                            value={option}
                            onChange={e=>handleOptionChange(index, e.target.value)}
                        />
                        
                        <input
                            type="radio"
                            name="correctAnswer"
                            value={option}
                            checked={correctAnswer === option}
                            onChange={e => setCorrectAnswer(e.target.value)}
                        />                    
                    </div>
                )
            })}
            <input
                type="submit"
                value="Submit"
            />

        </form>


    </>)
}