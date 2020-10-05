const $putListHere = $('#putListHere');
const $submitButton = $('#addNewItem');

async function getList(){
    axios.get(`http://127.0.0.1:3000/api/todos`)
    .then((response)=>{
        
        const newItem = response.data.map(element => {
            return `
                <li class="list-group-item d-flex justify-content-between">
                    <div class="d-flex align-items-center"> 
                        ${element.id} -->&nbsp;&nbsp;<span class='text'>${element.todo}</span><input type="text" class="form-control ml-3 edit" value="${element.todo}" style="display: none;"></input>
                    </div>
                    <div class="d-flex">
                        <button type="button" class="btn btn-primary editButton" data-id="${element.id}">Edit</button>
                        <form action="/todos/${element.id}?_method=DELETE" method="POST">
                            <button type="submit" class="btn btn-danger del" data-id="${element.id}">Del</button>
                        </form>
                    </div>
                </li>
            `
        });

        $putListHere.find('.list-group').html(newItem.join(''))
    })
}

$(document).on('click', ".editButton", (e)=>{
    const $editButton = $(e.target);
    const $editSpan = $editButton.parents('li').find('.text');
    const $editInput = $editButton.parents('li').find('.edit');
    if($editButton.html() === 'Edit'){
        $editSpan.toggle();
        $editInput.toggle();
        $editButton.html('Submit');

    }else if($editButton.html() === "Submit"){
        axios.patch(`http://127.0.0.1:3000/api/todos/${e.target.dataset.id}`, {
            todo : $editInput.val()
        }) //look on that element for any attribute that has a data-prefix specifically for the id one.
        .then((res)=>{
            if(res.status < 400 ){
                getList();
            }
            $editButton.html('Edit');
            $editSpan.toggle();
            $editInput.toggle();
       })

    }


})