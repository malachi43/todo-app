const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { getAsync } = require("./redis");

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.get("/statistics", async (req, res) => {
    try {
        const noOfTodos = await getAsync("noOfTodos");
        res.json({ "added_todos": noOfTodos || 0 });
    } catch (error) {
        res.status(400).json({ success: false, error_message: error.message });
    }

})

app.use('/', indexRouter);
app.use('/todos', todosRouter);

module.exports = app;
