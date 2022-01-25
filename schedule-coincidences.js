const getEmployeesList = (textInput) => {
  let list = [];
  const lines = textInput.split('\n');
  for (const line of lines) {
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
  const daysTexts = scheduleText.split(',');
  for (dayText of daysTexts) {
    const dayName = dayText.substring(0, 2);
    const [from, to] = dayText
      .substring(2)
      .split('-')
      .map((hoursText) => {
        const [hours, mins] = hoursText.split(':');
        return {hours: parseInt(hours), mins: parseInt(mins)};
      });
    days[dayName] = {from, to};
  }

  return days;
}

const getHourCoincidences = (employee, otherEmployees) => {
}

const processEmployeesText = (textInput) => {
  return '';
}


module.exports = { getEmployeesList, getEmployeeSchedule, getHourCoincidences };
