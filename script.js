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
const newCat = document.getElementById('newCat');//get info on category
const taskList = document.getElementById('taskList');//list of tasks added by input

let todos = [
    {
        todoID: 0,
        todoText: "Homework",
        //todoCategory: [catID], //recommendation from co-worker to do it this way, I'm unsure why and haven't looked into it yet.
        todoComplete: true
    },
    {
        todoID: 1,
        todoText: "Feed Child",
        //todoCategory: [catID],
        todoComplete: false

    },
    {
        todoID: 2,
        todoText: "Laundry",
        //todoCategory: [catID],
        todoComplete: true
    },
    {
        todoID: 3,
        todoText: "Weekly Budget",
        //todoCategory: [catID],
        todoComplete: false
    }

]
let category = [
    {
        catID: 0,
        catText: "home",
        catActive: 0 //active or not active is 0 or 1
    },
    {
        catID: 1,
        catText: "school",
        catActive: 0
    },
    {
        catID: 2,
        catText: "work",
        catActive: 0
    }
]




function addTask() {
    const taskText = newInput.value.trim();// new todo
    if (taskText !== '') {
        const li = document.createElement('li'); //  create list item from task 
        li.textContent = taskText;
        taskList.appendChild(li); //append the list item
        newInput.value = ''; //add input

        //li.addEventListener('click', completeTask) //complete task should cross it out but I can't make it work just yet

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn)

    }
    // why isn't this working?
    const taskText2 = newDate.value.trim();// new date
    if (taskText2 !== '') {
        const li = document.createElement('li'); //  create list item from task 
        li.textContent = taskText2; // list item will be the text from the date input
        taskList.appendChild(li);
        newDate.value = ''; //add input

        //   li.addEventListener('click', completeTask) //complete task should cross it out
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn)

    }
    const taskText3 = newCat.value.trim(); //new category
    if (taskText !== '') {
        const li = document.createElement('li'); //  create list item from task 
        li.textContent = taskText3;
        taskList.appendChild(li);
        newCat.value = ''; //add due date

        // li.addEventListener('click', completeTask) //complete task should cross it out

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn)

    }

}

function deleteTask(event) { //function to delete task
    const task = event.target.parentElement;
    taskList.removeChild(task)
}
