import {useState} from "react"

const originalUsers = [
    { id: 1, name: 'emp11', email: 'emp11@gmail.com', selected: false },    
    { id: 2, name: 'emp12', email: 'emp12@gmail.com', selected: false },    
    { id: 3, name: 'emp13', email: 'emp13@gmail.com', selected: false },    
    { id: 4, name: 'emp14', email: 'emp14@gmail.com', selected: false }    
]

export default function App () {
    const [users, setUsers] = useState(originalUsers)

    const handleSelect = (id) => {        
        setUsers(users.map(user => user.id === id ? {...user, selected: !user.selected} : user))
    }   

    return (<>    
            <h2>Table</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <input 
                                    type="checkbox"
                                    value={user.selected}
                                    onChange={() => handleSelect(user.id)}
                                />
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
    </>)
}