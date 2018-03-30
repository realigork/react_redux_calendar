import React, { Component } from 'react';

import Row from './row';
import Cell from './cell';
import PopupWrapper from '../../hoc/popupWrapper';
import Popup from '../popup';
import ReminderForm from '../reminder_form';

import {
  weekdays,
  monthsShort,
  splitDaysIntoWeeks,
  getCurrentDateObj,
  getFirstDayIndex,
  getDays,
  getMonthTotal
} from '../../utils/date';

import classes from './calendar.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderWeekdays = this.renderWeekdays.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.renderDaysRow = this.renderDaysRow.bind(this);
    this.onCellClickHandler = this.onCellClickHandler.bind(this);
    this.getReminderByDay = this.getReminderByDay.bind(this);
    this.addReminder = this.addReminder.bind(this);
    this.onClosePopup = this.onClosePopup.bind(this);
    this.renderReminderForm = this.renderReminderForm.bind(this);
    this.onReminderFormInputChange = this.onReminderFormInputChange.bind(this);
  }

  componentWillMount() {
    const dateObj = getCurrentDateObj();
    const { year, month, day } = dateObj;
    const totalDays = getMonthTotal(year, month);
    const firstDayIndex = getFirstDayIndex(year, month);
    const days = getDays(totalDays, day, firstDayIndex);
    this.setState({
      details: { ...dateObj },
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
    if (!day) {
      return;
    }

    const newState = {...this.state};
    const reminders = newState.reminders.slice(0);

    const reminder = {
      start: '12:00',
      end: '13:00',
      text: 'This is a new reminder that you have a meeting',
      day,
    };

    reminders.push(reminder);
    newState.reminders = reminders;
    this.setState(newState);
  }

  onCellClickHandler(day) {
    this.setState({ showPopup: true, reminderDay: day });
  }

  onClosePopup() {
    this.setState({ showPopup: false, reminderDay: -1 });
  }

  onReminderFormInputChange(e) {
    console.log(e.target.value);
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
      const reminderItem = reminders && (reminders != null || reminders.length) ?
        reminders :
        null;

      return (
        <Cell
          key={key}
          day={item.day}
          isCurrent={item.isCurrent}
          reminders={reminderItem}
          onClick={() => { this.onCellClickHandler(item.day); }}
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
    return (
      <PopupWrapper onClick={this.onClosePopup}>
        <Popup>
          <ReminderForm
            day={this.state.reminderDay}
            onChange={this.onReminderFormInputChange}
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