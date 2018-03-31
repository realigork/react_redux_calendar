import React from 'react';

import classes from './fieldset.css'

const Fieldset = (props) => {
  return (
    <fieldset>
      <label className={classes.fieldRow}>
        <span className={classes.fieldLabel}>{props.label}</span>
        <div className={classes.fieldItem}>
          {props.children}
        </div>
      </label>
    </fieldset>
  );
};

export default Fieldset;