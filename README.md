# Test for ioet
This is a coding test for the ioet company.

## How to run
First, clone the repository
```
git clone https://github.com/FranLMSP/ioet-test.git
cd ioet-test
```
Install the `jest` dependency with `npm` or `yarn`
```bash
npm install
```
or
```bash
yarn install
```
Run the unit tests with
```bash
npm run test
```
or
```bash
yarn test
```
And execute the program with
```bash
node index.js filename.txt
```

# The Problem
The company ACME offers their employees the flexibility to work the hours they want. But due to some external circumstances they need to know what employees have been at the office within the same time frame

The goal of this exercise is to output a table containing pairs of employees and how often they have coincided in the office.

Input: the name of an employee and the schedule they worked, indicating the time and hours. This should be a .txt file with at least five sets of data. You can include the data from our examples below:

- Example 1:

INPUT
```
RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
```
OUTPUT:
```
ASTRID-RENE: 2
ASTRID-ANDRES: 3
RENE-ANDRES: 2
```

- Example 2:
INPUT:
```
RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
```
OUTPUT:
```
RENE-ASTRID: 3
```

# Solving the problem
_"Divide and conquer!"_

## 1. Abstract the data such that it's easier to manipulate
The first step is to map the employees names and their schedules so you can compare them.

```
Employee {
  name: 'ASTRID',
  schedule: Schedule {
    'MO': '10:00-12:00'
  }
}
```
## 2. Comparing the schedules
First, we loop through the days and we chech if the day of one schedule exists in the other one
```javascript
// Go throught each day
for (const day in this.days) {
  // If the day doesn't exist on the other schedule, we continue to the next day
  if (!otherSchedule.days[day]) continue;
  // If the day exist on the other schedule, but the times between them doesn't coincide, we go to the next day 
  if (!hourRangesCoincide(this.days[day], otherSchedule.days[day])) continue;
  // We add one to the total of coincidences
  total += 1;
}
```

## 3. Comparing the times
Given two time ranges: `A: 10:00-12:00` and `B: 11:00-13:00`, we can consider that we have a coincidence if any of this two conditions are met
```
time A: |-----|
time B:    |-----|
```
- If the _end_ of time A is higher than the _start_ of the time B, and if the _end_ of time A is lower than the _end_ of the of time B, then we have a coincidence!
- If the _start_ of time B is higher than the _start_ of the time A, and if the _start_ of time B is _lower_ than the _end_ of the of time A, then this is also a coincidence!

But how do we implement this as code?

Thankfully, Javascript allows us to convert time to an integer number, so that `new Date(2000 10:00).getTime()` is an integer number `946720800000` that we can easily compare.
The implementation would be this:
```javascript
  const [timeFromA, timeToA] = a.split('-').map((time) => (new Date(`2000-01-01 ${time}`)).getTime());
  const [timeFromB, timeToB] = b.split('-').map((time) => (new Date(`2000-01-01 ${time}`)).getTime());
  const coincide = (timeToA >= timeFromB && timeToA <= timeToB) ||
                   (timeFromB >= timeFromA && timeFromB <= timeToA);
```

## 4. Getting a list of the coincidences
The goal is to get a list of coincidences like this
```
{
  employeeA,
  employeeB,
  count: 2
}
```
So it's easier to convert it to any other format we want.
Basically we loop through the employees list, and we compare each employee to the other ones.

```javascript
  let coincidences = {};

  // We loop through the list
  for (const employee of employeesList) {
    // We compare the employee against the other employees that we want to compare with
    const compareList = employeesList.filter((e) => {
      // We don't need to compare with the same employee
      e.name != employee.name &&
      // Check whether the employee was already compared
      !coincidences[`${e.name}-${employee.name}`] && !coincidences[`${e.name}-${employee.name}`]);
    for (const othereEmployee of compareList) {
      // Get the amount of coincidences between the schedules
      const count = employee.schedule.countCoincidences(othereEmployee.schedule);
      // We don't want to add the employees to the list if there are no coincidences
      if (count <= 0) continue;
      // We save the employees and the coincidences count in a map with the key EMPLOYEE-EMPLOYEE so we can check latter if they were already compared
      const coincidenceKey = `${employee.name}-${othereEmployee.name}`;
      coincidences[coincidenceKey] = {
        employeeA: employee,
        employeeB: othereEmployee,
        count,
      }
    }
  }
```
And we convert the map to a list with
```
Object.values(coincidences);
```

## 5. Output
And finally we just print the result!
```
const table = this.coincidences
      .map((coincidence) => `${coincidence.employeeA.name}-${coincidence.employeeB.name}: ${coincidence.count}`)
      .join('\n');
```
