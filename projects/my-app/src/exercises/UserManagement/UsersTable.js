import { useContext } from "react"
import usersContext from "./UsersContext"
import UsersItems from "./UsersItems"

export default function UsersTable () {

    const {usersDispatch, users} = useContext(usersContext)
    
    return (<>
        <h3>Users Table </h3>        
        <table border="1">
            <thead>
                <tr>
                    <th>SI</th>
                    <th>UserName</th>
                    <th>UserEmail</th>
                    <th>Remove</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <usersContext.Provider key={user.id} value={{user, usersDispatch}}>
                    <UsersItems />
                    </usersContext.Provider>  
                ))}
            </tbody>
        </table>    
        </>)
}