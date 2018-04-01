import React, { Component } from 'react';
import { connect } from 'react-redux';

import Row from './row';
import Cell from './cell';
import PopupWrapper from '../../hoc/popupWrapper';
import Popup from '../popup';
import ReminderForm from '../reminder_form';

import * as calendarActions from '../../store/actions/calendar';

import { getReminderByDate } from '../../utils/reminder';

import {
  weekdays,
  splitDaysIntoWeeks,
  sortDayReminders
} from '../../utils/date';

import classes from './calendar.css';


class Calendar extends Component {
  constructor(props) {
    super(props);

    this.renderWeekdays = this.renderWeekdays.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.renderDaysRow = this.renderDaysRow.bind(this);
    this.renderReminderForm = this.renderReminderForm.bind(this);
    this.onReminderFormInputChange = this.onReminderFormInputChange.bind(this);
  }

  onReminderFormInputChange(e) {
    const id = e.target.id;
    const value = e.target.value;
    this.props.onReminderInputChange(id, value);
  }

  renderWeekdays() {
    return weekdays.map((day) => {
      return <th key={day}><h3>{day}</h3></th>;
    });
  }

  renderDays(row) {
    return row.map((item, index) => {
      const key = `${index}${item.day}`;
      const date = {
        year: item.year,
        month: item.month,
        day: item.day
      };

      const reminders = getReminderByDate(this.props.reminders, date);
      const dayReminders = (reminders && (reminders != null || reminders.length)) ?
        sortDayReminders(reminders) :
        null;

      return (
        <Cell
          key={key}
          day={item.day}
          isCurrent={item.isCurrent}
          reminders={dayReminders}
          onClick={() => { this.props.onShowReminderForm(item.day); }}
          onReminderClick={this.props.onEditReminder}
        />
      )
    });
  }

  renderDaysRow() {
    const allDays = this.props.days.slice(0);
    const chunk = weekdays.length;
    const transformed = splitDaysIntoWeeks(allDays, chunk);

    return transformed.map((row, index) => {
      const days = this.renderDays(row);
      return <Row key={index}>{days}</Row>
    });
  }

  renderReminderForm() {
    const { reminderForm } = this.props;
    return (
      <PopupWrapper onClick={this.props.onCloseReminderForm}>
        <Popup>
          <ReminderForm
            errors={this.props.errors}
            formData={reminderForm}
            selectedColor={reminderForm.color}
            onUpdate={(e) => {
              this.props.onUpdateReminder(e, reminderForm.id)
            }}
            onRemove={(e) => {
              this.props.onRemoveReminder(e, reminderForm.id)
            }}
            onChange={this.onReminderFormInputChange}
            onSubmit={this.props.onAddReminder}
            onColorSelect={this.props.onSelectReminderColor}
            close={this.props.onCloseReminderForm}
          />
        </Popup>
      </PopupWrapper>
    );
  }

  render() {
    const { monthName, year, day } = this.props.details;
    const caption = `${monthName}, ${year}`;
    const renderWeekdays = this.renderWeekdays();
    const renderDays = this.renderDaysRow();
    let popup = null;
    if (this.props.showPopup) {
      popup = this.renderReminderForm();
    }

    return (
      <div className={classes.calendarWrapper}>
        <div className={classes.calendarMonthControls}>
          <div className={classes.calendarMonthPrev}>
            <button onClick={this.props.onSetPrevMonth}>
              <span className={classes.iconLeft}>
                <svg viewBox="0 0 500 500">
                  <g>
                    <path d="M343.022,29.845c3.102-3.101,6.978-4.651,11.241-4.651c4.263,0,8.139,1.551,11.24,4.651c6.201,6.202,6.201,16.279,0,22.48
                      L167.829,250l197.675,197.675c6.201,6.201,6.201,16.279,0,22.48c-6.202,6.201-16.279,6.201-22.481,0L134.108,261.24
                      c-6.201-6.201-6.201-16.279,0-22.48L343.022,29.845z"/>
                  </g>
                </svg>
              </span>
              Previous Month
            </button>
          </div>
          <div className={classes.calendarMonthNext}>
            <button onClick={this.props.onSetNextMonth}>
              Next Month
              <span className={classes.iconRight}>
                <svg viewBox="0 0 500 500">
                  <g>
                    <path d="M156.589,470.155c-3.101,3.101-6.977,4.651-11.241,4.651c-4.263,0-8.139-1.551-11.24-4.651
                      c-6.202-6.202-6.202-16.279,0-22.48L331.783,250L134.108,52.326c-6.202-6.202-6.202-16.279,0-22.481
                      c6.202-6.201,16.279-6.201,22.481,0L365.504,238.76c6.201,6.202,6.201,16.279,0,22.48L156.589,470.155z"/>
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </div>
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

const mapStateToProps = state => {
  return {
    details: state.details,
    reminderForm: state.reminderForm,
    reminders: state.reminders,
    errors: state.errors,
    showPopup: state.showPopup,
    days: state.days
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onShowReminderForm: (day) => {
      dispatch(calendarActions.showNewReminderForm(day));
    },
    onCloseReminderForm: () => {
      dispatch(calendarActions.closeReminderForm());
    },
    onReminderInputChange: (id, value) => {
      dispatch(calendarActions.changeReminderInput(id, value));
    },
    onSelectReminderColor: (i) => {
      dispatch(calendarActions.selectReminderColor(i));
    },
    onAddReminder: (e) => {
      e.preventDefault();
      dispatch(calendarActions.addReminder());
    },
    onEditReminder: (id) => {
      dispatch(calendarActions.editReminder(id));
    },
    onRemoveReminder: (e, id) => {
      e.preventDefault();
      dispatch(calendarActions.removeReminder(id));
    },
    onUpdateReminder: (e, id) => {
      e.preventDefault();
      dispatch(calendarActions.updateReminder(id));
    },
    onSetPrevMonth: () => {
      dispatch(calendarActions.setPrevMonth());
    },
    onSetNextMonth: () => {
      dispatch(calendarActions.setNextMonth());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
