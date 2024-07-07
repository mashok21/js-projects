// const Expense = require("../model/category/expense-model.js")
const Category = require("../model/category-model.js")

const expenseValidationSchema = {
    title: {
        in: ['body'],
        exists : {
            errorMessage: "title is required"
        },
        notEmpty: {
            errorMessage: "title cannot be empty"
        },
        trim: true
    },
    amount: {
        in: ["body"],
        exists: {
            errorMessage: "amount is required"
        },
        isFloat: {
            option: { min: 1}
        },
        trim: true
    },
    category: {
        in: ["body"],
        exists:{
            errorMessage: "category is required"
        },
        notEmpty: {
            errorMessage: "Category cannot be empty"
        },
        isMongoId: {
            errorMessage: "Invalid ObjectId provided"
        },
        custom: {
            options: value => {
                return Category.findById(value)
                .then(category => {
                    if(!category){
                        throw new Error("category Id does not exist in Db")
                    }
                    return true
                })
            }
        }
    },
    expenseDate: {
        in: ['body'],
        exists: {
            errorMessage: "expense date is required"
        },
        notEmpty: {
            errorMessage: "expense date cannot be empty"
        },
        isDate: {
            options: {format: "yyyy-mm-dd"}
        },
        custom: {
            options: value => {
                if(new Date(value) > new Date()){
                    throw new Error("expense date cannot be greater than today")
                }
                return true 
            }
        },
        trim: true
    }
}

const expenseIdValidationSchema = {
    id : {
        in: ['params'],
        isMongoId: {
            errorMessage: "Invalid object id format"
        }
    }
}
module.exports = {
    expenseValidationSchema,
    expenseIdValidationSchema
}