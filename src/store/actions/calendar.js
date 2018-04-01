import {
  ADD_REMINDER,
  EDIT_REMINDER,
  UPDATE_REMINDER,
  REMINDER_INPUT_CHANGE,
  SHOW_NEW_REMINDER_FORM,
  CLOSE_REMINDER_FORM
} from './actions';

export const reminderInputChange = (id, value) => {
  return {
    type: REMINDER_INPUT_CHANGE,
    id,
    value
  }
};

export const showNewReminderForm = (day) => {
  return {
    type: SHOW_NEW_REMINDER_FORM,
    day
  }
};

export const closeReminderForm = () => {
  return {
    type: CLOSE_REMINDER_FORM
  }
};
