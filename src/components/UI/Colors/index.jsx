import React from 'react';

import { REMINDER_COLORS } from '../../../utils/reminder';

import classes from './colors.css';

const Colors = ({ selected, onSelect }) => {
  return (
    <ul className={classes.colors}>
      {REMINDER_COLORS.map((style, index) => {
        const colorClass = selected && selected.id === style.id ?
          classes.colorSelected :
          classes.color;

        return (
          <li
            key={style.id}
            className={colorClass}
            style={style}
            onClick={() => { onSelect(index); }}
          />
        );
      })}
    </ul>
  )
};

export default Colors;
