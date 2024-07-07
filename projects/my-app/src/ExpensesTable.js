import axios from "axios"
import ExpenseItem from "./ExpenseItem"
import { useContext } from "react"
import ExpenseContext from "./ExpenseContext"


export default function ExpensesTable () {

    const {expenses, getCategoryName, expensesDispatch} = useContext(ExpenseContext)

    return (
        <div>
            <h2>Listing Expenses = {expenses.data.length}</h2>
            <br/>
            <table border="1">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>  
                </thead>
                <tbody>
                {Array.isArray(expenses.data) && expenses.data.length > 0 ? (
                    expenses.data.map((expense) => (
                    <ExpenseItem
                        key={expense._id}
                        {...expense}
                        expensesDispatch={expensesDispatch}
                        getCategoryName={getCategoryName}
                    />
                    ))
                ) : (
                    <tr>
                    <td colSpan="6">No expenses found</td>
                    </tr>
                )}
                </tbody>
            </table>
            <h4> Total Expenses - {Array.isArray(expenses.data) && expenses.data.length > 0 ? expenses.data.reduce((total, current) => total + current.amount, 0) : 0} </h4>
        </div>
    )
}