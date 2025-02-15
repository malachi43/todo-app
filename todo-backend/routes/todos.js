const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync } = require("../redis")

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res, next) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false
    })
    if (await getAsync("noOfTodos")) {
      let noOfTodo = await getAsync("noOfTodos");
      await setAsync("noOfTodos", ++noOfTodo);
    } else {
      await setAsync("noOfTodos", 1);
    }
    res.send(todo);
  } catch (error) {
    res.status(400).json({ success: false, error_message: error.message });
  }

});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.status(200).json({ success: true, todo: req.todo });
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todoId = req.todo._id;
  const updatedTodo = await Todo.findOneAndUpdate({ _id: todoId }, { ...req.body }, { new: true });
  res.status(200).json({ success: true, todo: updatedTodo });
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
