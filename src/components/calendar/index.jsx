import React, { Component } from 'react';

class Calendar extends Component {
  render() {
    return (
      <div className={classes.calendarWrapper}>
        <table className={classes.calendar}>
          {/* Render caption: Month, Year */}

          {/* Render head: short month names */}

          {/* Render body: days with reminders */}
        </table>
      </div>
    )
  }
}

export default Calendar;