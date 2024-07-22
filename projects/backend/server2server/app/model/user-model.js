import { Schema, model } from "mongoose";

const userSchema = new Schema({
    uid: Number,
    name: String, 
    email: String, 
    city: String, 
}, {timestamps: true})

const Users = model("Users", userSchema)

export default Users 