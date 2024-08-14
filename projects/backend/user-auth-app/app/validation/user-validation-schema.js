import User from "../models/user-model.js"
export const userRegisterSchema = {
    email: {
        notEmpty: {
            errorMessage: "email cannot be empty"
        },
        isEmail: {
            errorMessage: "email should be valid format"
        },
        trim: true,
        normalizeEmail: true,
        custom: {
            options: async function(value){
                try{
                    const user = await User.findOne({email: value})
                    if (user){
                        throw new Error("Email already taken")
                    }
                } catch(err){
                    throw new Error(err.message)
                }
                return true 
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isStrongPassword: {
            options: {
                minLength: 8, 
                minLowercase: 1, 
                minUppercase: 1,
                minNumber: 1,
                minSymbol: 1
            }, 
            errorMessage: "Password must contain atleast 1 lowercase, 1 uppercase, 1 number and 1 symbol and it must 8 characters in length"
        },
        trim: true
    }
}

export const userLoginSchema = {

    email: {
        notEmpty: {
            errorMessage: "email cannot be empty"
        },
        isEmail: {
            errorMessage: "email should be valid format"
        },
        trim: true,
        normalizeEmail: true,
    },
    password: {
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isStrongPassword: {
            options: {
                minLength: 8, 
                minLowercase: 1, 
                minUppercase: 1,
                minNumber: 1,
                minSymbol: 1
            }, 
            errorMessage: "Password must contain atleast 1 lowercase, 1 uppercase, 1 number and 1 symbol and it must 8 characters in length"
        },
        trim: true
    }
}