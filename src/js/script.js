import { Task } from "./class/Task.js";

const TASK = new Task();

document.addEventListener("DOMContentLoaded", init);
document.querySelector("#form_todo").addEventListener("submit", saveTask);
document.querySelector("table").addEventListener("click", listenerTable);

function init() {
  TASK.listTasks();
  TASK.createAllTimer();
}

function taskIsEmpty(){
  return TASK.tasks.length === 0;
}

function isButtonDelete({ tagName }) {
  return tagName === "BUTTON";
}

function listenerTable({ target }) {
  if (isButtonDelete(target)) {
    deleteTask(target);
  }
}

function isNumber(id) {
  if (isNaN(id)) {
    throw "La tarea a eliminar, es inválida";
  }
}

function deleteTask({ parentElement }) {
  try {
    const id = parentElement.getAttribute("data-idtask");
    isNumber(id);
    TASK.delete(id);
    TASK.listTasks();
  } catch (error) {
    alert(error);
  }
}

function getDataInput() {
  const description = document.querySelector("#description").value;
  const date = document.querySelector("#date").value;
  const color = document.querySelector("#color").value;
  const id = new Date().getTime() + "" + Math.floor(Math.random() * 100 + 1);
  return { id, description, date, color };
}

function clearForm() {
  document.querySelector("#description").value = "";
}

function stopEventSubmit(event) {
  event.preventDefault();
  event.stopPropagation();
}

function saveTask(event) {
  stopEventSubmit(event);
  TASK.add(getDataInput());
  clearForm();
}
