const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error.middleware");

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/expenses", require("./routes/expense.routes"));

app.use(errorMiddleware);

module.exports = app;