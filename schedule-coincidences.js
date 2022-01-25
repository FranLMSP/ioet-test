const getEmployeesList = (textInput) => {
  let list = [];
  const lines = textInput.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const [name, scheduleText] = line.split('=');
    list.push({
      name,
      schedule: getEmployeeSchedule(scheduleText),
    });
  }

  return list;
}

const getEmployeeSchedule = (scheduleText) => {
  let days = {};
  if (!scheduleText.trim()) return {};
  const dayNames = scheduleText.split(',').map((text) => text.substring(0, 2));
  const hours = scheduleText
    .split(',')
    .map((text) => {
      const [from, to] = text.substring(2).split('-');
      return {from, to};
    });
  for (index in dayNames) {
    const day = dayNames[index];
    const hour = hours[index];
    days[day] = hour;
  }

  return days;
}

const getHourCoincidences = (employee, otherEmployees) => {
}

const processEmployeesText = (textInput) => {
  return '';
}


module.exports = { getEmployeesList, getEmployeeSchedule, getHourCoincidences };
