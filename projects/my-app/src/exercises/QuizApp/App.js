import { useContext,  } from 'react'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import AdminDashboard from "./AdminDashboard"
import Login from './Login'
import Quiz from './Quiz'


import { UserProvider, UserContext } from './UserContext'

export function App(){
    
    const {state, dispatch} = useContext(UserContext)
    const {currentUser, isAdmin} = state    

    const handleLogOut = () => {

        dispatch({type: 'SET_CURRENT_USER', payload: null})
        dispatch({type: 'SET_IS_ADMIN', payload: false})
        
        return <Login />

    }

    return (
        <BrowserRouter>
    
        <h1>Quiz App</h1>
        {currentUser ? (<>
            <ul>
            {isAdmin && (<>            
                <li><AdminDashboard /></li>
            </>)}            
            <li> 
                <Link to="/quiz">Quiz</Link> 
            </li> 
            <li><button onClick={handleLogOut}>Log out</button></li>           
            </ul>
        </>): (
            <ul>
                <li>
                    <Link to="/login"> Login </Link>        
                </li>
            </ul>)}

        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/quiz" element={<Quiz />} />
        </Routes>
    
    </BrowserRouter>
    )

}

const RootApp = () => {
    return (
    <UserProvider>
        <App />
    </UserProvider>    
)}

export default RootApp

