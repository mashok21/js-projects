import axios from "axios"
import { useContext } from "react"
import CategoriesContext from "./CategoriesContext"


export default function CategoriesList () {

  const {categories, categoriesDispatch} = useContext(CategoriesContext)
  const urlCat = `http://localhost:3010/api/categories`


  const handleCategoryRemove = (category) => {
    const urlId = `${urlCat}/${category._id}`
    axios.delete(urlId)
    .then(response => categoriesDispatch({type: "CAT_REMOVE", payload: response.data}))
    .catch(err=> console.error(err))
  }
  
  return (
    <div>
      <ul>
          {categories.map((category, i) => (
            <li key={i}> {category.name}<button onClick={() => handleCategoryRemove(category)}>remove category</button></li>
          ))}
      </ul>
    </div>
  )
}

