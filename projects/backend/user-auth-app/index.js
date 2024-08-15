import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config()
import {checkSchema} from "express-validator"
import configureDB from "./config/db.js"
import usersCtrl from "./app/controller/users-ctrl.js"
import notesCtrl from "./app/controller/notes-ctrl.js"
import authenticateUser from "./app/middlewares/authentication.js"
import {authorizeUser} from "./app/middlewares/authorizeUser.js"
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
app.get('/api/users/list', authenticateUser, authorizeUser(['admin', 'moderator']), usersCtrl.listUsers)
app.delete('/api/users/:id', authenticateUser, authorizeUser(['admin']), usersCtrl.destroy)
app.put('/api/users/change-role/:id', authenticateUser, authorizeUser(['admin']), usersCtrl.changeRole)

app.get('/api/notes', authenticateUser, notesCtrl.list)
app.post('/api/notes', authenticateUser, notesCtrl.create)
app.get('/api/notes/:id', authenticateUser, notesCtrl.show)
app.put('/api/notes/:id', authenticateUser, notesCtrl.update)
app.delete('/api/notes/:id', authenticateUser, notesCtrl.delete)
app.get('/api/notes/list', authenticateUser, authorizeUser(['admin', 'moderator']), notesCtrl.list)


app.listen(port, () => {
    console.log('server running on port', port)
})