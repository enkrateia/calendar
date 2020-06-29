import moment from 'moment';

export const setInitialMonth = month => {
  const currentMonth = moment().month(month);
  const firstDayInMonth = moment(currentMonth).date(1);
  if (firstDayInMonth.weekday() !== 0) {
    const previousMonth = moment().month(currentMonth.month() - 1);
    const daysInPreviousMonth = previousMonth.daysInMonth();
    const weekdayLastDayPreviousMonth = previousMonth.date(daysInPreviousMonth).day();
    return previousMonth.date(daysInPreviousMonth - weekdayLastDayPreviousMonth);
  }
  return currentMonth.date(1);
};

export const isCalendarBigger = (month, initialMonth) => {
  const visibleMonth = moment().month(month);
  const previousMonth = moment(initialMonth);

  const daysInPreviousMonth = previousMonth.daysInMonth();
  const weekdayLastDayPreviousMonth = previousMonth.date(daysInPreviousMonth).day();
  const previousMonthDays = weekdayLastDayPreviousMonth;
  const visibleMonthDays = visibleMonth.daysInMonth();
  return previousMonthDays + visibleMonthDays >= 35;
};

export const getTimeFormatted = time => {
  return moment(time).format('YYYY_MM_DD');
};

export const timerFormatWithoutSeconds = 'HH:mm';

export const reminderTimeFormat = time => moment(time).format(timerFormatWithoutSeconds);
