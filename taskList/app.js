const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const taskInput = document.querySelector('#task')
const filter = document.querySelector('#filter')


// load all event listeners
loadEventListeners()

// load all event listeners
function loadEventListeners(){
    // add task even
    form.addEventListener('submit', addTask)
    // remove task event
    taskList.addEventListener('click', removeTask)
    // clear all tasks
    clearBtn.addEventListener('click', clearTasks)
    // filter tasks
    filter.addEventListener('keyup', filterTasks)
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)


}

// add task function
function addTask(e){
    e.preventDefault()

    if(taskInput.value === ''){
        alert('add a task')
    }

    // create a list item element
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(taskInput.value))
    // add the X btn to delete task
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link)

    // append the li to the Ul
    taskList.appendChild(li)

    // store in local
    storeTask(taskInput.value)

    taskInput.value = ''
}

// store task function
function storeTask(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// get tasks from local storage
function getTasks(){
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        const li = document.createElement('li')
        li.className = 'collection-item'
        li.appendChild(document.createTextNode(task))

        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove"></i>'
        li.appendChild(link)

        taskList.appendChild(li)
    })
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('are you sure')){
             e.target.parentElement.parentElement.remove()

            //  delete from local storage
             deleteTask(e.target.parentElement.parentElement)
         }
    }

}

// delete task from local storage
function deleteTask(taskItem){
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)

        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTasks(e){
    console.log('working')
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    // clear all tasks from local storage
    clearAllTasks()
}

function clearAllTasks(){
    localStorage.clear()
}

function filterTasks(e){
    const text = e.target.value.toLowerCase()


    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        }else{
            task.style.display = 'none'
        }
    })

    console.log(text)
}