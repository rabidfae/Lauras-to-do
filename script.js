//At least 2 functions
//Create todo variables that will best represent my todo
//Data model should store all info about todos
//todo name
//status
//id
//category
//due date

//Functions should allow access to the data model for the following procedures:
//Edit Todos
//Edit Status
//Edit Category
//Edit Due Date
//Complete Todo
//Delete Todo
//Delete Category
//Add New Todo
//Add New Category


const newInput = document.getElementById('newInput'); //get info from input
const newDate = document.getElementById('newDate');//get info on due date
const taskList = document.getElementById('taskList');//list of tasks added by input

function addTask () { //function to add task
    const taskText = newInput.value.trim();
    if (taskText !==''){
        const li = document.createElement ('li'); //  create list item from task t
        li.textContent = taskText;
        taskList.appendChild(li);
        newInput.value = ''; //add input

    }
    const taskText2 = newDate.value.trim();
    if (taskText !==''){
        const li = document.createElement ('li'); //  create list item from task 
        li.textContent = taskText2;
        taskList.appendChild(li);
        newDate.value = ''; //add due date
    }
}