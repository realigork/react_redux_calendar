import React, { Component } from 'react';
import { connect } from 'react-redux';

import Row from './row';
import Cell from './cell';
import PopupWrapper from '../../hoc/popupWrapper';
import Popup from '../popup';
import ReminderForm from '../reminder_form';

import * as calendarActions from '../../store/actions/calendar';

import {
  getReminderIndexById,
  removeReminderByIndex,
  updateReminderByIndex,
  getReminderByDay
} from '../../utils/reminder';

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
    this.onRemoveReminder = this.onRemoveReminder.bind(this);
    this.onUpdateReminder = this.onUpdateReminder.bind(this);
  }

  onReminderFormInputChange(e) {
    const id = e.target.id;
    const value = e.target.value;
    this.props.onReminderInputChange(id, value);
  }

  onRemoveReminder(event, id) {
    event.preventDefault();
    const newState = {...this.state};
    const reminders = newState.reminders.slice(0);
    const index = getReminderIndexById(id, reminders);
    const removed = removeReminderByIndex(index, reminders);
    this.setState({ reminders: removed });
    setTimeout(this.props.onCloseReminderForm, 0);
  }

  onUpdateReminder(event, id) {
    event.preventDefault();
    const newState = {...this.state};
    const reminders = newState.reminders.slice(0);
    const reminderForm = Object.assign({}, newState.reminderForm);
    const index = getReminderIndexById(id, reminders);
    const updated = updateReminderByIndex(index, reminders, reminderForm);
    this.setState({ reminders: updated });
    setTimeout(this.props.onCloseReminderForm, 0);
  }

  renderWeekdays() {
    return weekdays.map((day) => {
      return <th key={day}><h3>{day}</h3></th>;
    });
  }

  renderDays(row) {
    return row.map((item, index) => {
      const key = `${index}${item.day}`;
      const reminders = getReminderByDay(this.props.reminders, item.day);
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
            onUpdate={(e) => { this.onUpdateReminder(e, reminderForm.id) }}
            onRemove={(e) => { this.onRemoveReminder(e, reminderForm.id) }}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
