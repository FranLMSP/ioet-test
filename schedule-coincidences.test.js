const {
  Coincidences,
  Employee,
  Schedule,
  hourRangesCoincide,
  generateTable,
} = require('./schedule-coincidences');

test('Decode schedule text list', () => {
  expect(new Schedule('MO10:15-12:00')).toEqual({
    days: {
      'MO': '10:15-12:00',
    },
  });

  expect(new Schedule('MO10:15-12:00,TU10:00-12:00')).toEqual({
    days: {
      'MO': '10:15-12:00',
      'TU': '10:00-12:00',
    },
  });
});

test('Decode employees text list', () => {
  expect(new Employee('RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00'))
    .toEqual({
      name: 'RENE',
      schedule: {
        days: {
          'MO': '10:00-12:00',
          'TU': '10:00-12:00',
          'TH': '01:00-03:00',
          'SA': '14:00-18:00',
          'SU': '20:00-21:00',
        },
      },
    });

  expect(new Employee('ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'))
    .toEqual({
      name: 'ASTRID',
      schedule: {
        days: {
          'MO': '10:00-12:00',
          'TH': '12:00-14:00',
          'SU': '20:00-21:00',
        },
      },
    });

  expect(new Employee('ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'))
    .toEqual({
      name: 'ANDRES',
      schedule: {
        days: {
          'MO': '10:00-12:00',
          'TH': '12:00-14:00',
          'SU': '20:00-21:00',
        },
      },
    });
});

test('Test hour range coincidence', () => {
  expect(hourRangesCoincide('20:00-21:00', '20:00-21:00')).toBe(true);
  expect(hourRangesCoincide('01:00-04:00', '02:00-05:00')).toBe(true);
  expect(hourRangesCoincide('01:00-04:00', '02:00-05:00')).toBe(true);
  expect(hourRangesCoincide('20:00-21:00', '21:15-22:15')).toBe(false);
  expect(hourRangesCoincide('10:00-12:00', '08:00-09:00')).toBe(false);
  expect(hourRangesCoincide('10:00-12:00', '12:00-14:00')).toBe(false);
  expect(hourRangesCoincide('10:00-12:00', '09:00-10:00')).toBe(false);
});

test('Count schedule coincidences', () => {
  let a = new Schedule('MO10:00-12:00');
  let b = new Schedule('MO12:10-13:10');
  expect(a.countCoincidences(b)).toBe(0);

  a = new Schedule('MO10:00-12:00');
  b = new Schedule('TU10:00-12:00');
  expect(a.countCoincidences(b)).toBe(0);

  a = new Schedule('MO10:00-12:00');
  b = new Schedule('MO10:00-12:00');
  expect(a.countCoincidences(b)).toBe(1);

  a = new Schedule('MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00 ');
  b = new Schedule('MO10:00-12:00,TH12:00-14:00,SU20:00-21:00');
  expect(a.countCoincidences(b)).toBe(2);
});

test('Map employees coincidences', () => {
  const employeeA = new Employee('ASTRID=MO10:00-12:00');
  const employeeB = new Employee('ANDRES=MO10:00-12:00');
  const coincidences = new Coincidences([employeeA, employeeB]);
  expect(coincidences).toEqual({
    coincidences: [
      {
        employeeA,
        employeeB,
        count: 1,
      },
    ],
  });

  expect(coincidences.toTable()).toEqual('ASTRID-ANDRES: 1');
})

test('Test process the text input', () => {
  /* expect(generateTable(
`RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00`
  )).toEqual(
`ASTRID-RENE: 2
ASTRID-ANDRES: 3
RENE-ANDRES: 2`
  ); */
  expect(generateTable(
`RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00`
  )).toEqual(
`RENE-ASTRID: 2
RENE-ANDRES: 2
ASTRID-ANDRES: 3`
  );

  expect(generateTable(
`RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00`
  )).toEqual(
`RENE-ASTRID: 3`
  );
});
