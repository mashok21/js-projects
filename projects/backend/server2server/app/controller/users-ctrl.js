import Users from "../model/user-model.js";
import axios from "axios"

const usersCtrl = {}

usersCtrl.show = async (req, res) => {
    const uid = req.params.uid
    try {
        const user = await Users.findOne({uid})
        if (!user){
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${uid}`)
            const userObj = new Users({uid: response.data.id, name: response.data.name, email: response.data.email, city: response.data.city})
            await userObj.save()
            res.status(201).json(userObj)
        } else {
            return res.json(user)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export default usersCtrl