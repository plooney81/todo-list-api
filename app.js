const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

const todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
  },
  {
    id: 2,
    todo: 'Build a frontend',
  },
  {
    id: 3,
    todo: '???',
  },
  {
    id: 4,
    todo: 'Profit!',
  },
];

// GET /api/todos
app.get('/api/todos', (req, res)=>{
  res.status(200).json(todoList);
})

// GET /api/todos/:id
app.get('/api/todos/:id', (req, res)=>{
  const {id} = req.params;
  const toDoItem = todoList.find(element =>{
    if(element.id === parseInt(id, 10)){
      return true;
    }
    return false;
  })

  !toDoItem ? res.status(404).json() : res.status(200).json(toDoItem);
})

// POST /api/todos
app.post('/api/todos', (req, res)=>{
  const [id, todo] = [parseInt(req.body.id, 10), req.body.todo];
  if(!id || !todo){
    res.status(422).json();
  }else{
    const newToDoItem = {
      id: id,
      todo: todo
    };
    todoList.push(newToDoItem);
    res.status(201).json()
  }
})

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res)=>{
  const {id} = req.params;

  const toDoItemIndex = todoList.findIndex(element =>{
    if(element.id === parseInt(id, 10)){
      return true;
    }
    return false;
  })

  if(toDoItemIndex === -1){
    res.status(404).json()
  }else{
    const [newId, todo] = [parseInt(req.body.id, 10), req.body.todo];
    if(!newId || !todo){
      res.status(422).json();
    }else{
      todoList[toDoItemIndex].id = newId;
      todoList[toDoItemIndex].todo = todo;
      res.status(202).json()
    }
  }
})

// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res)=>{
  const { id }  = req.params;

  const toDoItemIndex = todoList.findIndex(element =>{
    if(element.id === parseInt(id, 10)){
      return true;
    }
    return false;
  })

  if(toDoItemIndex === -1){
    res.status(404).json()
  }else{
    todoList.splice(toDoItemIndex, 1)
    res.status(200).json()
  }

})


server.listen(port, hostname, ()=>{
  console.log(`Server is running at http://${hostname}:${port}/`);
});
