import * as actions from '../actions/actions';

import {
  REMINDER_FORM_DEFAULT_DATA,
  REMINDER_COLORS,
  getReminderById
} from '../../utils/reminder';

import {
  getCurrentDateObj,
  getFirstDayIndex,
  getDays,
  getMonthTotal,
} from '../../utils/date';

import {
  validateReminderForm
} from '../../utils/validation';

const dateObj = getCurrentDateObj();
const { year, month, day } = dateObj;
const totalDays = getMonthTotal(year, month);
const firstDayIndex = getFirstDayIndex(year, month);
const days = getDays(totalDays, day, firstDayIndex);

const initialState = {
  details: { ...dateObj },
  reminderForm: REMINDER_FORM_DEFAULT_DATA,
  reminders: [],
  errors: [],
  showPopup: false,
  days
};

const reducer = (state = initialState, action) => {
  let reminders, reminder, reminderForm, errors, index;
  let validated = [];

  switch(action.type) {
    case actions.ADD_REMINDER:
      return {
        ...state,
        reminders: [
          ...state.reminders,
          {
            ...state.reminderForm,
            id: state.reminders.length
          }
        ],
        reminderForm: REMINDER_FORM_DEFAULT_DATA,
        showPopup: false
      };

    case actions.EDIT_REMINDER:
      reminder = getReminderById(action.id, state.reminders);
      return {
        ...state,
        showPopup: true,
        reminderForm: {
          ...reminder,
          editing: true
        }
      };

    case actions.REMOVE_REMINDER:
      reminders = state.reminders.slice(0);
      index = reminders.findIndex(item => item.id === action.id);

      return {
        ...state,
        reminders: [
          ...state.reminders.slice(0, index),
          ...state.reminders.slice(index+1,)
        ],
        reminderForm: REMINDER_FORM_DEFAULT_DATA,
        showPopup: false
      };

    case actions.UPDATE_REMINDER:
      reminders = state.reminders.slice(0);
      index = reminders.findIndex(item => item.id === action.id);
      console.log(state.reminderForm);

      return {
        ...state,
        reminders: [
          ...state.reminders.slice(0, index),
          {...state.reminderForm},
          ...state.reminders.slice(index+1,)
        ],
        reminderForm: REMINDER_FORM_DEFAULT_DATA,
        showPopup: false
      };

    case actions.SHOW_NEW_REMINDER_FORM:
      return {
        ...state,
        reminderForm: {
          ...state.reminderForm,
          day: action.day,
          id: state.reminders.length
        },
        showPopup: true
      };

    case actions.CLOSE_REMINDER_FORM:
      return {
        ...state,
        reminderForm: REMINDER_FORM_DEFAULT_DATA,
        showPopup: false
      }

    case actions.CHANGE_REMINDER_INPUT:
      reminderForm = Object.assign({}, state.reminderForm);
      errors = [];
      reminderForm[action.id] = action.value;

      validated = validateReminderForm(reminderForm);
      if (validated.length) {
        errors = validated;
      }

      return {
        ...state,
        errors: [...errors],
        reminderForm: {...reminderForm}
      }

    case actions.SELECT_REMINDER_COLOR:
      return {
        ...state,
        reminderForm: {
          ...state.reminderForm,
          color: REMINDER_COLORS[action.index]
        }
      }

    default:
      return state;
  }

  return state;
};

export default reducer;
