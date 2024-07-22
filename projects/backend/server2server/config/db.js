import mongoose from "mongoose";

const configureDB = async () => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/mar24-s2s')
        console.log('connected to db', db.connections[0].name)
    } catch (err) {
        console.log('error connecting to db', err)
    }
}

export default configureDB