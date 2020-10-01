const http = require('http');
const todoList = require('./toDoList');
const todoListFunctions = require('./todoListFunctions');

const express = require('express');
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));



// GET /api/todos
app.get('/api/todos', (req, res)=>{
  res.status(200).json(todoList);
})

// GET /api/todos/:id
app.get('/api/todos/:id', todoListFunctions.findTodoId);

// POST /api/todos
app.post('/api/todos', todoListFunctions.postTodoItem);

// PUT /api/todos/:id
app.put('/api/todos/:id', todoListFunctions.putItem);

// PATCH /api/todos/:id
app.patch('/api/todos/:id', todoListFunctions.patchItem);

// DELETE /api/todos/:id
app.delete('/api/todos/:id', todoListFunctions.deleteItem);


server.listen(port, hostname, ()=>{
  console.log(`Server is running at http://${hostname}:${port}/`);
});
