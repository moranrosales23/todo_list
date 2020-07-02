import { Task } from "./class/Task.js";

const TASK = new Task();

document.addEventListener("DOMContentLoaded", init);
document.querySelector("#form_todo").addEventListener("submit", saveTask);
document.querySelector("table").addEventListener("click", listenerTable);
document.querySelector("#date").setAttribute("min", dateMin());

function dateMin() {
    const [date, time] = new Date().toLocaleString().split(" ");
    const [day, month, year] = date.split("/");
    const [hour, minute] = time.split(":");
    return `${year}-${addZero(month)}-${addZero(day)}T${hour}:${minute}`;
}

function addZero(time) {
    return time.toString().padStart(2, '00');
}

function init() {
    TASK.listTasks();
    TASK.createAllTimer();
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
        TASK.reActiveTimer();
    } catch (error) {
        alert(error);
    }
}

function getDataInput() {
    const description = document.querySelector("#description").value;
    const date = document.querySelector("#date").value;
    const color = document.querySelector("#color").value;
    const id = new Date().getTime() + "" + Math.floor(Math.random() * 100 + 1);
    const date_register = new Date().toLocaleString();
    return { id, description, date, color, date_register };
}

function clearForm() {
    document.querySelector("#description").value = "";
}

function stopEventSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
}

function validateNameTask() {
    if (
        document.querySelector("#description").value.toString().trim().length === 0
    )
        throw "Ingrese un nombre para la tarea.";
}

function validateDateTime() {
    const now = new Date();
    const date_task = document.querySelector("#date").value;
    isValidDate(date_task);
    const date = new Date(date_task);
    if (now.getTime() > date.getTime()) {
        throw "Ingrese una fecha y hora superior a " + now.toLocaleString();
    }
}

function isValidDate(date) {
    if (date === "") throw "Ingrese una fecha válida.";
}

function clearMessage() {
    document.querySelector("#message").textContent = "";
}

function saveTask(event) {
    stopEventSubmit(event);
    clearMessage();
    try {
        validateNameTask();
        validateDateTime();
        TASK.add(getDataInput());
        clearForm();
    } catch (error) {
        document.querySelector("#message").textContent = error;
    }
}