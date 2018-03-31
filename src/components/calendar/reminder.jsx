import React from 'react';

import classes from './reminder.css';

const Reminder = ({ day, start, end, text, color }) => {
  return (
    <div className={classes.reminder} style={color}>
      <span className={classes.text}>{text}</span>
      <span className={classes.startTime}>{start}</span>
    </div>
  )
};

export default Reminder;
