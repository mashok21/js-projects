import express from "express"
import configureDB from "./config/db.js"
import usersCtrl from "./app/controller/users-ctrl.js"
import cors from "cors"

const app =  express()
const port =  3020
app.use(cors())
configureDB()

app.get('/api/users/:uid', usersCtrl.show)

app.listen(port, () => {
    console.log("running on port, ", port)
})