const express = require("express")
const cors = require('cors')
const configureDb = require("./config/db.js")
const {checkSchema} = require('express-validator')
const categoryCtrl = require("./app/controller/category-ctrl.js")
const expenseCtrl = require("./app/controller/expense-ctrl.js")
const {categoryValidationSchema, categoryIdValidationSchema} = require('./app/validator/category-validator.js')
const {expenseValidationSchema, expenseIdValidationSchema} = require('./app/validator/expense-validator.js')

const app = express()
const port = 3010

app.use(express.json())
app.use(cors())
configureDb()

app.get("/", categoryCtrl.home)
app.get('/api/categories', categoryCtrl.list )
app.post('/api/categories', checkSchema(categoryValidationSchema), categoryCtrl.create)
// 
app.delete('/api/categories/:id', checkSchema(categoryIdValidationSchema), categoryCtrl.remove)

app.get('/api/expenses', expenseCtrl.list)
app.put('/api/expenses/:id', checkSchema(expenseValidationSchema), expenseCtrl.update)
app.post('/api/expenses', checkSchema(expenseValidationSchema), expenseCtrl.create)
app.delete('/api/expenses/:id', checkSchema(expenseIdValidationSchema), expenseCtrl.remove)

app.listen(port, () => {
    console.log("server running on port", port)
})
