import jwt from 'jsonwebtoken'

const user = {_id: "123", email: "user4@gmail.com", password: ""}
const tokenData = {userId: user._id}
const token = jwt.sign(tokenData, 'dct123', {expiresIn: '7d'})

console.log(token)