// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskList = document.getElementById('task-list');
const taskTime = document.getElementById('task-time');

function add(){
    if(taskInput.value == ""){
        alert("Please Enter a Task");
    }
    else if(taskDate.value ==""){
        alert("Please Enter a task Date");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML =`${taskInput.value} ${taskDate.value}` + " at " + `${taskTime.value}` ;
        taskList.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        let editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        li.appendChild(editButton);
    } 
    taskInput.value="";
    taskDate.value ="";
    saveData();
}

taskList.addEventListener("click", function(e){
    if(e.target.tagName =="LI"){
        e.target.classList.toggle("checked");
        saveData();
        showList();
    }
    else if(e.target.tagName=="SPAN"){
        let LI = e.target.parentElement;
        LI.remove();  
        
        let taskListHTML = taskList.innerHTML;
        taskListHTML = taskListHTML.replace(LI.outerHTML, "");
        localStorage.setItem("data", taskListHTML);
        showList();
        
    }
    // else if(e.target.tagName=="BUTTON"){
        else if(e.target.tagName=="BUTTON"){
            let currentTask = e.target.parentElement;
            let taskText = currentTask.textContent.replace(currentTask.querySelector('span').textContent, '').replace(currentTask.querySelector('button').textContent, '').trim();
            let taskDate = taskText.split(' ')[taskText.split(' ').length - 3];
            let taskTime = taskText.split(' ')[taskText.split(' ').length - 1];
    
            // Create input fields for editing
            let newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.value = taskText.replace(taskDate, '').replace(' at ' + taskTime, '').trim();
            currentTask.appendChild(newInput);
    
            let newDateInput = document.createElement('input');
            newDateInput.type = 'date';
            newDateInput.value = taskDate;
            currentTask.appendChild(newDateInput);
    
            let newTimeInput = document.createElement('input');
            newTimeInput.type = 'time';
            newTimeInput.value = taskTime;
            currentTask.appendChild(newTimeInput);
    
            // Hide original task text and edit button
            currentTask.querySelector('span').style.display = 'none';
            e.target.style.display = 'none';
    
            // Create save button
            let saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            currentTask.appendChild(saveButton);
    
            // Add event listener to save button
            saveButton.addEventListener('click', function() {
                let newTaskText = newInput.value;
                let newTaskDate = newDateInput.value;
                let newTaskTime = newTimeInput.value;
    
                // Update task text
                currentTask.innerHTML = `${newTaskText} ${newTaskDate} at ${newTaskTime}`;
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                currentTask.appendChild(span);
                let editButton = document.createElement("button");
                editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
                currentTask.appendChild(editButton);
    
                // Save data to local storage
                saveData();
            });
        }
        
    // }
},false);

function saveData(){
    localStorage.setItem("data",taskList.innerHTML);
}
function showList(){
    taskList.innerHTML = localStorage.getItem("data");
}

showList();