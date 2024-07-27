import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import { AuthProvider } from "./context/Auth"
import { useContext } from "react"
import { AuthContext } from "./context/Auth"
import PrivateRoute from "./components/PrivateRoute"

import './App.css'

const App = () => {

    const {isLoggedIn, user, dispatch, handleLogout} = useContext(AuthContext)

    return (
        <div>
            <h1> User Authentication System </h1>
            <nav>
                <ul>
                    {isLoggedIn ? (<>

                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                    </>) 
                    :                    
                    (<>
                    <li><Link to='/login'>Login</Link></li>
                    </>)
                    }                   
                </ul>
            </nav>
            <Routes>
                <Route path='/login' element = {<Login />} />                
                <Route path='/dashboard' element = {<PrivateRoute><Dashboard /> </PrivateRoute>}/>
                <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
        </div>
    )
}

const RootApp = () => {
    return (    
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
)}

export default RootApp

