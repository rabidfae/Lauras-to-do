//I am using the textbook JavaScript in easy steps by Mike McGrath, Basics of Javascript by Programming Hub and Advanced Javascript by Hayden Van Der Post to help me with this project, and I'm probably confusing myself more in the process. I am also speaking with co-workers and my brother, and they are adding their opinons and helping me as I go. I find it easier to talk through things as I'm writing it and having to explain why I am doing it the way that I am, co-workers help with that. I am also checking stack overflow and ChatGPT to have things explained simpler if I'm not quite understanding it clearly
//I know I will probably have to change a lot of things as we progress through the semester.



let toDos = [
    {
        toDoID: 0,
        toDoText: "Homework",
        toDoCategory: [2], //co-worker walked me through calling an index of the category array to add to the to do list item
        toDoComplete: true
    },
    {
        toDoID: 1,
        toDoText: "Make Dinner",
        toDoCategory: [0],
        toDoComplete: false

    },
    {
        toDoID: 2,
        toDoText: "Laundry",
        toDoCategory: [0],
        toDoComplete: true
    },
    {
        toDoID: 3,
        toDoText: "Weekly Budget",
        toDoCategory: [0],
        toDoComplete: false

    },
    {
        toDoID: 4,
        toDoText: "Work on Project",
        toDoCategory: [1],
        toDoComplete: false
    },
    {
        toDoID: 5,
        toDoText: "Grocery Shopping",
        toDoCategory: [0],
        toDoComplete: true
    }

]

let category = [
    {
        categoryID: 0,
        categoryName: "Home",
    },
    {
        categoryID: 1,
        categoryName: "Work",

    },
    {
        categoryID: 2,
        categoryName: "School",
    }

]


const newInput = document.getElementById('newInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');




//showing my todo array on page
function renderToDos() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    toDos.forEach((toDo, index) => {
        const li = createToDoListItem(toDo, index);
        taskList.appendChild(li);
    });
    updateIncompleteCount();
}

function createToDoListItem(toDo) { //editing to do list item
    const li = document.createElement('li');
    li.classList.add('toDoItem');

    //Find category name by category ID. This feels messy but I'm not sure how else to do it. I will check with a coworker to see if there is a better way to do this.
    const categoryNames = toDo.toDoCategory.map(catID => {
        const categoryObj = category.find(cat => cat.categoryID === catID);
        return categoryObj.categoryName;
    });


    if (toDo.isEditing) {
        addEditInput(li, toDo);
    } else
        li.textContent = `${toDo.toDoText} (${categoryNames})`;
    //just testing this out after playing with svelte. I'm not really super comfy with this yet.

    addEditButton(li, toDo);
    addDeleteButton(li); //add a delete button to list item
    completedOnOff(li, toDo); //click to complete task - line through
    addCompleted(li, toDo);
    return li; //return modifed list item
}
//edit option to change the category. This isn't working how I want yet. I don't know if I will be able to figure it out.
function categorySelect(li, toDo) {
    const categorySelect = document.createElement('select');
    categorySelect.id = 'categorySelect';
    category.forEach(category => {
        const option = document.createElement('option');
        option.value = category.categoryID;
        option.textContent = category.categoryName;

        if (toDo.toDoCategory.includes(category.categoryID)) {
            option.selected = true;
        }
        categorySelect.appendChild(option);
    });

    categorySelect.addEventListener('change', event => {
        event.stopPropagation();

    });

    li.appendChild(categorySelect);
}

//edit input to change the to do
function addEditInput(li, toDo,) {
    const editInput = document.createElement('input');
    editInput.id = 'editInput'; //was getting a warning saying input needed an ID
    editInput.type = 'text';
    editInput.value = toDo.toDoText;

   // editInput.addEventListener('click', event => {
     //   event.stopPropagation(); //// An event listener is added to the editInput to call event.stopPropagation(), which prevents clicks on the input from triggering the click event on the parent <li>. this allows you to focus on and edit the input with interference -- ChatGPT (when I got stuck and couldn't find an answer in the book I have or on stack overflow). I was having problems with the input box not staying active when I clicked on it.

   // });

    li.appendChild(editInput);
    // Call categorySelect to create the dropdown for categories
    const categorySelectElement = categorySelect(li, toDo); // Store the select element for later use
    addSaveButton(li, toDo, editInput, categorySelectElement);


}

// save button to save the changes made in the edit input
function addSaveButton(li, toDo, editInput, categorySelect) {
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', () => {
        toDo.toDoText = editInput.value;
        // Update the category from the select
        const select = li.querySelector('#categorySelect');
        toDo.toDoCategory = [parseInt(select.value)]; // Update the category ID

        toDo.isEditing = false;
        renderToDos();
    });
    li.appendChild(saveBtn);
}
//edit button
function addEditButton(li, toDo) {
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', event => {
        event.stopPropagation(); // making sure only the edit buttons are clicked and not the list item
        toDo.isEditing = true;

        renderToDos();
    });
    li.appendChild(editBtn);
}
/// delete button
function addDeleteButton(li, index) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', event => {
        event.stopPropagation(); // making sure only the delete button is clicked.
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
//click event for completion line through
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

//category stuff
// Users can to be able to view todos within a category 

// Categories in UI must mirror those that are in your data array
// Users can view all todos regardless of category 
// Users need to be able to select a category when adding a new todo. 
// Users need to be able to manage categories
// Add new categories 
// Edit existing categories 
// Delete existing categories 
// Pay attention to what happens when a category is deleted with existing todos. This is part of a good UX.
// When managing categories the following applies:
// No prompt, or alert boxes
// Use of the contenteditable HTML attribute is not allowed
// Can't use a new category input value to edit
// Edit input field must not be visible at all times, only when editing

