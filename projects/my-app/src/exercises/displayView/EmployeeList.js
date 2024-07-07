export default function EmployeeList () {

    const employees = [
        { id: 1, name: 'emp1', email: 'emp1@gmail.com' },
        { id: 2, name: 'emp2', email: 'emp2@gmail.com' },
        { id: 3, name: 'emp3', email: 'emp3@gmail.com' },
        { id: 4, name: 'emp4', email: 'emp4@gmail.com' }
    ]

    return (
        <ul>
            {employees.map((employee, index) => {
                return <li key={index}>{employee.name} - {employee.email}</li>
            })}
        </ul>
    )
}