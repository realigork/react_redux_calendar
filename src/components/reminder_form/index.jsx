import React from 'react';

import { REMINDER_COLORS } from '../../utils/reminder';

import classes from './reminder_form.css';

const ReminderForm = (props) => {
  const {
    day,
    isEditing,
    onChange,
    onSubmit,
    onUpdate,
    onRemove,
    onColorSelect,
    selectedColor,
    close
  } = props;

  let controls = null;
  if (isEditing) {
    controls = (
      <div className="btn-group">
        <button className={classes.submitBtn} onClick={onUpdate}>
          Update
        </button>
        <button className="btn-alt" onClick={onUpdate}>
          Remove
        </button>
      </div>
    );
  } else {
    controls = (
      <button className={classes.submitBtn} onClick={onSubmit}>
        Add
      </button>
    )
  }

  return (
    <div className={classes.reminderForm}>
      <div className={classes.reminderFormHeader}>
        <h3 className={classes.day}>Day: {day}</h3>
        <span className={classes.reminderCloseBtn} onClick={close}>
          <svg viewBox="0 0 64 64">
            <g>
              {/* eslint-disable */}
              <path
                fill="#1D1D1B"
                d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z"
              />
              {/* eslint-enable */}
            </g>
          </svg>
        </span>
      </div>

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
                {REMINDER_COLORS.map((style, index) => {
                  const colorClass = selectedColor && selectedColor.id === style.id ?
                    classes.reminderColorSelected :
                    classes.reminderColor;

                  return (
                    <li
                      key={style.id}
                      className={colorClass}
                      style={style}
                      onClick={() => { onColorSelect(index); }}
                    />
                  );
                })}
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
              {controls}
            </div>
          </label>
        </fieldset>
      </form>
    </div>
  );
};

export default ReminderForm;
