import axios from "axios"
import {format} from "date-fns"
import {useContext, useEffect, useState} from "react"
import ExpenseContext from "./ExpenseContext"

export default function ExpenseForm () {

    const [expenseDate, setExpenseDate] = useState('')
    const [expenseTitle, setExpenseTitle] = useState('')
    const [expenseAmount, setExpenseAmount] = useState('')
    const [expenseCategory, setExpenseCategory] = useState('')
    const [expenseDescription, setExpenseDescription] = useState('')
    const [expenseServerErrors, setExpenseServerErrors] = useState([])
    const [expenseClientErrors, setExpenseClientErrors] = useState({})
    const expenseErrors = {}

    const {expensesDispatch, categories, expenses} = useContext(ExpenseContext)

    const expense = expenses.data.find(ele => ele._id === expenses.editId)

        useEffect(() => {
      if (expense){
        setExpenseDate(format(new Date(expense.expenseDate), 'yyyy-MM-dd'))
        setExpenseTitle(expense.title)
        setExpenseAmount(expense.amount)
        setExpenseDescription(expense.description)
        setExpenseCategory(expense.category)
      } else {
        setExpenseDate('')
        setExpenseTitle('')
        setExpenseAmount('')
        setExpenseDescription('')
        setExpenseCategory('')
      }
    }, [expense])

    const urlExp = `http://localhost:3010/api/expenses/`

    const runExpenseClientValidationErrors = () => {
        if(expenseDate.trim().length === 0){
          expenseErrors.expenseDate = "Expense date cannot be left blank"
        } else if (new Date(expenseDate) > new Date()){
          expenseErrors.expenseDate = "Are you time travelling into the future?"
        }
        if (expenseTitle.trim().length === 0){
          expenseErrors.expenseTitle = "Need a title"
        }
        if(String(expenseAmount).trim().length === 0 || String(expenseAmount).trim() < 1){
          expenseErrors.expenseAmount = "Need a valid amount greater than 1"
        }
        if(expenseCategory.trim().length === 0){
          expenseErrors.expenseCategory = "Select a category"
        }
        }
      
    
      const handleExpenseFormSubmit = (e) => {
        e.preventDefault()
        const formData = {
          title : expenseTitle,
          amount: expenseAmount,
          description: expenseDescription,
          expenseDate: expenseDate,
          category: expenseCategory
        }
    
        runExpenseClientValidationErrors()
    
        if(Object.keys(expenseErrors).length === 0){
          if (expense){
            axios.put(`${urlExp}${expense._id}`, formData)
              .then(response => {
                expensesDispatch({type: 'EDIT_EXPENSE', payload: response.data})
                expensesDispatch({type: "SET_EDIT_ID", payload: null})
                })
              .catch(err => console.log(err))
          } else {
            axios.post(urlExp, formData)
              .then(response => {
                expensesDispatch({type: "ADD_EXPENSES", payload: response.data})
                setExpenseAmount("")
                setExpenseDate("")
                setExpenseCategory("")
                setExpenseDescription("")
                setExpenseTitle("")
                setExpenseServerErrors([])
                setExpenseClientErrors({})
              })
            .catch(errors => {
              console.log(errors)
              setExpenseServerErrors(errors.response.data.errors)
            })
          }
        } else {
          setExpenseClientErrors(expenseErrors)
        }
      }    

    return (
        <div>
            <h2> {expenses ? "Edit" : "Add"} Expenses </h2>

            {expenseServerErrors.length > 0 && (
                <div>
                <h3> Server Errors </h3>
                <ul>
                    {expenseServerErrors.map((ele, i) => {
                    return <li key={i}>{ele.msg}</li>
                    })}
                </ul>
                </div>
            )}

            <form onSubmit={handleExpenseFormSubmit}>
                
                <label> Enter Expenses</label> <br/>
                <input 
                type="date" 
                value={expenseDate} 
                onChange={e=>setExpenseDate(e.target.value)}
                />
                {expenseClientErrors.expenseDate && <span>{expenseClientErrors.expenseDate}</span>}
                <br/><br/>

                <label>Title</label><br/>
                <input 
                type="text" 
                value={expenseTitle}
                onChange={e=>setExpenseTitle(e.target.value)}  
                />
                {expenseClientErrors.expenseTitle && <span>{expenseClientErrors.expenseTitle}</span>}  
                <br/><br/>

                <label>Amount</label><br/>
                <input 
                type="number" 
                value={expenseAmount}
                onChange={e=>setExpenseAmount(e.target.value)}
                />
                {expenseClientErrors.expenseAmount && <span>{expenseClientErrors.expenseAmount}</span>} 
                <br/><br/>

                <select onChange={e => setExpenseCategory(e.target.value)}>
                <option> Select</option>
                {categories.map(ele => {
                    return <option key={ele._id} value={ele._id}> {ele.name} </option>
                })}
                </select>
                {expenseClientErrors.expenseCategory && <span>{expenseClientErrors.expenseCategory}</span>} 
                <br/>
                
                <label> Description </label><br/>
                <textarea 
                type="text" 
                value={expenseDescription}
                onChange={e=>setExpenseDescription(e.target.value)}  
                />
                <br/><br/>

                <input type="submit" value="Submit" />
            
            </form>
        </div>
    )
}