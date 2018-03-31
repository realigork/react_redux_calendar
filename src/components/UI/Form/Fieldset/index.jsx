import React from 'react';

import classes from './fieldset.css'

const Fieldset = (props) => {
  let fieldClass = classes.field;
  let errorMsg = null;
  if (props.errors && props.errors.length) {
    const error = props.errors.filter((error) => {
      return error.field === props.label;
    });

    if (error.length) {
      fieldClass = classes.fieldError;
      errorMsg = (<span className={classes.error}>{error[0].message}</span>);
    }
  }
  return (
    <fieldset className={fieldClass}>
      <label className={classes.fieldRow}>
        <span className={classes.fieldLabel}>{props.label}</span>
        <div className={classes.fieldItem}>
          {props.children}
          {errorMsg}
        </div>
      </label>
    </fieldset>
  );
};

export default Fieldset;
