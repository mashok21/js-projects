import {useState, useEffect} from "react"

const data = [
    { id: 1, name: 'emp11', email: 'emp11@gmail.com', selected: false },
    { id: 2, name: 'emp12', email: 'emp12@gmail.com', selected: false },
    { id: 3, name: 'emp13', email: 'emp13@gmail.com', selected: false },
    { id: 4, name: 'emp14', email: 'emp14@gmail.com', selected: false }
]

export default function Users () {

    const [users, setUsers] = useState(data)
    const [userList, setUserList] = useState([])

    const handleCheck = (id) => {
        const updatedUsers = users.map((user, index) => {
            return user.id === id ? ({...user, selected: !user.selected}) : (user)
        })
        setUsers(updatedUsers)
    }

    useEffect(() => {
        const selectedUsers = users.filter((user, index) => {
            return user.selected
        })
        setUserList(selectedUsers)
    }, [users])

    return(<>
        <table border="1">
            <thead>
                <tr>
                    <th>#</th>  
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    return (<tr key={index}>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td><input type="checkbox" checked={user.selected} onChange={() => handleCheck(user.id)} /></td>
                            </tr>)
                })}
            </tbody>
        </table>
        <ul>
            {userList.map((user, index) => {
                return <li key={index}>{user.name}</li>
            })}
        </ul>
        </>
    )
}