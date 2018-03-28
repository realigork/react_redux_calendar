import React, { Component } from 'react';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const calendarData = {
  year: 2018,
  month: 2,
  days: [
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 }
  ]
};

import classes from './calendar.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderWeekdays = this.renderWeekdays.bind(this);
  }

  renderWeekdays() {
    return weekdays.map((day) => {
      return <th key={day}><h3>{day}</h3></th>;
    });
  }

  render() {
    const caption = `${monthsShort[calendarData.month]}, ${calendarData.year}`;
    const renderWeekdays = this.renderWeekdays();
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

            {/* Render head: short month names */}
            <tr>
              {renderWeekdays}
            </tr>
          </thead>

          {/* Render body: days with reminders */}
        </table>
      </div>
    )
  }
}

export default Calendar;