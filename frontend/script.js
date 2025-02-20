const apiUrl = 'http://localhost:3000/tasks';

// Load tasks
async function loadTasks() {
    try {
        const res = await fetch(apiUrl);
        const tasks = await res.json();
        document.getElementById('taskList').innerHTML = tasks.map(task =>
            `<li>
                <span>${task.name} (Due: ${task.dueDate})</span>
                <button onclick="toggleTask(${task.id})">${task.completed ? '✅' : '❌'}</button>
                <button onclick="deleteTask(${task.id})">🗑️</button>
            </li>`
        ).join('');
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Add a new task
async function addTask() {
    const name = document.getElementById('taskInput').value.trim();
    const dueDate = document.getElementById('dueDateInput').value;

    if (!name || !dueDate) {
        alert('Please enter both task name and due date!');
        return;
    }

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, dueDate })
        });
        document.getElementById('taskInput').value = '';
        document.getElementById('dueDateInput').value = '';
        loadTasks();
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Toggle task completion
async function toggleTask(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: 'PUT' });
        loadTasks();
    } catch (error) {
        console.error('Error toggling task:', error);
    }
}

// Delete a task
async function deleteTask(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        loadTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Initialize
loadTasks();
