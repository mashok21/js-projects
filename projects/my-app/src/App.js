// import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useReducer, useEffect } from "react";
import CategoryForm from './CategoryForm';
import CategoriesList from './CategoriesList';
import ExpensesTable from './ExpensesTable';
import ExpenseForm from './ExpenseForm';
import ExpenseContext from './ExpenseContext';
import CategoriesContext from './CategoriesContext';

const urlCat = `http://localhost:3010/api/categories`;
const urlExp = `http://localhost:3010/api/expenses`;

const categoriesReducer = (state, action) => {
  if (action.type === "SET_CAT"){
    return action.payload
  } else if (action.type === "CAT_REMOVE"){
    return state.filter(ele => ele._id !== action.payload._id)
  } else if (action.type === "CAT_ADD"){
    return [...state, action.payload]
  }
} 

const expensesReducer = (state, action) => {
  if (action.type === "SET_EXPENSES") {
    return { ...state, data: action.payload }
  } else if (action.type === "REMOVE_EXPENSES") {
    return { ...state, data: state.data.filter(ele => ele._id !== action.payload._id) }
  } else if (action.type === "ADD_EXPENSES") {
    return { ...state, data: [...state.data, action.payload] }
  } else if (action.type === "SET_EDIT_ID"){
    return {...state, editId: action.payload}
  } else if (action.type === "EDIT_EXPENSE"){
    return {...state, data: state.data.map(ele => {
       if(ele._id === action.payload._id){
        return {...action.payload}
       } else {
        return {...ele}
       }
    })}
  } else {
    return state
  }
}

export default function App() {
  
  const [categories, categoriesDispatch] = useReducer(categoriesReducer, [])
  const [expenses, expensesDispatch] = useReducer(expensesReducer, { data: [], editId: null });
  
  // categories related

  useEffect(() => {
    axios.get(urlCat)
      .then(response => {
        const data = response.data;
        categoriesDispatch({type: "SET_CAT", payload: data});
      })
      .catch(error => {
        console.log(error);
      })
    }, [])
  

  const getCategoryName = (expense) => {
    const category = categories.find((cat) => {
      return cat._id === expense.category;
    });
    if (category) {
      return category.name;
    } else {
      return 'N/A';
    }
  }

  // expenses related

  useEffect(() => {
    axios.get(urlExp)
      .then(response => {
        expensesDispatch({ type: "SET_EXPENSES", payload: response.data });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1> Expense App </h1>
      <h2> Categories </h2>
      <h3> Listing Categories - {categories.length} </h3>
      
      <CategoriesContext.Provider value={{categories, categoriesDispatch}} >
      <CategoriesList />
      </CategoriesContext.Provider>
      
      <h3> Add Category </h3>

      <CategoriesContext.Provider value={{categoriesDispatch}} >
      <CategoryForm />
      </CategoriesContext.Provider>

      <ExpenseContext.Provider value={{ expenses: expenses, getCategoryName, categories, expensesDispatch }}>
        <ExpensesTable />
        <ExpenseForm />
      </ExpenseContext.Provider>
    </div>
  )
}
