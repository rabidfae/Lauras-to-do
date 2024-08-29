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

function addTask () { //function to add task
    const taskText = newInput.value.trim();// new todo
   

   // if (taskText !==''){
       // const li = document.createElement ('li'); //  create list item from task 
       // li.textContent = taskText taskText2 taskText3;
       // taskList.appendChild(li);
       // newInput.value = ''; //add input

       // li.addEventListener('click', completeTask) //complete task should cross it out

       // const deleteBtn = document.createElement('button');
       //deleteBtn.textContent = 'Delete';
       // deleteBtn.addEventListener('click', deleteTask);
       // li.appendChild(deleteBtn)

   //re }
  //  const taskText2 = newDate.value.trim(); //new due date
  //  if (taskText !==''){
     //   const li = document.createElement ('li'); //  create list item from task 
   //     li.textContent = taskText2;
       // taskList.appendChild(li);
      //  newDate.value = ''; //add due date
          
     //   li.addEventListener('click', completeTask) //complete task should cross it out

      //  const deleteBtn = document.createElement('button');
       // deleteBtn.textContent = 'Delete';
      //  deleteBtn.addEventListener('click', deleteTask);
      //  li.appendChild(deleteBtn)
      
    //}
   // const taskText3 = newCat.value.trim(); //new category
   // if (taskText !==''){
     //   const li = document.createElement ('li'); //  create list item from task 
     //   li.textContent = taskText3;
     //   taskList.appendChild(li);
      //  newCat.value = ''; //add due date

       // li.addEventListener('click', completeTask) //complete task should cross it out

      //  const deleteBtn = document.createElement('button');
      //  deleteBtn.textContent = 'Delete';
      //  deleteBtn.addEventListener('click', deleteTask);
      //  li.appendChild(deleteBtn)
      
   // }



    function completeTask(event) { //function to complete task
      const task = event.target;
     task.classList.toggle('completed')
   }
    
   function deleteTask(event) { //function to delete task
     const task = event.target.parentElement;
       taskList.removeChild(task)
   }
}


