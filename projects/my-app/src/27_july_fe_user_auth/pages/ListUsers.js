import axios from '../config/axios'
import {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

export default function ListUsers (){
    const [users, setUsers] = useState([])
    const {state} = useContext(AuthContext)

    useEffect(()=>{
        (async () => {
            try {
                const response = await axios.get('/api/users/list', {headers : {Authorization : localStorage.getItem('token')}})
                setUsers(response.data)
            } catch (err) {
                console.log(err)
            }
        })()
    },[])

    const handleRoleChange = async (userId, role) => {
        console.log(userId, role)
        try {
            const response = await axios.put(`/api/users/change-role/${userId}`, {role : role}, {headers : {Authorization : localStorage.getItem('token')}})
            const newArr = users.map(ele => {
                if (ele._id === response.data._id){
                    return response.data
                } else {
                    return ele
                }
            })
            setUsers(newArr)
        } catch (err){
            console.log(err)
        }
    }

    return (    
            <div>
                <h2>Listing users - { users.length }</h2>
                <ul>
                    {users.map(ele => {
                        return (
                            <li key={ele._id}>{ele.email} {ele.role}
                            {(state.user.role === 'admin' && ele._id !== state.user._id) && 
                            <>
                            <select value={ele.role} onChange={e => handleRoleChange(ele._id, e.target.value)}>
                                <option value=""> Select</option>
                                {['admin', 'moderator', 'user'].map((role,i) => {
                                    return <option key={i} value={role}>{role}</option>
                                })}
                            </select>                            
                            <button>remove</button>                            
                            </>}                            
                            </li>
                        )
                    })}
                </ul>
            </div>              
    )
}