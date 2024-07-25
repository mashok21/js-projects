import User from '../model/user-model.js'
import {validationResult} from "express-validator"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
const usersCtrl = {}

usersCtrl.register = async (req, res) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const {email, password} = req.body
    
    try {
        const user = new User({email, password})
        const salt = await bcryptjs.genSalt()
        const hash = await bcryptjs.hash(password, salt)
        user.password = hash
        await user.save()
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Something went wrong"})
    }

} 

usersCtrl.login = async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: 'Invalid email or password' });
        }

        // Verify the password
        const isVerified = await bcryptjs.compare(password, user.password);
        if (!isVerified) {
            return res.status(400).json({ errors: 'Invalid email or password' });
        }

        // Generate the JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Send the token in the response
        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ errors: 'Internal server error' });
    }
};

usersCtrl.profile = async (req, res) => {
    try{
        const user = await User.findById(req.userId)
        res.json(user)
    } catch (err){
        res.status(500).json({errors: "Something went wrong"})
    }
}

export default usersCtrl