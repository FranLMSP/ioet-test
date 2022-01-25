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
    const hours = text.split(',').map((text) => text.substring(2));
    for (const index in dayNames) {
      const day = dayNames[index];
      const hour = hours[index];
      days[day] = hour;
    }

    this.days = days;
  }

  countCoincidences(otherSchedule) {
    let total = 0;
    for (const day in this.days) {
      if (!otherSchedule.days[day]) continue;
      if (!hourRangesCoincide(this.days[day], otherSchedule.days[day])) continue;
      total += 1;
    }
    return total;
  }
}

class Coincidences {
  constructor(employeesList) {
    let coincidences = {};

    for (const employee of employeesList) {
      for (const otherEmployee of employeesList) {
        if (
          employee.name == otherEmployee.name ||
          coincidences[`${employee.name}-${otherEmployee.name}`] ||
          coincidences[`${otherEmployee.name}-${employee.name}`]
        ) {
          continue;
        }
        const count = employee.schedule.countCoincidences(otherEmployee.schedule);
        if (count <= 0) continue;
        const coincidenceKey = `${employee.name}-${otherEmployee.name}`;
        coincidences[coincidenceKey] = {
          employeeA: employee,
          employeeB: otherEmployee,
          count,
        };
      }
    }

    this.coincidences = Object.values(coincidences);
  }

  toTable() {
    return this.coincidences
      .map((coincidence) => `${coincidence.employeeA.name}-${coincidence.employeeB.name}: ${coincidence.count}`)
      .join('\n');
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
  if (timeToA <= timeFromB) return false;
  if (timeFromA >= timeToB) return false;
  return (timeToA >= timeFromB && timeToA <= timeToB) ||
         (timeFromB >= timeFromA && timeFromB <= timeToA);
}

const generateTable = (inputText) => {
  const employeesList = inputText
    .trim()
    .split('\n')
    .map((text) => new Employee(text));
  const coincidences = new Coincidences(employeesList);
  return coincidences.toTable();
}

module.exports = {
  Coincidences,
  Employee,
  Schedule,
  hourRangesCoincide,
  generateTable,
};
