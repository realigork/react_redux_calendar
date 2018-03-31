import React from 'react';
import Reminder from './reminder';

import classes from './cell.css';

const Cell = ({
  day,
  isCurrent,
  onClick,
  reminders,
  onReminderClick
}) => {
  let cellClass = classes.cell;
  if (day === '') {
    cellClass = classes.cellInactive;
  }

  const dayClass = isCurrent ? classes.dayActive : classes.day;

  let reminderList = null;
  if (reminders && (reminders.length || reminders !== null)) {
    reminderList = reminders.map((item, index) => {
      return (
        <Reminder
          key={item.id}
          id={item.id}
          onClick={() => { onReminderClick(item.id); }}
          {...item}
        />
      );
    });
  }

  return (
    <td className={cellClass}>
      <h4 className={dayClass}>{day}</h4>
      {reminderList}
      <div className={classes.reminderBtn} onClick={onClick}>
        <span className={classes.reminderIcon}>
          <svg
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 55 55"
          >
            <g>
              {/* eslint-disable */}
              <path d="M51.376,45.291C46.716,40.66,44.354,35.179,44.354,29v-8.994c0.043-6.857-4.568-11.405-8.53-13.216
                c-1.135-0.519-2.305-0.919-3.494-1.216V5c0-2.757-2.243-5-5-5s-5,2.243-5,5v0.661c-1.071,0.289-2.124,0.666-3.146,1.138
                C14.805,8.817,10.369,13.681,10.329,20v9c0,6.388-2.256,11.869-6.705,16.291c-0.265,0.264-0.361,0.653-0.249,1.01
                s0.415,0.621,0.784,0.685l9.491,1.639c1.768,0.305,3.396,0.555,4.945,0.761C20.341,52.806,23.768,55,27.512,55
                c3.745,0,7.173-2.196,8.917-5.618c1.543-0.205,3.163-0.454,4.921-0.758l9.49-1.639c0.369-0.063,0.671-0.328,0.784-0.685
                C51.737,45.944,51.641,45.555,51.376,45.291z M24.329,5c0-1.654,1.346-3,3-3s3,1.346,3,3v0.182c-1.993-0.286-4.015-0.274-6,0.047V5
                z M27.512,53c-2.532,0-4.898-1.258-6.417-3.315c2.235,0.23,4.321,0.346,6.406,0.346c2.093,0,4.186-0.116,6.43-0.349
                C32.411,51.741,30.044,53,27.512,53z M41.01,46.653c-1.919,0.331-3.678,0.6-5.34,0.812c-0.002,0-0.004,0-0.006,0
                c-0.732,0.093-1.444,0.174-2.141,0.244c-0.007,0.001-0.015,0.001-0.022,0.002c-0.637,0.064-1.26,0.115-1.876,0.16
                c-0.117,0.009-0.233,0.016-0.35,0.024c-0.534,0.035-1.062,0.063-1.587,0.083c-0.108,0.004-0.216,0.01-0.324,0.013
                c-1.244,0.042-2.471,0.042-3.714,0.001c-0.11-0.004-0.222-0.009-0.332-0.014c-0.518-0.02-1.04-0.047-1.567-0.082
                c-0.124-0.008-0.248-0.016-0.373-0.025c-0.6-0.043-1.207-0.094-1.828-0.155c-0.022-0.002-0.043-0.004-0.064-0.006
                c-0.692-0.069-1.399-0.15-2.126-0.242c-0.003,0-0.006,0-0.009,0c-1.668-0.211-3.433-0.482-5.361-0.814L6.329,45.33
                c3.983-4.554,6-10.038,6-16.33v-8.994c0.034-5.435,3.888-9.637,7.691-11.391c1.131-0.521,2.304-0.91,3.497-1.183
                c0.01-0.002,0.021-0.001,0.031-0.003c2.464-0.554,5.087-0.579,7.58-0.068c0.013,0.003,0.026-0.003,0.039-0.001
                c1.304,0.272,2.588,0.684,3.825,1.249c3.689,1.687,7.396,5.861,7.361,11.392v9c0,6.033,2.175,11.643,6.313,16.331L41.01,46.653z"/>
              <path d="M33.746,11.338c-3.875-1.771-8.62-1.773-12.469,0.002c-2.195,1.012-5.918,3.973-5.948,8.654
                c-0.003,0.552,0.441,1.002,0.994,1.006c0.002,0,0.004,0,0.006,0c0.549,0,0.997-0.443,1-0.994c0.023-3.677,3.019-6.035,4.785-6.85
                c3.331-1.537,7.446-1.533,10.799,0c0.502,0.23,1.096,0.009,1.326-0.493C34.469,12.16,34.248,11.567,33.746,11.338z"/>
            {/* eslint-enable */}
            </g>
          </svg>
        </span>
      </div>
    </td>
  );
};

export default Cell;
