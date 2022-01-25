const { getEmployeeSchedule, getEmployeesList, processEmployeesText } = require('./schedule-coincidences');

test('Decode employee schedule text list', () => {
  expect(getEmployeeSchedule('MO10:15-12:00')).toEqual({
    'MO': {
      from: '10:15',
      to: '12:00',
    },
  });

  expect(getEmployeeSchedule('MO10:15-12:00,TU10:00-12:00')).toEqual({
    'MO': {
      from: '10:15',
      to: '12:00',
    },
    'TU': {
      from: '10:00',
      to: '12:00',
    },
  });
});

test('Decode employees text list', () => {
  expect(getEmployeesList(
`RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
`
  )).toEqual([
    {
      name: 'RENE',
      schedule: {
        'MO': {
          from: '10:00',
          to: '12:00',
        },
        'TU': {
          from: '10:00',
          to: '12:00',
        },
        'TH': {
          from: '01:00',
          to: '03:00',
        },
        'SA': {
          from: '14:00',
          to: '18:00',
        },
        'SU': {
          from: '20:00',
          to: '21:00',
        },
      },
    },
    {
      name: 'ASTRID',
      schedule: {
        'MO': {
          from: '10:00',
          to: '12:00',
        },
        'TH': {
          from: '12:00',
          to: '14:00',
        },
        'SU': {
          from: '20:00',
          to: '21:00',
        },
      },
    },
    {
      name: 'ANDRES',
      schedule: {
        'MO': {
          from: '10:00',
          to: '12:00',
        },
        'TH': {
          from: '12:00',
          to: '14:00',
        },
        'SU': {
          from: '20:00',
          to: '21:00',
        },
      },
    },
  ]);

  expect(getEmployeesList(
`RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
`
  )).toEqual([
    {
      name: 'RENE',
      schedule: {
        'MO': {
          from: '10:15',
          to: '12:00',
        },
        'TU': {
          from: '10:00',
          to: '12:00',
        },
        'TH': {
          from: '13:00',
          to: '13:15',
        },
        'SA': {
          from: '14:00',
          to: '18:00',
        },
        'SU': {
          from: '20:00',
          to: '21:00',
        },
      },
    },
    {
      name: 'ASTRID',
      schedule: {
        'MO': {
          from: '10:00',
          to: '12:00',
        },
        'TH': {
          from: '12:00',
          to: '14:00',
        },
        'SU': {
          from: '20:00',
          to: '21:00',
        },
      },
    },
  ]);
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
