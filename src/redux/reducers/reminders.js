import moment from 'moment';

const reminders = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_REMINDER':
      const day = moment(action.time).format('YYYY_MM_DD');
      if (!state[day]) state[day] = [];
      return {
        ...state,
        [day]: [
          ...state[day],
          {
            id: action.id,
            text: action.text,
            time: action.time,
            city: action.city,
            color: action.color,
          },
        ],
      };
    case 'EDIT_REMINDER':
      return state.map(reminder =>
        reminder.id === action.id
          ? {
            id: action.id,
            text: action.text,
            time: action.time,
            city: action.city,
            color: action.color,
          }
          : reminder
      );
    case 'DELETE_REMINDER':
      return state.filter(reminder => reminder.id !== action.id);
    default:
      return state;
  }
};

export default reminders;
