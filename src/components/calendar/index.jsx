import React, { Component } from 'react';

import Row from './row';
import Cell from './cell';

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
  }

  componentWillMount() {
    const dateObj = getCurrentDateObj();
    const { year, month, day } = dateObj;
    const totalDays = getMonthTotal(year, month);
    const firstDayIndex = getFirstDayIndex(year, month);
    const days = getDays(totalDays, day, firstDayIndex);
    this.setState({
      details: { ...dateObj },
      days
    });
  }

  onCellClickHandler(index) {
    console.log(index)
  }

  renderWeekdays() {
    return weekdays.map((day) => {
      return <th key={day}><h3>{day}</h3></th>;
    });
  }

  renderDays(row) {
    return row.map((item, index) => {
      const key = `${index}${item.day}`;
      return (
        <Cell
          key={key}
          day={item.day}
          isCurrent={item.isCurrent}
          onClick={(e) => { this.onCellClickHandler(e); }}
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

  render() {
    const { monthName, year } = this.state.details;
    const caption = `${monthName}, ${year}`;
    const renderWeekdays = this.renderWeekdays();
    const renderDays = this.renderDaysRow();
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
      </div>
    )
  }
}

export default Calendar;