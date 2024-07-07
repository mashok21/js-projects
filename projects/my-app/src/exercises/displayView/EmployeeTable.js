export default function EmployeeTable () {
    
    const employees = [
        { id: 1, name: 'emp1', email: 'emp1@gmail.com' },
        { id: 2, name: 'emp2', email: 'emp2@gmail.com' },
        { id: 3, name: 'emp3', email: 'emp3@gmail.com' },
        { id: 4, name: 'emp4', email: 'emp4@gmail.com' }
    ]

    return (
        <table border=".25">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                    {employees.map(employee => {
                        return (
                            <tr>
                                <td>{employee.id}</td>
                                <th>{employee.name}</th>
                                <th>{employee.email}</th>    
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}