import React from 'react';
import moment from 'moment';
import Day from './Day';

export default function Monthly() {
  const weekDays = moment.weekdays()
  const totalTableDays = 35;
  const currentMonth = moment().month()
  const daysInTable = []
  let initialMonth = moment().date(1)
  if (initialMonth.weekday() !== 0) { // 0 = SUNDAY
    initialMonth = moment().month(currentMonth - 1)
    const daysInInitalMonth = initialMonth.daysInMonth()
    const weekdayLastDayInitialMonth = initialMonth.date(daysInInitalMonth).day()
    initialMonth.date(daysInInitalMonth - weekdayLastDayInitialMonth)
  }
  else {
    initialMonth = moment().date(1)
  }

  for (let day = 0; day < totalTableDays; day++) {
    const tableDay = {
      numberDay: initialMonth.date()
    }
    daysInTable.push(tableDay)
    initialMonth.date(initialMonth.date() + 1)
  }

  const Columns = (i) => {
    let columns = []
    for (let column = 0; column < 7; column++) {
      const index = (i * 7) + column
      const day = daysInTable[index]
      columns.push(<td ><Day key={index} day={day}></Day></td>)
    }
    return columns
  }

  const Rows = () => {
    let rows = []
    for (let row = 0; row < 5; row++) {
      rows.push(<tr>{Columns(row)}</tr>)
    }
    return rows
  }

  return (
    <main>
      <table>
        <thead>
          <tr>
            {weekDays.map(day => <th>{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {Rows()}
        </tbody>
      </table>
    </main>
  );
}
