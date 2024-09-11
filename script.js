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

const taskList = document.getElementById('taskList');
const newInput = document.getElementById('newInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');

function renderToDos() {
    taskList.innerHTML = ''; // Clear the list
    toDos.forEach((toDo, index) => { // Loop through the to-dos
        const li = document.createElement('li'); // Create a new list item

        if (toDo.isEditing) { // Check if the to-do is being edited
            const editInput = document.createElement('input'); // Create a new input
            editInput.id = 'editInput'; // Set the input id so the form will work correctly
            editInput.type = 'text'; // Set the input type to text
            editInput.value = toDo.toDoText; // Set the input value to the to-do text
            li.appendChild(editInput); // Append the input to the list item

            const saveBtn = document.createElement('button'); // creates a save button
            saveBtn.textContent = 'Save'; // adds the text to the save button
            saveBtn.addEventListener('click', () => { // adds an event listener to the save button
                toDo.toDoText = editInput.value; // Set the to-do text to the input value
                toDo.isEditing = false; // Set the isEditing property to false (so you can't edit the to-do)
                renderToDos();// Re-render the list
            });
            li.appendChild(saveBtn); // Append the save button to the list item
        } else {
            li.textContent = toDo.toDoText; // Set the list item text to the to-do text

            const editBtn = document.createElement('button'); // creates an edit button
            editBtn.textContent = 'Edit'; // adds the text to the edit button
            editBtn.addEventListener('click', (event) => { // adds an event listener to the edit button
                event.stopPropagation(); // Prevent the click event from bubbling up to the li
                toDo.isEditing = true; // Set the isEditing property to true (so you can edit the to-do)
                renderToDos(); // Re-render the list
            });
            li.appendChild(editBtn); // Append the edit button to the list item
        }

        const deleteBtn = document.createElement('button'); // creates a delete button
        deleteBtn.textContent = 'Delete'; // adds the text to the delete button
        deleteBtn.classList.add('deleteBtn'); // Add the deleteBtn class
        deleteBtn.addEventListener('click', (event) => { // adds an event listener to the delete button
            event.stopPropagation(); // Prevent the click event from bubbling up to the li
            toDos.splice(index, 1); // Remove the to-do item from the array
            renderToDos(); // Re-render the list
        });

        li.appendChild(deleteBtn); // Append the delete button to the list item

        if (toDo.toDoComplete) {
            li.style.textDecoration = 'line-through'; // Cross out if completed
        }

        li.addEventListener('click', () => {
            toDo.toDoComplete = !toDo.toDoComplete; // Toggle the completion status
            renderToDos(); // Re-render the list to reflect the change
        });

        taskList.appendChild(li); // Append the list item to the task list
    });
}

function addTask() {
    const taskText = newInput.value.trim(); // New to-do
    if (taskText !== '') {// Check if the input is not empty
        const newToDo = { // Create a new to-do object
            toDoText: taskText, // Set the to-do text
            toDoComplete: false, // Set the to-do as incomplete
            isEditing: false // Set the isEditing property to false (Not being edited by default)
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

// Initial render of array
renderToDos();




