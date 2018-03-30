import React from 'react';

import classes from './reminder_form.css';

const ReminderForm = ({ day, onChange, onSubmit }) => {

  return (
    <div className={classes.reminderForm}>
      <h3 className={classes.day}>Day: {day}</h3>

      <form>
        <fieldset>
          <label>
            Start time:
            <select id="start" onChange={onChange}>
              <option>09:00</option>
              <option>10:00</option>
              <option>11:00</option>
              <option>12:00</option>
              <option>13:00</option>
              <option>14:00</option>
              <option>15:00</option>
              <option>16:00</option>
              <option>17:00</option>
              <option>18:00</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <label>
            End time:
            <select id="end" onChange={onChange}>
              <option>10:00</option>
              <option>11:00</option>
              <option>12:00</option>
              <option>13:00</option>
              <option>14:00</option>
              <option>15:00</option>
              <option>16:00</option>
              <option>17:00</option>
              <option>18:00</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <label>Text: <input type="text" id="text" onChange={onChange} /></label>
        </fieldset>

        <button className={classes.submitBtn} onClick={onSubmit}>Add</button>
      </form>
    </div>
  );
};

export default ReminderForm;
