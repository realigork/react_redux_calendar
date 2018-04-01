import * as actions from './actions';


export const addReminder = () => {
  return {
    type: actions.ADD_REMINDER
  }
};

export const editReminder = (id) => {
  return {
    type: actions.EDIT_REMINDER,
    id
  }
};

export const updateReminder = () => {
  return {
    type: actions.UPDATE_REMINDER
  }
};

export const removeReminder = (id) => {
  return {
    type: actions.REMOVE_REMINDER,
    id
  }
}

export const changeReminderInput = (id, value) => {
  return {
    type: actions.CHANGE_REMINDER_INPUT,
    id,
    value
  }
};

export const selectReminderColor = (index) => {
  return {
    type: actions.SELECT_REMINDER_COLOR,
    index
  }
};

export const showNewReminderForm = (day) => {
  return {
    type: actions.SHOW_NEW_REMINDER_FORM,
    day
  }
};

export const closeReminderForm = () => {
  return {
    type: actions.CLOSE_REMINDER_FORM
  }
};
