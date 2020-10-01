const todoList = require('./toDoList');

function findTodoId(req, res){
    const {id} = req.params;
    const toDoItem = todoList.find(element =>{
      if(element.id === parseInt(id, 10)){
        return true;
      }
      return false;
    })
  
    !toDoItem ? res.status(404).json() : res.status(200).json(toDoItem);
  }

function postTodoItem(req, res){
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
}

function putItem(req, res){
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
}

function patchItem(req, res){
    const {id} = req.params;

    const toDoItemIndex = todoList.findIndex(element => {
        if(element.id === parseInt(id, 10)){
            return true;
        }
        return false;
    })

    if(toDoItemIndex === -1){
        res.status(404).json()
    }else{
        Object.keys(todoList[toDoItemIndex]).forEach(key=>{
            if(req.body[key]){
                todoList[toDoItemIndex][key] = req.body[key];
            }
        })
        res.status(202).json();
    }
}

function deleteItem(req, res){
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
}

module.exports = {
    findTodoId: findTodoId,
    postTodoItem: postTodoItem,
    putItem: putItem,
    patchItem: patchItem,
    deleteItem: deleteItem
}