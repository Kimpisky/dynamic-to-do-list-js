document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    function addTask(taskText, save = true) {
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        } else {
            taskText = taskText.trim();
        }

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const listItem = document.createElement('li');
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        listItem.appendChild(taskTextSpan);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        removeButton.onclick = function() {
            this.parentElement.remove();
            saveTasks();
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (save) {
            taskInput.value = '';
        }

        if (save) {
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(listItem => {
            const taskText = listItem.querySelector('span').textContent;
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    addButton.addEventListener('click', () => addTask(taskInput.value, true));

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value, true);
        }
    });
});
