class Employee {
  constructor(text) {
    const [name, scheduleText] = text.split('=');
    this.name = name;
    this.schedule = new Schedule(scheduleText);
  }
}

class Schedule {
  constructor(text) {
    let days = {};
    if (!text.trim()) {
      this.days = {};
      return;
    }
    const dayNames = text.split(',').map((s) => s.substring(0, 2));
    const hours = text
      .split(',')
      .map((text) => {
        const [from, to] = text.substring(2).split('-');
        return {from, to};
      });
    for (const index in dayNames) {
      const day = dayNames[index];
      const hour = hours[index];
      days[day] = hour;
    }

    this.days = days;
  }
}

const hourRangesCoincide = (a, b) => {
  /* 
      from    to
    A - |-----|
    B -    |-----|
         from    to
  */
  const [timeFromA, timeToA] = a.split('-').map((time) => (new Date(`2000-01-01 ${time}`)).getTime());
  const [timeFromB, timeToB] = b.split('-').map((time) => (new Date(`2000-01-01 ${time}`)).getTime());
  const coincide = (timeToA >= timeFromB && timeToA <= timeToB) ||
                   (timeFromB >= timeFromA && timeFromB <= timeToA);

  return coincide;
}

module.exports = {
  Employee,
  Schedule,
  hourRangesCoincide,
};
