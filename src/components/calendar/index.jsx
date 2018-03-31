import React, { Component } from 'react';

import Row from './row';
import Cell from './cell';
import PopupWrapper from '../../hoc/popupWrapper';
import Popup from '../popup';
import ReminderForm from '../reminder_form';

import {
  REMINDER_COLORS,
  REMINDER_FORM_DEFAULT_DATA,
  getReminderById,
  getReminderIndexById,
  removeReminderByIndex,
  updateReminderByIndex
} from '../../utils/reminder';

import {
  weekdays,
  monthsShort,
  splitDaysIntoWeeks,
  getCurrentDateObj,
  getFirstDayIndex,
  getDays,
  getMonthTotal,
  sortDayReminders
} from '../../utils/date';

import classes from './calendar.css';


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderWeekdays = this.renderWeekdays.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.renderDaysRow = this.renderDaysRow.bind(this);
    this.onOpenPopup = this.onOpenPopup.bind(this);
    this.getReminderByDay = this.getReminderByDay.bind(this);
    this.addReminder = this.addReminder.bind(this);
    this.onClosePopup = this.onClosePopup.bind(this);
    this.renderReminderForm = this.renderReminderForm.bind(this);
    this.onReminderFormInputChange = this.onReminderFormInputChange.bind(this);
    this.onReminderFormSubmit = this.onReminderFormSubmit.bind(this);
    this.onReminderClickHandler = this.onReminderClickHandler.bind(this);
    this.onReminderFormColorSelect = this.onReminderFormColorSelect.bind(this);
    this.onRemoveReminder = this.onRemoveReminder.bind(this);
    this.onUpdateReminder = this.onUpdateReminder.bind(this);
  }

  componentWillMount() {
    const dateObj = getCurrentDateObj();
    const { year, month, day } = dateObj;
    const totalDays = getMonthTotal(year, month);
    const firstDayIndex = getFirstDayIndex(year, month);
    const days = getDays(totalDays, day, firstDayIndex);
    this.setState({
      details: { ...dateObj },
      reminderForm: REMINDER_FORM_DEFAULT_DATA,
      reminders: [],
      reminderDay: -1,
      showPopup: false,
      days
    });
  }

  getReminderByDay(day) {
    const newState = {...this.state};
    const reminders = newState.reminders.slice(0);
    let reminder = null;
    if (reminders.length) {
      reminder = reminders.filter((item) => {
        return item.day === day;
      });
    }

    return reminder;
  }

  addReminder() {
    if (this.state.reminderForm.day > 0) {
      const newState = {...this.state};
      const reminders = newState.reminders.slice(0);
      const reminder = Object.assign({}, newState.reminderForm);
      reminder.id = reminders.length;
      reminders.push(reminder);
      this.setState({ reminders });
    }
  }

  onOpenPopup(day) {
    const newState = {...this.state};
    const reminders = newState.reminders.slice(0);
    const reminderForm = Object.assign({}, newState.reminderForm);
    reminderForm.day = day;
    reminderForm.id = reminders.length;

    newState.reminderForm = reminderForm;
    newState.showPopup = true;
    this.setState(newState);
  }

  onClosePopup() {
    const newState = {...this.state};
    const reminderForm = Object.assign({}, newState.reminderForm);
    newState.reminderForm = REMINDER_FORM_DEFAULT_DATA;
    newState.showPopup = false;
    this.setState(newState);
  }

  onReminderFormInputChange(e) {
    const value = e.target.value;
    const id = e.target.id;
    const newState = {...this.state};
    const reminderForm = Object.assign({}, newState.reminderForm);
    reminderForm[id] = value;
    this.setState({ reminderForm });
  }

  onReminderFormColorSelect(i) {
    const newState = {...this.state};
    const reminderForm = Object.assign({}, newState.reminderForm);
    reminderForm.color = REMINDER_COLORS[i];
    this.setState({ reminderForm });
  }

  onReminderFormSubmit(e) {
    e.preventDefault();
    this.addReminder();
    setTimeout(this.onClosePopup, 0);
  }

  onRemoveReminder(event, id) {
    event.preventDefault();
    const newState = {...this.state};
    const reminders = newState.reminders.slice(0);
    const index = getReminderIndexById(id, reminders);
    const removed = removeReminderByIndex(index, reminders);
    this.setState({ reminders: removed });
    setTimeout(this.onClosePopup, 0);
  }

  onUpdateReminder(event, id) {
    event.preventDefault();
    const newState = {...this.state};
    const reminders = newState.reminders.slice(0);
    const reminderForm = Object.assign({}, newState.reminderForm);
    const index = getReminderIndexById(id, reminders);
    const updated = updateReminderByIndex(index, reminders, reminderForm);
    this.setState({ reminders: updated });
    setTimeout(this.onClosePopup, 0);
  }

  onReminderClickHandler(id) {
    const newState = {...this.state};
    const reminders = newState.reminders.slice(0);
    const reminder = getReminderById(id, reminders);
    let reminderForm = Object.assign({}, newState.reminderForm);
    reminderForm = reminder[0];
    reminderForm.editing = true;
    newState.reminderForm = reminderForm;
    newState.showPopup = true;
    this.setState(newState);
  }

  renderWeekdays() {
    return weekdays.map((day) => {
      return <th key={day}><h3>{day}</h3></th>;
    });
  }

  renderDays(row) {
    return row.map((item, index) => {
      const key = `${index}${item.day}`;
      const reminders = this.getReminderByDay(item.day);
      const dayReminders = (reminders && (reminders != null || reminders.length)) ?
        sortDayReminders(reminders) :
        null;

      return (
        <Cell
          key={key}
          day={item.day}
          isCurrent={item.isCurrent}
          reminders={dayReminders}
          onClick={() => { this.onOpenPopup(item.day); }}
          onReminderClick={this.onReminderClickHandler}
        />
      )
    });
  }

  renderDaysRow() {
    const allDays = this.state.days.slice(0);
    const chunk = weekdays.length;
    const transformed = splitDaysIntoWeeks(allDays, chunk);

    return transformed.map((row, index) => {
      const days = this.renderDays(row);
      return <Row key={index}>{days}</Row>
    });
  }

  renderReminderForm() {
    const { reminderForm } = this.state;
    return (
      <PopupWrapper onClick={this.onClosePopup}>
        <Popup>
          <ReminderForm
            formData={reminderForm}
            selectedColor={reminderForm.color}
            onUpdate={(e) => { this.onUpdateReminder(e, reminderForm.id) }}
            onRemove={(e) => { this.onRemoveReminder(e, reminderForm.id) }}
            onChange={this.onReminderFormInputChange}
            onSubmit={this.onReminderFormSubmit}
            onColorSelect={this.onReminderFormColorSelect}
            close={this.onClosePopup}
          />
        </Popup>
      </PopupWrapper>
    );
  }

  render() {
    const { monthName, year, day } = this.state.details;
    const caption = `${monthName}, ${year}`;
    const renderWeekdays = this.renderWeekdays();
    const renderDays = this.renderDaysRow();
    let popup = null;
    if (this.state.showPopup) {
      popup = this.renderReminderForm();
    }
    return (
      <div className={classes.calendarWrapper}>
        <table className={classes.calendar}>
          <thead>
            <tr>
              <th colSpan="7">
                <h2>{caption}</h2>
              </th>
            </tr>
            <tr>
              {renderWeekdays}
            </tr>
          </thead>

          <tbody>
            {renderDays}
          </tbody>
        </table>

        {popup}
      </div>
    )
  }
}

export default Calendar;