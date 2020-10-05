const http = require('http');
const todoList = require('./toDoList');
const todoListFunctions = require('./todoListFunctions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')


const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer); // use es6renderer for html view templates
app.set('views', 'templates'); // look in the templates folder for view templates
app.set('view engine', 'html'); // set the view engine to use the 'html' views

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(app);

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

// homepage route
app.get('/', todoListFunctions.renderHome);

app.get('/todos', todoListFunctions.renderList)

app.post('/todos', (req, res)=>{
  const [id, todo] = [parseInt(req.body.newItemId, 10), req.body.newAction];
  if(!id || !todo){
    res.status(422).json();
  }else{
    const newToDoItem = {
      id: id,
      todo: todo
    };
    todoList.push(newToDoItem);
    res.status(201).render('list', {
      locals: {
        todoList: todoList,
        title: "List"
      },
      partials: {
        head: 'partials/head'
      }
    });
  }
})

app.delete('/todos/:id', (req, res)=>{
  const { id }  = req.params;

  const toDoItemIndex = todoList.findIndex(element =>{
    if(element.id === parseInt(id, 10)){
      return true;
    }
    return false;
  })

  if(toDoItemIndex === -1){
    res.status(404).send()
  }else{
    todoList.splice(toDoItemIndex, 1)
    res.status(200).redirect('/todos');
  }
})

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
