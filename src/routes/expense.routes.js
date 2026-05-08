const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.post("/", expenseController.createExpense);
router.get("/", expenseController.getExpenses);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;