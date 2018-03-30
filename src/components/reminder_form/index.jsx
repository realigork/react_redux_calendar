import React from 'react';

import classes from './reminder_form.css';

const ReminderForm = ({ day, onChange }) => {

  return (
    <form>
      <fieldset>
        <label>Day: {day}</label>
      </fieldset>

      <fieldset>
        <label>
          Start time:
          <select onChange={onChange}>
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
          <select onChange={onChange}>
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
        <label>Text: <input type="text" onChange={onChange} /></label>
      </fieldset>
    </form>
  );
};

export default ReminderForm;
