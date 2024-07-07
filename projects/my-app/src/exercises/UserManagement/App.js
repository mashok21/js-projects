import {useReducer, useEffect} from "react"
import UsersContainer from "./UsersContainer"
import usersContext from "./UsersContext"
import axios from "axios"

const url = `https://jsonplaceholder.typicode.com/users`

const usersReducer = (state, action) => {
    if(action.type === "SET_USERS"){
        return action.payload
    } else if (action.type === "SET_REMOVE"){
        return state.filter(ele => ele.id !== action.payload)
    } else if (action.type === "ADD_USER"){
        return [...state, action.payload]
    } else if (action.type === "EDIT_USER"){
        return state.map(ele => ele.id === action.payload.id ? action.payload : ele)
    }        
}

export default function App () {

    const [users, usersDispatch] = useReducer(usersReducer, [])

    useEffect(() => {
        async function fetchUsers (){
            try {
                const response = await axios.get(url)
                usersDispatch({type: "SET_USERS", payload: response.data.map(ele => ({id: ele.id, username: ele.username, email: ele.email}))})
            } catch(error) {
                console.log(error)
            }
        }
        fetchUsers()
    },[])

    return (
        <usersContext.Provider value = {{usersDispatch, users}} >
        <UsersContainer />
        </usersContext.Provider>
    )
}