import axios from "axios"
import {useState, useContext} from "react"
import CategoriesContext from "./CategoriesContext"

export default function CategoryForm () {
    
    const [categoryName, setCategoryName] = useState('')
    const [categoryServerErrors, setCategoryServerErrors] = useState('')
    const [categoryClientErrors, setCategoryClientErrors] = useState('')
    const categoryErrors = {}

    const {handleAddCategory} = useContext(CategoriesContext)

    const urlCat = `http://localhost:3010/api/categories`

const runCategoryClientValidation = () => {
    if(categoryName.trim().length === 0){
      categoryErrors.name = "ClientSideError - Name field cannot be empty"
      } 
  }

const handleCategoryNameSubmit = (e) => {
    e.preventDefault()
    const formData = {name: categoryName}
    runCategoryClientValidation()
    if(Object.keys(categoryErrors).length === 0){
        axios.post(urlCat, formData)
        .then(response => {
        handleAddCategory(response.data)
        setCategoryServerErrors([])
        setCategoryClientErrors({})
        })
        .catch(error =>{
        console.log(error)
        setCategoryServerErrors(error.response.data.errors)
        })
        setCategoryName("")
        } else {
        setCategoryClientErrors(categoryErrors)
}
  }

    return (
        <div>
            <form onSubmit={handleCategoryNameSubmit}>
            <label htmlFor='category-name'>Enter Category Name</label>
            <br/>
            <input 
            type="text"
            value={categoryName}
            id="category-name"
            onChange={(e) => setCategoryName(e.target.value)}
            />
            {categoryClientErrors.name && <span>{categoryClientErrors.name}</span>}
            <br />
            <input type="submit" value="Submit"/>
            {categoryServerErrors.length > 0 && (
            <ul>
            {categoryServerErrors.map((error, i) => (
                <li>{error.msg}</li>
            ))}
            </ul>
        )}
        </form>
      </div>
    )
}