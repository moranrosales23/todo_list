export class Message {
  constructor() {
    this.requestPermission();
  }

  requestPermission(){
    if (!this.havePermission()) {
        Notification.requestPermission();
      }
  }

  havePermission() {
    return Notification.permission === "granted";
  }

  support() {
    return "Notification" in window;
  }

  show(task) {
    if (this.support() && this.havePermission()) {
      const notification = new Notification("Mensaje", this.description(task));
      setTimeout(notification.close.bind(notification), 3000);
    }
  }

  description(task) {
    const body = `La tarea "${task.description}" ha expirado.`;
    const icon = "src/img/reloj1.png";
    return { body, icon };
  }
}
