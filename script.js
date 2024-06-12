document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-task-button').addEventListener('click', function() {
    addTask();
});

document.getElementById('new-task').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function loadTasks() {
    axios.get('https://your-backend-url.onrender.com/tasks')
        .then(response => {
            const tasks = response.data;
            tasks.forEach(task => {
                addTaskToDOM(task);
            });
        })
        .catch(error => {
            console.error('There was an error fetching the tasks!', error);
        });
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        text: taskText
    };

    axios.post('https://your-backend-url.onrender.com/tasks', task)
        .then(response => {
            addTaskToDOM(response.data);
            taskInput.value = '';
            taskInput.focus();
        })
        .catch(error => {
            console.error('There was an error adding the task!', error);
        });
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');

    const listItem = document.createElement('li');
    listItem.textContent = task.text;
    listItem.id = task._id;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        deleteTask(task._id);
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function deleteTask(taskId) {
    axios.delete(`https://your-backend-url.onrender.com/tasks/${taskId}`)
        .then(() => {
            const taskList = document.getElementById('task-list');
            const taskItem = document.getElementById(taskId);
            taskList.removeChild(taskItem);
        })
        .catch(error => {
            console.error('There was an error deleting the task!', error);
        });
}
