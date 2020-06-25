import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Day from './Day';
import { editReminder, deleteReminder } from '../redux/actions';

const Monthly = ({ reminders, editReminder, deleteReminder }) => {
  const weekDays = moment.weekdays();
  const currentMonth = moment().month();
  let initialMonth = moment().date(1);
  if (initialMonth.weekday() !== 0) {
    initialMonth = moment().month(currentMonth - 1);
    const daysInInitalMonth = initialMonth.daysInMonth();
    const weekdayLastDayInitialMonth = initialMonth.date(daysInInitalMonth).day();
    initialMonth.date(daysInInitalMonth - weekdayLastDayInitialMonth);
  } else {
    initialMonth = moment().date(1);
  }

  const Columns = i => {
    let columns = [];
    for (let column = 0; column < 7; column++) {
      const index = i * 7 + column;
      const day = {
        numberDay: initialMonth.date(),
      };
      const dayReminders = reminders[initialMonth.format('YYYY_MM_DD')];
      columns.push(
        <td>
          <Day key={index} day={day} reminders={dayReminders} onDelete={deleteReminder}></Day>
        </td>
      );
      initialMonth.date(initialMonth.date() + 1);
    }
    return columns;
  };

  const Rows = () => {
    let rows = [];
    for (let row = 0; row < 5; row++) {
      rows.push(<tr>{Columns(row)}</tr>);
    }
    return rows;
  };

  return (
    <main>
      <table>
        <thead>
          <tr>
            {weekDays.map(day => (
              <th>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{Rows()}</tbody>
      </table>
    </main>
  );
};

const mapStateToProps = state => ({
  reminders: state.reminders,
});

const mapDispatchToProps = dispatch => ({
  editReminder: reminder => dispatch(editReminder(reminder)),
  deleteReminder: id => dispatch(deleteReminder(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Monthly);
