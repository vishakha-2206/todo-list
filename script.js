// Grab DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 1. Load tasks from Local Storage when the page opens
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to add a new task
function addTask() {
    const taskText = todoInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText, false);

    // 2. Save the updated list to Local Storage
    saveTasks();

    todoInput.value = "";
}

// Helper function to build the HTML for a task
function createTaskElement(text, isCompleted) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (isCompleted) {
        li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.classList.add('task-text');
    span.innerText = text;
    li.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    // Toggle complete status
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks(); // 3. Save changes when a task is checked off
    });

    // Delete task
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks(); // 4. Save changes when a task is deleted
    });
}

// 5. Function to save all tasks to Local Storage
function saveTasks() {
    const tasks = [];
    
    // Loop through every task currently on the screen
    document.querySelectorAll('.todo-item').forEach(todoItem => {
        tasks.push({
            text: todoItem.querySelector('.task-text').innerText,
            completed: todoItem.classList.contains('completed')
        });
    });

    // Local Storage only stores text, so we convert our array to a JSON string
    localStorage.setItem('myTodoList', JSON.stringify(tasks));
}

// 6. Function to load tasks back from Local Storage
function loadTasks() {
    const savedTasks = localStorage.getItem('myTodoList');
    
    // If there are saved tasks, parse them back into an array and display them
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
}

// Event listeners
addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
