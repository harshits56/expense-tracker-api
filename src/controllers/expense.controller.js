const expenseService = require("../services/expense.service");

exports.createExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.createExpense(req.body, req.user._id);
        res.status(201).json(expense);
    } catch (err) {
        next(err);
    }
};

exports.getExpenses = async (req, res, next) => {
    try {
        const expenses = await expenseService.getExpenses(req.user._id, req.query);
        res.json(expenses);
    } catch (err) {
        next(err);
    }
};

exports.updateExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.updateExpense(
            req.params.id,
            req.user._id,
            req.body
        );
        res.json(expense);
    } catch (err) {
        next(err);
    }
};

exports.deleteExpense = async (req, res, next) => {
    try {
        await expenseService.deleteExpense(req.params.id, req.user._id);
        res.json({ message: "Deleted" });
    } catch (err) {
        next(err);
    }
};