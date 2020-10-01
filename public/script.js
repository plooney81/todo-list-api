const $putListHere = $('#putListHere');
const $submitButton = $('#addNewItem');

async function getList(){
    $putListHere.empty();
    axios.get(`http://127.0.0.1:3000/api/todos`)
    .then((response)=>{
        
        const newItem = response.data.map(element => {
            return `
                <li class="list-group-item">
                        ${element.id} --> ${element.todo}
                </li>
            `
        });

        $putListHere.append(`
        <h1 class="text-justify">List: </h1>
        <ul class="list-group">${newItem.join('')}</ul>
        `);
        // $putListHere.append(`
        //     <h1 class="text-justify">List: </h1>
        //     <ul class="list-group">${newItem.join('')}</ul>

        //     <form class="mt-3">
        //         <div class="form-group">
        //             <label for="newItemId">Item Id</label>
        //             <input type="number" class="form-control" id="newItemId" placeholder="5">
        //         </div>
        //         <div class="form-group">
        //             <label for="newAction">Action</label>
        //             <input type="text" class="form-control" id="newAction" placeholder="Make more money">
        //         </div>
        //         <button type="submit" class="btn btn-primary" id="addNewItem">Add</button>
        //     </form>
        // `);
    })
}

$(document).ready(()=>{getList();})

$submitButton.click((e)=>{
    e.preventDefault();
    console.log('HELLO');
    const $newItemId = $('#newItemId');
    const $newAction = $('#newAction');
    if($newItemId.val() && $newAction.val()){
        axios.post('http://127.0.0.1:3000/api/todos', {
            id: $newItemId.val(),
            todo: $newAction.val()
        })
            .then(()=>{
                getList()
                $newItemId.val('');
                $newAction.val('');
            });
    }
})