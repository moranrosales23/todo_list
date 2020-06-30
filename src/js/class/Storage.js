export class Storage {

  set save(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  get tasks() {
    this.createKeyStorage();
    const data = JSON.parse(localStorage.getItem("tasks"));
    return data;
  }

  existsKeyStorage(key) {
    return localStorage.hasOwnProperty(key);
  }

  createKeyStorage() {
    if (!this.existsKeyStorage("tasks")) {
      localStorage.setItem("tasks", "[]");
    }
  }

}
