import React from 'react';

import classes from './reminder_form.css';

const ReminderForm = ({ day, onChange, onSubmit }) => {

  return (
    <div className={classes.reminderForm}>
      <h3 className={classes.day}>Day: {day}</h3>

      <form>
        <fieldset>
          <label className={classes.fieldRow}>
            <span className={classes.fieldLabel}>Start time:</span>
            <div className={classes.fieldItem}>
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
            </div>
          </label>
        </fieldset>

        <fieldset>
          <label className={classes.fieldRow}>
            <span className={classes.fieldLabel}>End time:</span>
            <div className={classes.fieldItem}>
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
            </div>
          </label>
        </fieldset>

        <fieldset>
          <label className={classes.fieldRow}>
            <span className={classes.fieldLabel}>Colour:</span>
            <div className={classes.fieldItem}>
              <ul className={classes.reminderColorList}>
                <li className={classes.reminderYellow}></li>
                <li className={classes.reminderGreen}></li>
                <li className={classes.reminderBlue}></li>
                <li className={classes.reminderRed}></li>
              </ul>
            </div>
          </label>
        </fieldset>

        <fieldset>
          <label className={classes.fieldRow}>
            <span className={classes.fieldLabel}>Text:</span>
            <div className={classes.fieldItem}>
              <input type="text" id="text" onChange={onChange} />
            </div>
          </label>
        </fieldset>

        <fieldset>
          <label className={classes.fieldRow}>
            <span className={classes.fieldLabel}></span>
            <div className={classes.fieldItem}>
              <button className={classes.submitBtn} onClick={onSubmit}>Add</button>
            </div>
          </label>
        </fieldset>
      </form>
    </div>
  );
};

export default ReminderForm;
