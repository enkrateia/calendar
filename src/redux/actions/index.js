let nextReminderId = 0
export const createReminder = reminder => ({
  type: 'CREATE_REMINDER',
  id: nextReminderId++,
  ...reminder
})

export const editReminder = reminder => ({
  type: 'EDIT_REMINDER',
  id: reminder.id,
  reminder: reminder
})

export const deleteReminder = id => ({
  type: 'DELETE_REMINDER',
  id
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
