import { createContext, useReducer, useEffect } from "react";
import reducer from '../reducers/auth-reducer'
import { useNavigate } from "react-router-dom";
import users from '../users-data.json'


//AuthContext
export const AuthContext = createContext()


const initialState = {
    isLoggedIn : false, 
    user : null
}



export function AuthProvider (props) {

    const navigate = useNavigate()
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleLogin = (user) => {
        dispatch({type: 'LOGIN', payload: user})
        localStorage.setItem("id", user.id)
        navigate("/dashboard")
    }

    const handleLogout = (user) => {
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem("id")
        navigate('/login')
    }

    useEffect(()=>{
        const id = localStorage.getItem('id')
        if (id){
            const user = users.find(ele=> Number(ele.id) === Number(id))
            dispatch({type: "LOGIN", payload: user})
        }
    }, [])

    return(
        <AuthContext.Provider value={{...state, dispatch, handleLogin, handleLogout}} >
            {props.children}
        </AuthContext.Provider>        
    )
}


