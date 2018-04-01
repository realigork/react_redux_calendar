import * as actions from '../actions/actions';

import {
  REMINDER_FORM_DEFAULT_DATA,
  REMINDER_COLORS,
  getReminderById
} from '../../utils/reminder';

import {
  getDateObj,
  getCurrentDateObj,
  getFirstDayIndex,
  getDays,
  getMonthTotal,
} from '../../utils/date';

import {
  validateReminderForm
} from '../../utils/validation';

const dateObj = getCurrentDateObj();
const currentDate = {
  year: dateObj.year,
  month: dateObj.month,
  day: dateObj.day
};

const days = getDays(dateObj.year, dateObj.month, currentDate);

const initialState = {
  details: {...dateObj},
  reminderForm: REMINDER_FORM_DEFAULT_DATA,
  reminders: [],
  errors: [],
  showPopup: false,
  currentDate,
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
        errors: [],
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
          year: state.details.year,
          month: state.details.month,
          day: action.day,
          id: state.reminders.length
        },
        showPopup: true,
        errors: []
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

    case actions.SET_PREV_MONTH:
      const prevDate = getDateObj(state.details.year, state.details.month-1, state.details.day);
      const prevDays = getDays(prevDate.year, prevDate.month, state.currentDate);
      return {
        ...state,
        details: {...prevDate},
        days: prevDays
      };

    case actions.SET_NEXT_MONTH:
      const nextDate = getDateObj(state.details.year, state.details.month+1, state.details.day);
      const nextDays = getDays(nextDate.year, nextDate.month, state.currentDate);
      return {
        ...state,
        details: {...nextDate},
        days: nextDays
      };

    default:
      return state;
  }

  return state;
};

export default reducer;
