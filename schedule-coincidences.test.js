const { getEmployeeSchedule } = require('./schedule-coincidences');

test('Decode employee schedule text decode', () => {
  expect(getEmployeeSchedule('MO10:15-12:00')).toEqual({
    'MO': {
      from: {hours: 10, mins: 15},
      to: {hours: 12, mins: 0},
    },
  });

  expect(getEmployeeSchedule('MO10:15-12:00,TU10:00-12:00')).toEqual({
    'MO': {
      from: {hours: 10, mins: 15},
      to: {hours: 12, mins: 0},
    },
    'TU': {
      from: {hours: 10, mins: 0},
      to: {hours: 12, mins: 0},
    },
  });
});

/* test('Test process the text input', () => {
  expect(processEmployeesText(
`RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
`
  )).toEqual(
`
ASTRID-RENE: 2
ASTRID-ANDRES: 3
RENE-ANDRES: 2
`
  );

  expect(processEmployeesText(
`RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
`
  )).toEqual(
`RENE-ASTRID: 3
`
  );
}); */
