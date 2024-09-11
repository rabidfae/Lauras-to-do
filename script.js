//I am using the textbook JavaScript in easy steps by Mike McGrath to help me with this project. I am also speaking with co-workers and they are adding their opinons and helping me as I go, while leaving myself notes. 
//I know I will probably have to change a lot of things as we progress through the semester.



let toDos = [
    {
        toDoID: 0,
        toDoText: "Homework",
        //todoCategory: [catID], //recommendation from co-worker to do it this way, I'm unsure why and haven't looked into it yet.
        toDoComplete: true
    },
    {
        toDoID: 1,
        toDoText: "Feed Child",
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
    }

]
let category = [
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

const newInput = document.getElementById('newInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
//const newDate = document.getElementById('newDate');//get info on due date
//const newCat = document.getElementById('newCat');//get info on category

function renderToDos() {
    taskList.innerHTML = '';
    toDos.forEach((toDo, index) => {
        const li = document.createElement('li');
        li.textContent = toDo.toDoText;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click event from bubbling up to the li
            toDos.splice(index, 1); // Remove the to-do item from the array
            renderToDos(); // Re-render the list
        });

        li.appendChild(deleteBtn); // Append the delete button to the list item
        taskList.appendChild(li); // Append the list item to the task list

        if (toDo.toDoComplete) {
            li.style.textDecoration = 'line-through'; // Cross out if completed
        }

        li.addEventListener('click', () => {
            toDo.toDoComplete = !toDo.toDoComplete; // switch the complete status
            renderToDos(); // Re-render the list to reflect the change
        });
    });
}

function addTask() {
    const taskText = newInput.value.trim(); // New to-do
    if (taskText !== '') {
        const newToDo = {
            toDoText: taskText,
            toDoComplete: false
        };
        toDos.push(newToDo); // Add new to-do to the array
        renderToDos(); // Re-render the list
        newInput.value = ''; // Clear input field
    }
}
function clearToDos() {
    toDos = toDos.filter(toDo => !toDo.toDoComplete); // Keep only incomplete to-dos
    renderToDos(); // Re-render the list
}
// Event listener for adding a task
addButton.addEventListener('click', addTask);

// Event listener for clearing the to-do list
clearButton.addEventListener('click', clearToDos);

// Initial render
renderToDos();




