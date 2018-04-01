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
      const reminder = getReminderById(action.id, state.reminders);
      console.log(action.id);
      console.log(state.reminders);
      return {
        ...state,
        showPopup: true,
        reminderForm: {
          ...reminder,
          editing: true
        }
      };

    case actions.UPDATE_REMINDER:
      return {
        ...state
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
      const reminderForm = Object.assign({}, state.reminderForm);
      let errors = [];
      reminderForm[action.id] = action.value;

      const validated = validateReminderForm(reminderForm);
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
