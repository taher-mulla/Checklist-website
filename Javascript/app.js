//Selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector('.todo-list');

const filterOption = document.querySelector(".filter-todo");

//Event Listners
todoButton.addEventListener('click', addTodo);  //adding a new item in todo list

todoList.addEventListener('click', deleteCheck);    //deleting item from todo list

filterOption.addEventListener('click', filterTodo); //filter for the todo list

document.addEventListener('DOMContentLoaded', getTodos);    //this will check if the page is loaded, and will get the data from local storage



//Functions


//this function will be called when the event listener has a click
function addTodo(event){

    console.log(todoList.childNodes);
    //  prevents form from submitting
    event.preventDefault();
    console.log("todoButton pressed");

    if(todoInput.value==="") return;

    //  todo div for each todo item
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");  //this todo is used in css to style our item this is like the class name
    
    const newTodo = document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item'); //this todo-item is used in css to style our item this is like the class name
    todoDiv.appendChild(newTodo);





    //Adding the todo to local storage 
    saveToLocal(todoInput.value);





    //checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("completed-button");  //this completed-button is used in css to style our item this is like the class name
    todoDiv.appendChild(completedButton);   //this adds the inner class/tag to the main item div

    //delete/trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-button");    //this trash-button is used in css to style our item this is like the class name
    todoDiv.appendChild(trashButton);   //this adds the inner class/tag to the main item div

    //appending to the main list under the div todo-container
    console.log(todoList.childNodes);
    todoList.appendChild(todoDiv);
    console.log(todoList.childNodes);

    //clears the todo txt box
    todoInput.value='';

}


function deleteCheck(e){
    console.log(e.target);  //shows what we clicked on


    const item=e.target;
    if(item.classList[0]=== 'trash-button'){
        // item.remove(); //this will just remove the delete button
        // console.log("item and its parent");
        // console.log(item);
        // console.log(item.parentElement.innerText);
        removeFromLocal(item.parentElement.innerText);
        

        const todo =item.parentElement;
        todo.classList.add("fall"); //animation to fall
        todo.addEventListener("transitionend", function(){      //this function will not run till the falling animation is done
            console.log("item deleted");
            todo.remove();
        });
        // todo.remove();
    }
    if(item.classList[0]==='completed-button'){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}



function filterTodo(e){


    const todos = todoList.childNodes;
    console.log("clicked on filter");
    console.log(todos);

    todos.forEach(function(todo, index){
        if(index!=0) {
            console.log(todo);
            switch(e.target.value){
                case "all": 
                    todo.style.display = "flex";
                    break;
                case "completed":  
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    console.log("Un-completed");
                    if(todo.classList.contains("completed")){
                        todo.style.display = "none"
                    }else{
                        todo.style.display = 'flex';
                    }
                    break;
            }
        }
    });


}


function saveToLocal(todo){
    //first we will check if we have anyting in the local storage 
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];       //if no then we will just make a empty array
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));       //if we have something then we will get it into todos
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos(){

    console.log("getting from local storage");
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];       //if no then we will just make a empty array
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));       //if we have something then we will get it into todos
    }


    todos.forEach(function(todo){
        //  todo div for each todo item
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");  //this todo is used in css to style our item this is like the class name
        
        const newTodo = document.createElement("li");
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item'); //this todo-item is used in css to style our item this is like the class name
        todoDiv.appendChild(newTodo);

        //checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("completed-button");  //this completed-button is used in css to style our item this is like the class name
        todoDiv.appendChild(completedButton);   //this adds the inner class/tag to the main item div

        //delete/trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-button");    //this trash-button is used in css to style our item this is like the class name
        todoDiv.appendChild(trashButton);   //this adds the inner class/tag to the main item div

        //appending to the main list under the div todo-container
        todoList.appendChild(todoDiv);
    });
}

function removeFromLocal(val){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];       //if no then we will just make a empty array
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));       //if we have something then we will get it into todos
    }

    // todos.forEach(function(todo, index){
    //     if(todo===val){
    //         console.log(todo);
    //         console.log(index);
    //         // todos.(index);
    //         // delete todos[index]
    //         todos.splice(index,1);
    //         console.log(todos);
    //     }
    // });

    todos.splice(todos.indexOf(val), 1);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));

}







