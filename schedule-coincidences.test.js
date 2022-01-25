const { getEmployeeSchedule } = require('./schedule-coincidences');

test('Decode employee schedule text decode', () => {
  expect(getEmployeeSchedule('MO10:15-12:00')).toEqual({
    'MO': {
      from: {hour: 10, min: 15},
      to: {hour: 12, min: 0},
    },
  });

  expect(getEmployeeSchedule('MO10:15-12:00,TU10:00-12:00')).toEqual({
    'MO': {
      from: {hour: 10, min: 15},
      to: {hour: 12, min: 0},
    },
    'TU': {
      from: {hour: 10, min: 0},
      to: {hour: 12, min: 0},
    },
  });
});
