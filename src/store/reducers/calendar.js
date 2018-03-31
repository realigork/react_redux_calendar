import * as actions from '../actions/actions';

import {
  REMINDER_FORM_DEFAULT_DATA,
} from '../../utils/reminder';

import {
  getCurrentDateObj,
  getFirstDayIndex,
  getDays,
  getMonthTotal,
} from '../../utils/date';

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

    default:
      return state;
  }

  return state;
};

export default reducer;
