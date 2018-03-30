import React, { Component } from 'react';

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
  }

  componentWillMount() {
    const dateObj = getCurrentDateObj();
    const totalDays = getMonthTotal(dateObj.year, dateObj.month);
    const firstDayIndex = getFirstDayIndex(dateObj.year, dateObj.month);
    const days = getDays(totalDays, firstDayIndex);
    this.setState({
      details: { ...dateObj },
      days
    });
  }

  renderWeekdays() {
    return weekdays.map((day) => {
      return <th key={day}><h3>{day}</h3></th>;
    });
  }

  renderDays(row) {
    return row.map((item, index) => {
      return <td key={item.day}>{item.day}</td>
    });
  }

  renderDaysRow() {
    const allDays = this.state.days.slice(0);
    const chunk = weekdays.length;
    const transformed = splitDaysIntoWeeks(allDays, chunk);

    return transformed.map((row, index) => {
      const days = this.renderDays(row);
      return <tr key={index}>{days}</tr>
    });
  }

  render() {
    const { monthName, year } = this.state.details;
    const caption = `${monthName}, ${year}`;
    const renderWeekdays = this.renderWeekdays();
    const renderDays = this.renderDaysRow();
    return (
      <div className={classes.calendarWrapper}>
        <table className={classes.calendar}>
          {/* Render caption: Month, Year */}
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
      </div>
    )
  }
}

export default Calendar;