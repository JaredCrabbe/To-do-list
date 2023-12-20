
function createTodo(){
    let text = document.getElementById("add-todo").value;
    if(text.length !== 0){
        const node = document.createElement("li");
        const textnode = document.createTextNode(text);
        node.appendChild(textnode);
        node.setAttribute("id", "todoItems");
        document.getElementById("todo--items").appendChild(node);

        // Save the list item in local storage
        let todos = localStorage.getItem('todos');
        todos = todos ? JSON.parse(todos) : [];
        todos.push({text: text, completed: false});
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        alert("please fill in a to-do");
    }

};



function clr(){
    document.getElementById("add-todo").value = ""
};

function clearCompleteTodos() {
    let elements = document.getElementsByClassName("strikethrough");

    // Use a while loop to remove elements until none are left
    while(elements[0]) {
        // Get the item text
        let todoText = elements[0].innerText;

        // Get the current todos from local storage
        let todos = JSON.parse(localStorage.getItem('todos'));

        // Use the filter method to create a new array without the completed todo
        let updatedTodos = todos.filter(todo => todo.text !== todoText);

        // Update local storage with the new array
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        // Remove the item from the list
        elements[0].parentNode.removeChild(elements[0]);
    }
}





function clearAllTodos(){
    let todos = document.getElementById("todo--items");
    while(todos.hasChildNodes()){
        todos.removeChild(todos.firstChild);
    }

    // Clear all todos from local storage
    localStorage.setItem('todos', JSON.stringify([]));
}

window.onload = function() {
    let todos = localStorage.getItem('todos');
    todos = todos ? JSON.parse(todos) : [];
    for(let i = 0; i < todos.length; i++){
        const node = document.createElement("li");
        const textnode = document.createTextNode(todos[i].text);
        node.appendChild(textnode);
        node.setAttribute("id", "todoItems");
        if (todos[i].completed) {
            node.classList.add('strikethrough');
        }
        document.getElementById("todo--items").appendChild(node);
    }
    let list = document.getElementById('todo--items');
    if (!list.classList.contains('eventListenerAdded')) {
        // Add event listener to the list after it's created
        list.addEventListener('click', function(e) {
            if(e.target && e.target.nodeName == 'LI') {
                e.target.classList.toggle('strikethrough');
                let todos = JSON.parse(localStorage.getItem('todos'));
                let todo = todos.find(todo => todo.text === e.target.textContent);
                todo.completed = !todo.completed;
                localStorage.setItem('todos', JSON.stringify(todos));
            }
        });

        // Mark that the event listener has been added
        list.classList.add('eventListenerAdded');
    }
};








