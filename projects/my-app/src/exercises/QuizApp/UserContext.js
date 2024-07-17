import {useReducer, createContext } from "react"

const initialState = {
    currentUser: '',
    isAdmin: false,
    questions: ['']
}

const actionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SET_IS_ADMIN: "SET_IS_ADMIN",
    ADD_QUESTION: "ADD_QUESTION"
}
const reducer = (state, action) => {
    switch (action.type){
        case actionTypes.SET_CURRENT_USER: 
            return {...state, currentUser: action.payload}
        case actionTypes.SET_IS_ADMIN:
            return {...state, isAdmin: action.payload}
        case actionTypes.ADD_QUESTION:
            return {...state, questions: [...state.questions, action.payload]  }
    default:
        return state
    }
}

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [state, dispatch]= useReducer(reducer, initialState)
    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}