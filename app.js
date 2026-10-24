const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTasksHolder = document.getElementById('incomplete-tasks');
const completeTasksHolder = document.getElementById('complete-tasks');
const EDIT_MODE_CLASS = 'editMode';
const LABEL_EDIT = 'Edit';
const LABEL_SAVE = 'Save';

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

  const editButton = createButton({ type: 'edit', text: LABEL_EDIT });
  const deleteButton = createButton({ type: 'delete', icon: './remove.svg' });

  taskElement.append(checkBox, label, editInput, editButton, deleteButton);

  return taskElement;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const newTaskElement = createNewTaskElement(taskText);
  incompleteTasksHolder.appendChild(newTaskElement);
  bindTaskEvents(newTaskElement);

  taskInput.value = '';
}

function editTask() {
  const currentTask = this.parentNode;
  const editInput = currentTask.querySelector('input[type=text]');
  const label = currentTask.querySelector('label');
  const editButton = currentTask.querySelector('.edit');
  const isEditing = currentTask.classList.contains(EDIT_MODE_CLASS);

  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = LABEL_EDIT;
  } else {
    editInput.value = label.innerText;
    editButton.innerText = LABEL_SAVE;
  }

  currentTask.classList.toggle(EDIT_MODE_CLASS);
}

function deleteTask() {
  const currentTask = this.parentNode;
  currentTask.remove();
}

function toggleTaskStatus() {
  const currentTask = this.parentNode;
  const targetHolder = this.checked ? completeTasksHolder : incompleteTasksHolder;

  targetHolder.appendChild(currentTask);
}

function bindTaskEvents(task) {
  const checkBox = task.querySelector('input[type=checkbox]');
  const editButton = task.querySelector('button.edit');
  const deleteButton = task.querySelector('button.delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', toggleTaskStatus);
}

function bindEventsToAll(container) {
  for (const task of container.children) {
    bindTaskEvents(task);
  }
}

bindEventsToAll(incompleteTasksHolder);
bindEventsToAll(completeTasksHolder);
addButton.addEventListener('click', addTask);
