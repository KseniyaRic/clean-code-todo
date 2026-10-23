const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTasksHolder = document.getElementById('incomplete-tasks');
const completeTasksHolder = document.getElementById('complete-tasks');

function createButton({ type, text = null, icon = null }) {
  const button = document.createElement('button');
  button.className = type;

  if (text) {
    button.innerText = text;
  }
  if (icon) {
    const image = document.createElement('img');
    image.src = icon;
    button.appendChild(image);
  }
  return button;
}

function createNewTaskElement(taskString) {
  const taskElement = document.createElement('li');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';

  const label = document.createElement('label');
  label.innerText = taskString; //innerText encodes special characters, HTML does not.
  label.className = 'task';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';

  const editButton = createButton({ type: 'edit', text: 'Edit' });
  const deleteButton = createButton({ type: 'delete', icon: './remove.svg' });

  taskElement.append(checkBox, label, editInput, editButton, deleteButton);

  return taskElement;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const newTaskElement = createNewTaskElement(taskText);
  incompleteTasksHolder.appendChild(newTaskElement);
  bindTaskEvents(newTaskElement, moveTaskToCompleted);

  taskInput.value = '';
}

function editTask() {
  const currentTask = this.parentNode;
  const editInput = currentTask.querySelector('input[type=text]');
  const label = currentTask.querySelector('label');
  const editButton = currentTask.querySelector('.edit');
  const isEditing = currentTask.classList.contains('editMode');

  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  currentTask.classList.toggle('editMode');
}

function deleteTask() {
  const currentTask = this.parentNode;
  currentTask.remove();
}

function moveTaskToCompleted() {
  const currentTask = this.parentNode;
  completeTasksHolder.appendChild(currentTask);
  bindTaskEvents(currentTask, moveTaskToIncompleted);
}

function moveTaskToIncompleted() {
  const currentTask = this.parentNode;
  incompleteTasksHolder.appendChild(currentTask);
  bindTaskEvents(currentTask, moveTaskToCompleted);
}

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskcurrentTask, checkBoxEventHandler) {
  const checkBox = taskcurrentTask.querySelector('input[type=checkbox]');
  const editButton = taskcurrentTask.querySelector('button.edit');
  const deleteButton = taskcurrentTask.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], moveTaskToCompleted);
}

for (let i = 0; i < completeTasksHolder.children.length; i++) {
  bindTaskEvents(completeTasksHolder.children[i], moveTaskToIncompleted);
}
