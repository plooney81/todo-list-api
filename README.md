# TO DO LIST API <!-- omit in toc -->

- [About this repository](#about-this-repository)
- [Lessons Learned](#lessons-learned)
- [Technology Used](#technology-used)
- [Code Snippets](#code-snippets)
  
## About this repository
* Main goals of this repository:
  
    1. To test knowledge of how to create a REST API
    2. To tie together our newly created REST API/backend techniques and previous front end knowledge to create a static site
    3. To gain experience in using express view engines

## Lessons Learned
* How to create a REST API
* How to use Express Middleware packages (specifically the body-parser package)
* How to use AXIOS GET as well as other Front End techniques to load specific data on to a page
* How to use AXIOS POST to add data from the user to our server
* How to use AXIOS PATCH so the user can edit data from the page and then send it to the server with the updated data.
* jQuery --> more aesthetically pleasing to use $(document).on('click', "css selector", function) instead of $(document).onclick((e)=>{ if(e.target.id === ...)})
* How to use express view engine for server side rendering
  * View templates and Partials
  * To access values in a form submission, the input types must have a name!

## Technology Used
* Node.js
* Express
* jQuery
* AXIOS
* Bootstrap

## Code Snippets
1. AXIOS Get
```JavaScript
async function getList(){
    axios.get(`http://127.0.0.1:3000/api/todos`)
    .then((response)=>{
        
        const newItem = response.data.map(element => {
            return `
                <li class="list-group-item d-flex justify-content-between">
                    <div class="d-flex align-items-center"> 
                        ${element.id} --> <span class='text'>${element.todo}</span><input type="text" class="form-control ml-3 edit" value="${element.todo}" style="display: none;"></input>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary editButton" data-id="${element.id}">Edit</button>
                        <button type="button" class="btn btn-danger del" data-id="${element.id}">Del</button>
                    </div>
                </li>
            `
        });

        $putListHere.find('.list-group').html(newItem.join(''))
    })
}
```

2. Templating
    * Below is the JavaScript route and render call to an es6 template named list.html
    * using the information we fed into our render call below, we can then use that same information in our template to populate our page with the necessary html.
```JavaScript
app.get('/todos', (req, res)=>{
  res.render('list', {
    locals: {
      title: "List",
      todoList: todoList
    },
    partials: {
      head: 'partials/head'
    }
  });
})
```
```HTML
<h1 class="text-justify">List: </h1>
            <ol class="list-group">
            ${todoList.map(element => {
                return `
                    <li class="list-group-item d-flex justify-content-between">
                        <div class="d-flex align-items-center"> 
                            ${element.id} --> <span class='text'>${element.todo}</span><input type="text" class="form-control ml-3 edit" value="${element.todo}" style="display: none;"></input>
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary editButton" data-id="${element.id}">Edit</button>
                            <button type="button" class="btn btn-danger del" data-id="${element.id}">Del</button>
                        </div>
                    </li>
                `
            }).join('')}</ol>
```