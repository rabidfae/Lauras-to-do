//I am using the textbook JavaScript in easy steps by Mike McGrath to help me with this project. I am also speaking with co-workers and they are adding their opinons and helping me as I go, while leaving myself notes. I find it easier to talk through things as I'm writing it and having to explain why I am doing it the way that I am, co-workers help with that. I am also checking stack overflow and ChatGPT to have things explained simpler if I'm not quite understanding it clearly
//I know I will probably have to change a lot of things as we progress through the semester.



const toDos = [
    {
        toDoID: 0,
        toDoText: "Homework",
        //todoCategory: [catID], //recommendation from co-worker to do it this way, I'm unsure why and haven't looked into it yet.
        toDoComplete: true
    },
    {
        toDoID: 1,
        toDoText: "Make Dinner",
        //todoCategory: [catID],
        toDoComplete: false

    },
    {
        toDoID: 2,
        toDoText: "Laundry",
        //todoCategory: [catID],
        toDoComplete: true
    },
    {
        toDoID: 3,
        toDoText: "Weekly Budget",
        //todoCategory: [catID],
        toDoComplete: false
    
    },
    {
        toDoID: 4,
        toDoText:"Work on Project",
       // toDoCatergory: [catID],
       toDoComplete: false
    },
    {
        toDoID: 5,
        toDoText: "Grocery Shopping",
        //todoCategory: [catID],
        toDoComplete: true
    }

]
const category = [
    {
        catID: 0,
        catText: "home",
        catActive: 1 //active or not active is 0 or 1. I'm also not 100% sure this is something I can do
    },
    {
        catID: 1,
        catText: "school",
        catActive: 1
    },
    {
        catID: 2,
        catText: "work",
        catActive: 0
    }
]

const taskList = document.getElementById('taskList');
const newInput = document.getElementById('newInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');



//showing my todo array onpage, making it editable, and adding a delete button. Line through completed tasks
function renderToDos() {
    taskList.innerHTML = ''; 
    toDos.forEach((toDo, index) => { 
        const li = createToDoListItem(toDo, index);
        taskList.appendChild(li); 
    });
    updateIncompleteCount(); 
}

function createToDoListItem(toDo, index) {
    const li = document.createElement('li'); 
    if (toDo.isEditing) {
        addEditInput(li, toDo, index);
    } else {
        li.textContent = `${toDo.toDoText}`; //just testing this out after playing in svelte. I'm not really super comfy with this yet.
        addEditButton(li, toDo); 
    }
    addDeleteButton(li, index); 
    completedOnOff(li, toDo); 
    addCompleted(li, toDo); 
    return li;
}

function addEditInput(li, toDo, index) {
    const editInput = document.createElement('input'); 
    editInput.id = 'editInput'; //was getting a warning saying input needed an ID
    editInput.type = 'text'; 
    editInput.value = toDo.toDoText; 

    editInput.addEventListener('click', event => {
        event.stopPropagation(); //// An event listener is added to the editInput to call event.stopPropagation(), which prevents clicks on the input from triggering the click event on the parent <li>. this allows you to focus on and edit the input with interference -- ChatGPT (when I got stuck and couldn't find an answer in the book I have or on stack overflow)
       
    });

    li.appendChild(editInput); 
    addSaveButton(li, toDo, editInput); 
}

function addSaveButton(li, toDo, editInput) {
    const saveBtn = document.createElement('button'); 
    saveBtn.textContent = 'Save'; 
    saveBtn.addEventListener('click', () => {
        toDo.toDoText = editInput.value; 
        toDo.isEditing = false; 
        renderToDos(); 
    });
    li.appendChild(saveBtn); 
}

function addEditButton(li, toDo) {
    const editBtn = document.createElement('button'); 
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', event => {
        event.stopPropagation(); //Here it is making sure only the edit buttons are clicked and not the list item
        toDo.isEditing = true; 
        renderToDos(); 
    });
    li.appendChild(editBtn); 
}
/// deleted button
function addDeleteButton(li, index) {
    const deleteBtn = document.createElement('button'); 
    deleteBtn.textContent = 'Delete'; 
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', event => {
        event.stopPropagation(); 
        toDos.splice(index, 1); 
        renderToDos(); 
    });
    li.appendChild(deleteBtn); 
}
//completion on and off
function completedOnOff(li, toDo) {
    if (toDo.toDoComplete) {
        li.style.textDecoration = 'line-through'; 
    }
}

function addCompleted(li, toDo) {
    li.addEventListener('click', () => {
        toDo.toDoComplete = !toDo.toDoComplete; 
        updateIncompleteCount();
        renderToDos(); 
    });
}

// adding new task from input
function addTask() {
    const taskText = newInput.value.trim(); // New to-do --trim removes the spaces from the beginning and end. (co-worker suggestion)
    if (taskText !== '') {
        const newToDo = { 
            toDoText: taskText, 
            toDoComplete: false, 
            isEditing: false // Set the isEditing property to false (Not being edited by default)
        };
        toDos.push(newToDo); 
        renderToDos(); 
        newInput.value = ''; 
        updateIncompleteCount(); 
    }

}

function clearToDos() {
    toDos = toDos.filter(toDo => !toDo.toDoComplete); // Keep only incomplete to-dos. Filter checks each to-do item to see if it is not complete (!toDo.toDoComplete means "not complete"). If the test function returns true, the item is kept in the array; otherwise, it is removed. (co-worker suggestion)

    renderToDos(); 

    updateIncompleteCount(); 
}


// Event listener for adding a task
addButton.addEventListener('click', addTask);

// Event listener for clearing the to-do list
clearButton.addEventListener('click', clearToDos);

// Initial render of array
renderToDos();


updateIncompleteCount(); // Update the incomplete count

//complete count function
function updateIncompleteCount() {
    const incompleteCount = toDos.filter(toDo => !toDo.toDoComplete).length; // Count the number of incomplete tasks
    document.getElementById('incompleteCount').textContent = incompleteCount; // Update the incomplete count
}