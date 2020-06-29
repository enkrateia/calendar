import React from 'react';
import moment from 'moment';
import Day from './Day';
import { setInitialMonth, isCalendarBigger } from '../helpers/time';

const Monthly = ({ month = moment().month() }) => {
  const weekDays = moment.weekdays();
  const initialMonth = setInitialMonth(month);
  const isCalendarBig = isCalendarBigger(month, initialMonth);
  const Columns = row => {
    let columns = [];
    for (let column = 0; column < 7; column++) {
      const index = row * 7 + column;
      const day = {
        moment: moment(initialMonth),
      };
      columns.push(
        <td>
          <Day key={index} day={day}></Day>
        </td>
      );
      initialMonth.date(initialMonth.date() + 1);
    }
    return columns;
  };

  const Rows = () => {
    let rows = [];
    for (let row = 0; row < (isCalendarBig ? 6 : 5); row++) {
      rows.push(<tr>{Columns(row)}</tr>);
    }
    return rows;
  };

  return (
    <main>
      <table>
        <thead>
          <tr>
            {weekDays.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{Rows()}</tbody>
      </table>
    </main>
  );
};

export default Monthly;
