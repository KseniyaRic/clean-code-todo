const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTasksHolder = document.getElementById('incomplete-tasks');
const completeTasksHolder = document.getElementById('complete-tasks');

function createButton(className, text, imgSrc) {
  const button = document.createElement('button');
  button.className = className;

  if (text) {
    button.innerText = text;
  }
  if (imgSrc) {
    const image = document.createElement('img');
    image.src = imgSrc;
    button.appendChild(image);
  }
  return button;
}

function createNewTaskElement(taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';

  const label = document.createElement('label');
  label.innerText = taskString;
  label.className = 'task';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';

  const editButton = createButton('edit', 'Edit');
  const deleteButton = createButton('delete', null, './remove.svg');

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const newTaskElement = createNewTaskElement(taskText);
  incompleteTasksHolder.appendChild(newTaskElement);
  bindTaskEvents(newTaskElement, moveTaskToCompleted);

  taskInput.value = '';
}

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const containsClass = listItem.classList.contains('editMode');
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

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

const ajaxRequest = function () {};

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

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
