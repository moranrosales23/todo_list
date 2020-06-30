import { Storage } from "./Storage.js";
import { Timer } from "./Timer.js";

const timers = [];

export class Task extends Storage {
  add(task) {
    this.save = [...this.tasks, task];
    this.addRowTable(this.template(task));
  }

  delete(id) {
    this.save = this.tasks.filter((task) => task.id !== id);
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
              ${task.description}
              <div class="time_remaining" id="time${task.id}"></div>
            </td>
            <td data-idtask="${task.id}">
              <button type="button">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        `;
  }

  createAllTimer(){
      this.tasks.forEach(task => timers.push(new Timer(task)));
  }

}