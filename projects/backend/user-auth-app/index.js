import express from "express"
import dotenv from "dotenv"
dotenv.config()
import {checkSchema} from "express-validator"
import configureDB from "./config/db.js"
import usersCtrl from "./app/controller/users-ctrl.js"
import authenticateUser from "./app/middlewares/authentication.js"
import { userRegisterSchema, userLoginSchema } from "./app/validation/user-validation-schema.js"


const app = express()
const port = 3050
app.use(express.json())
configureDB()

app.get('/home', (req, res) => {
    res.json({
        message: 'home page'
    })
})

app.post('/register', checkSchema(userRegisterSchema), usersCtrl.register)

app.post('/login', checkSchema(userLoginSchema), usersCtrl.login)

app.get('/profile', authenticateUser, usersCtrl.profile)

app.listen(port, () => {
    console.log('server running on port', port)
})