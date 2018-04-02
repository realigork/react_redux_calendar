import React from 'react';

import Input from '../UI/Input';
import Fieldset from '../UI/Form/Fieldset';
import FieldsetButton from '../UI/Form/Fieldset/fieldset_button';
import Colors from '../UI/Colors';
import { generateDayHours } from '../../utils/date';

import classes from './reminder_form.css';

const ReminderForm = (props) => {
  const {
    errors,
    formData,
    onChange,
    onSubmit,
    onUpdate,
    onRemove,
    onColorSelect,
    selectedColor,
    close
  } = props;

  let controls = null;
  let isDisabled = errors.length > 0;
  if (formData.editing) {
    controls = (
      <div className="btn-group">
        <button
          className={classes.submitBtn}
          onClick={onUpdate}
          disabled={isDisabled}
        >
          Update
        </button>
        <button className="btn-alt" onClick={onRemove}>
          Remove
        </button>
      </div>
    );
  } else {
    controls = (
      <button
        className={classes.submitBtn}
        onClick={onSubmit}
        disabled={isDisabled}
      >
        Add
      </button>
    )
  }

  return (
    <div className={classes.reminderForm}>
      <div className={classes.reminderFormHeader}>
        <h3 className={classes.day}>Day: {formData.day}</h3>
        <div className={classes.reminderClose}>
          <span className={classes.reminderCloseBtn} onClick={close}>
            <svg viewBox="0 0 64 64">
              <g>
                {/* eslint-disable */}
                <path
                  d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z"
                />
                {/* eslint-enable */}
              </g>
            </svg>
          </span>
        </div>
      </div>

      <form>
        <Fieldset label="start" errors={errors}>
          <Input
            id="start"
            type="select"
            onChange={onChange}
            data={generateDayHours()}
            selected={formData.start}
          />
        </Fieldset>

        <Fieldset label="end" errors={errors}>
          <Input
            id="end"
            type="select"
            onChange={onChange}
            data={generateDayHours()}
            selected={formData.end}
          />
        </Fieldset>

        <Fieldset label="colour" errors={errors}>
          <Colors selected={selectedColor} onSelect={onColorSelect} />
        </Fieldset>

        <Fieldset label="text" errors={errors}>
          <Input
            type="text"
            id="text"
            onChange={onChange}
            data={{value: formData.text}}
          />
        </Fieldset>

        <FieldsetButton>
          {controls}
        </FieldsetButton>
      </form>
    </div>
  );
};

export default ReminderForm;
