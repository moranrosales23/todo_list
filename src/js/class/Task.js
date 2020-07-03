import { Storage } from "./Storage.js";
import { Timer } from "./Timer.js";

const timers = [];

export class Task extends Storage {
    add(task) {
        this.save = [...this.tasks, task];
        this.addRowTable(this.template(task));
        this.createTimer(task);
    }

    delete(id) {
        this.deleteTimer(id);
        this.save = this.tasks.filter((task) => task.id !== id);
    }

    deleteTimer(id) {
        for (const [index, timer] of timers.entries()) {
            if (timer.task.id === id) {
                timer.clear();
                timers.splice(index, 1);
                break;
            }
        }
    }

    addRowTable(template, table = document.querySelector("table.table > tbody")) {
        table.innerHTML += template;
    }

    listTasks() {
        document.querySelector("table.table > tbody").innerHTML = "";
        const html = this.tasks.reduce(
            (prev, task) => prev + this.template(task),
            ""
        );
        this.addRowTable(html);
    }

    template(task) {
        return `
          <tr style="background-color: ${task.color};" >
            <td class="task_description">
                <div class="task_description__text">
                  <span class="task_description__text--name">${task.description}</span>
                  <small class="task_description__text--date">Registrado: ${task.date_register}</small>
                </div>
                <div class="time_remaining" id="time${task.id}"></div>
            </td>
            <td data-idtask="${task.id}">
                <button type="button" title="eliminar tarea">
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
            </td>
          </tr>
        `;
    }

    createAllTimer() {
        this.tasks.forEach((task) => timers.push(new Timer(task)));
    }

    createTimer(task) {
        this.tasks.push(new Timer(task));
    }

    reActiveTimer() {
        timers.forEach((timer) => timer.init());
    }
}