document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create HTML elements for the task
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.className = 'task-text';
        span.innerText = taskText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerText = 'X';

        // Append text and button to the list item
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        // Append list item to the main list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Toggle complete on clicking the text
        span.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Delete task on clicking the X button
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });
    }

    // Trigger on button click
    addBtn.addEventListener('click', addTask);

    // Trigger on pressing 'Enter' key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
