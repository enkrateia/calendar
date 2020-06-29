import { getTimeFormatted } from '../../helpers/time';

const reminders = (state = {}, action) => {
  const day = getTimeFormatted(action.time);
  switch (action.type) {
    case 'CREATE_REMINDER':
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
      return {
        ...state,
        [day]: state[day].map(reminder =>
          reminder.id === action.id
            ? {
                id: action.id,
                text: action.text,
                time: action.time,
                city: action.city,
                color: action.color,
              }
            : reminder
        ),
      };
    case 'DELETE_REMINDER':
      return {
        ...state,
        [day]: state[day].filter(reminder => reminder.id !== action.id),
      };
    case 'DELETE_REMINDER_DAY':
      return {
        ...state,
        [day]: [],
      };
    default:
      return state;
  }
};

export default reminders;
