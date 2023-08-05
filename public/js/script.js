document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('taskList');
  const taskInput = document.getElementById('taskInput');
  const addButton = document.getElementById('addButton');

  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${taskText}</span>
        <button class="completeButton">Complete</button>
        <button class="deleteButton">Delete</button>
      `;
      taskList.appendChild(li);
      taskInput.value = '';
    }
  });

  taskList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('completeButton')) {
      const taskItem = target.parentNode;
      taskItem.classList.toggle('completed');
    } else if (target.classList.contains('deleteButton')) {
      const taskItem = target.parentNode;
      taskList.removeChild(taskItem);
    }
  });
});
