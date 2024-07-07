const Category = require("../model/category-model")

const categoryValidationSchema = {
    name: {
        in: ['body'],
        exists : {
            errorMessage : "Field is required"
        }, 
        notEmpty : {
            errorMessage: "Name should not be empty!"
        },
        custom: {
            options: value => {
                return Category.findOne({name: {$regex : `^${value}$`, $options: 'i'}})
                .then(category => {
                    if (category){
                        throw new Error("category name already created")
                    } else {
                        return true
                    }
                })
            }
        },
        trim: true
    }
}

const categoryIdValidationSchema = {
    id : {
        in: ['params'],
        isMongoId: {
            errorMessage: "Invalid object id format"
        }
    }
}

module.exports = {
    categoryValidationSchema, 
    categoryIdValidationSchema
    }