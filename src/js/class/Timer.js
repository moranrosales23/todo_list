import { Message } from "./Message.js";

const miliseconds_for_second = 1000;
const miliseconds_for_minute = miliseconds_for_second * 60;
const miliseconds_for_hour = miliseconds_for_minute * 60;
const miliseconds_for_day = miliseconds_for_hour * 24;

const message = new Message();

export class Timer {
  constructor(task) {
    this.task = task;
    this.interval = null;
    this.init();
  }

  init() {
    this.clear();
    this.setTimer();
  }

  setTimer() {
    this.interval = setInterval(() => this.countDown(), miliseconds_for_second);
    this.countDown();
  }

  countDown() {
    const now = new Date();
    let time_remaining = new Date(this.task.date).getTime() - now.getTime();
    if (this.expired(time_remaining)) {
      message.show({...this.task});
      time_remaining = 0;
      this.clear();
    }
    document.querySelector(`#time${this.task.id}`).innerHTML = this.template(
      this.convert(time_remaining)
    );
  }

  convert(time_remaining) {
    const days_remaining = Math.floor(time_remaining / miliseconds_for_day);
    const hours_remaining = Math.floor(
      (time_remaining % miliseconds_for_day) / miliseconds_for_hour
    );
    const minutes_remaining = Math.floor(
      (time_remaining % miliseconds_for_hour) / miliseconds_for_minute
    );
    const seconds_remaining = Math.floor(
      (time_remaining % miliseconds_for_minute) / miliseconds_for_second
    );

    return {
      days_remaining,
      hours_remaining,
      minutes_remaining,
      seconds_remaining,
    };
  }

  expired(time_remaining) {
    return time_remaining < 0;
  }

  template(time) {
    return `
        <span>${this.addZero(time.days_remaining)}  <br/> D </span>
        <span>${this.addZero(time.hours_remaining)} <br/> H </span>
        <span>${this.addZero(time.minutes_remaining)} <br/> M </span>
        <span>${this.addZero(time.seconds_remaining)} <br/> S </span>
      `;
  }

  addZero(time) {
    return time < 10 ? `0${time}` : time;
  }

  clear() {
    clearInterval(this.interval);
  }
}
