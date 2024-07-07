import axios from "axios"
import {useState, useEffect} from "react"

export default function UserTable () {
    const url = `https://jsonplaceholder.typicode.com/users`

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get(url)
            .then(response => {
                const data = response.data
                setUsers(data)
            })
            .catch(err => console.log(err))
    }, [])
    

    return (
        <div>
            <h2>User Table </h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>city</th>
                        <th>position</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key = {user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address.city}</td>
                            <td>{user.address.geo.lat}-{user.address.geo.lng}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

