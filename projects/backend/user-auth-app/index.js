import express from "express"
import cors from 'cors'
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
app.use(cors())
configureDB()

app.get('/home', (req, res) => {
    res.json({
        message: 'home page'
    })
})

app.post('/api/users/register', checkSchema(userRegisterSchema), usersCtrl.register)

app.post('/api/users/login', checkSchema(userLoginSchema), usersCtrl.login)

app.get('/api/users/account', authenticateUser, usersCtrl.profile)

app.listen(port, () => {
    console.log('server running on port', port)
})