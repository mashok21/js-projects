const Expense = require("../model/expense-model")
const {validationResult} = require("express-validator")
const expenseCtrl = {}

expenseCtrl.create = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = req.body
    const expense = new Expense(body)
    expense.save()
        .then(data => res.status(201).json(data))
        .catch(() => res.status(500).json({error: "Something went wrong"}))
}

expenseCtrl.list = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    Expense.find()
    .then(expense => res.json(expense))
    .catch(err => res.status(500).json({err: "something went wrong"}))
}

expenseCtrl.remove = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    
    }
    const id = req.params.id
    Expense.findByIdAndDelete(id)
    .then(exp => res.json(exp))
    .catch(err => res.json(err))
}

expenseCtrl.update = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const id = req.params.id
    const body = req.body

    Expense.findByIdAndUpdate(id, body, {new: true})
        .then(response => res.json(response))
        .catch(err => res.json(err))
}

module.exports = expenseCtrl