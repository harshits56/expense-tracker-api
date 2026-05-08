const Expense = require("../models/expense.model");

exports.createExpense = async (data, userId) => {
    return await Expense.create({ ...data, user: userId });
};

exports.getExpenses = async (userId, query) => {
    let filter = { user: userId };

    if (query.filter) {
        const now = new Date();
        let startDate;

        if (query.filter === "week") {
            startDate = new Date(now.setDate(now.getDate() - 7));
        } else if (query.filter === "month") {
            startDate = new Date(now.setMonth(now.getMonth() - 1));
        } else if (query.filter === "3months") {
            startDate = new Date(now.setMonth(now.getMonth() - 3));
        }

        filter.date = { $gte: startDate };
    }

    if (query.start && query.end) {
        filter.date = {
            $gte: new Date(query.start),
            $lte: new Date(query.end)
        };
    }

    return await Expense.find(filter);
};

exports.updateExpense = async (id, userId, data) => {
    return await Expense.findOneAndUpdate(
        { _id: id, user: userId },
        data,
        { new: true }
    );
};

exports.deleteExpense = async (id, userId) => {
    return await Expense.findOneAndDelete({
        _id: id,
        user: userId
    });
};