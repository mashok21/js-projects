const Category = require("../model/category-model")
const {validationResult} = require('express-validator')
const categoryCtrl = {}

categoryCtrl.home = (req, res) => {
    res.send("Hello, World!")
}

categoryCtrl.list = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    Category.find()
    .then(categories => res.json(categories))
    .catch(errors => res.status(500).json({errors : "Something went wrong"}))
}

categoryCtrl.create = (req, res) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = req.body
    const category = new Category(body)
    category.save()
    .then(data => res.status(201).json(data))
    .catch((errors ) => res.status(500).json({errors: "Something went wrong" })); 
}

categoryCtrl.remove = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: "Something went wrong"})
    }
    const id = req.params.id
    Category.findByIdAndDelete(id)
    .then(cat => res.json(cat))
    .catch(err => res.json(err))

}

module.exports = categoryCtrl