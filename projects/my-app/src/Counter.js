import axios from "axios"
import {useState, useEffect, useReducer} from "react"

const reducer = (state, action) => {
    if (action.type === "ADD_COUNTER") {
        return [...state, action.payload] 
    } else if (action.type === "SET_COUNTERS") {
        return action.payload 
    } else if (action.type === "INC") {
        return state.map(counter => counter._id === action.payload ? {...counter, value: counter.value +1} : counter)
    } else if (action.type === "DEC") {
        return state.map(counter => counter._id === action.payload ? {...counter, value: counter.value -1} : counter)
    } else if (action.type === "RESET") {
        return state.map(counter => counter._id === action.payload ? {...counter, value: 0} : counter)
    } else if (action.type === "REMOVE") {
        return state.filter(counter => counter._id !== action.payload)
    } else {
        return state
    }
}

export default function Counter () {
    const [counters, dispatch] = useReducer(reducer, [])
    const [lastUpdatedCounter, setLastUpdatedCounter] = useState('')
    const [lastDeletedCounter, setLastDeletedCounter] = useState('')

    const urlPost = 'http://localhost:3010/counter'
    const addCounter = () => {
        axios.post(urlPost, { value: 0 })
            .then(response => {
                dispatch({type: "ADD_COUNTER", payload: response.data})
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        const urlGet = 'http://localhost:3010/counterslist'
        axios.get(urlGet)
            .then(response => {
                dispatch({type: 'SET_COUNTERS', payload: response.data });
            })
            .catch(error => {
                console.error('Error fetching counters:', error);
            });
    }, []);

    useEffect(() => { 
        if (lastUpdatedCounter !== null) {
            const updatedCounter = counters.find(item => item._id === lastUpdatedCounter)
            if (updatedCounter) {
                const urlPut = `http://localhost:3010/counter/${updatedCounter._id}`
                axios.put(urlPut, {value: updatedCounter.value})
                    .then(response => console.log('Counter incremented', response.data))
                    .catch(error => console.error('Error incrementing counter', error))        
            }            
        }        
    }, [counters, lastUpdatedCounter])

    useEffect(() => { 
        if (lastDeletedCounter !== null) {
            const urlDeleted = `http://localhost:3010/counter/${lastDeletedCounter}`
                axios.delete(urlDeleted)
                    .then(response => console.log('Counter incremented', response.data))
                    .catch(error => console.error('Error incrementing counter', error))        
            }            
        }, [counters, lastDeletedCounter])

    const handleInc = (id) => {
        dispatch({type: "INC", payload: id})
        setLastUpdatedCounter(id)
    }
    
    const handleDec = (id) => {
        dispatch({type: "DEC", payload: id})
        setLastUpdatedCounter(id)
    }

    const handleReset = (id) => {
        dispatch({type: "RESET", payload: id})
        setLastUpdatedCounter(id)
    }

    const handleRemove = (id) => {
        dispatch({type: "REMOVE", payload: id})
        setLastDeletedCounter(id)
    }

    return (<>
        <h2> Counter App</h2>
        <button onClick={addCounter}>Add Counter</button>
        <ul>
        {counters.map(counter => {
            return <li key={counter._id}>{counter.value}<button onClick={()=>handleInc(counter._id)}> Inc </button><button onClick={() => handleDec(counter._id)}> Dec </button><button onClick={() => handleReset(counter._id)}> Reset </button><button onClick={() => handleRemove(counter._id)}>Remove</button></li>
        })}

        </ul>
        </>
    )
}