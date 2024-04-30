function appendtodolist(todo) {
    let labelId = "label" + todo.uniqueno;
    let checkBoxId = "checkBox" + todo.uniqueno;
    let deleteId = "deleteid" + todo.uniqueno;
    let listId = "listid" + todo.uniqueno;

    let mycontainer = document.getElementById("mycontainer");

    function saveTodoLocalStorage() {
        localStorage.setItem("TodoList", JSON.stringify(todoList));
    }

    let mySaveButton = document.getElementById("mySaveButton")
    mySaveButton.onclick = function () {
        saveTodoLocalStorage();
    }

    // Create a ul element
    var ul = document.createElement("ul");

    // Create a li element
    var li = document.createElement("li");
    li.classList.add("d-flex", "flex-row");
    li.setAttribute("id", listId);

    // Create an input element
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", checkBoxId);
    input.classList.add("mycheck");
    input.checked-todo.isChecked;
    input.onclick = function () {
        checkedOrnot(checkBoxId, labelId, listId);
        saveTodoLocalStorage();
    };

    // Create a div element for label container
    var labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");

    // Create a label element
    var label = document.createElement("label");
    label.setAttribute("for", checkBoxId);
    label.classList.add("mylabel");
    label.textContent = todo.text;
    label.setAttribute("id", labelId);
    if(todo.isChecked===true){
        label.classList.add("checked")
    }
    label.onclick = function () {
        checkedOrnot(checkBoxId, labelId,listId);
        saveTodoLocalStorage();
    };

    // Create a div element for delete icon
    var deleteIcon = document.createElement("div");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerHTML = "&#x1F5D1;"; // Unicode for trash can icon
    deleteIcon.setAttribute("id", deleteId);
    deleteIcon.onclick = function () {
        deleteLabel(deleteId, listId);
        saveTodoLocalStorage();
    };

    // Append input and label to the label container
    li.appendChild(input);
    labelContainer.appendChild(label);

    // Append label container and delete icon to the li element
    li.appendChild(labelContainer);
    labelContainer.appendChild(deleteIcon);

    // Append li to the ul element
    ul.appendChild(li);

    // Append ul to the mycontainer
    mycontainer.appendChild(ul);

    function checkedOrnot(checkBoxId, labelId, listId) {
        let checkBoxElement = document.getElementById(checkBoxId);
        let labelElement = document.getElementById(labelId);
        labelElement.classList.toggle('checked', checkBoxElement.checked);
        let inputElementIndex = todoList.findIndex(function (eachTodo) {
            let eachtodoelement = "listid" + eachTodo.uniqueno; // Add a separator
            if (eachtodoelement === listId) {
                return true;
            } else {
                return false;
            }
        });
        let todoObject = todoList[inputElementIndex]
        if (todoObject.isChecked === true) {
            todoObject.isChecked = false;
        } else {
            todoObject.isChecked = true;
        }
    }

    function deleteLabel(deleteId, listId) {
        let listElement = document.getElementById(listId);
        listElement.remove();
        let deleteListIndex = todoList.findIndex(function (eachItem) {
            let deleteeachitemId = "deleteid" + eachItem.uniqueno;
            if (deleteeachitemId === deleteId) {
                return true
            } else {
                return false
            }
        })
        todoList.splice(deleteListIndex, 1)
    }
}

let addButton = document.getElementById("addButton");
addButton.onclick = function () {
    addListToContainer();
};

function addListToContainer() {
    let myInput = document.getElementById("myInput");
    let myInputValue = myInput.value;
    let todoCount = todoList.length + 1;
    let newTodo = {
        text: myInputValue,
        uniqueno: todoCount,
        isChecked: false
    };
    todoList.push(newTodo);
    if (myInputValue === "") {
        alert("invalid,please enter something")
        return;
    }
    appendtodolist(newTodo);
    myInput.value = ""; // Reset input value after adding todo
}


function parsedTodoObject() {
    let stringifytodo = localStorage.getItem("TodoList");
    if (stringifytodo === null) {
            return [];
        } else {
            return JSON.parse(stringifytodo);
        }
    }
    
todoList = parsedTodoObject();
    
// Initial rendering of todoList
todoList.forEach(function (todo) {
    appendtodolist(todo);
});
