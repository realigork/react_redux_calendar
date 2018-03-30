import React from 'react';

import classes from './cell.css';

const Cell = ({ day, isCurrent, onClick }) => {
  const dayClass = isCurrent ? classes.dayActive : classes.day;
  return (
    <td onClick={onClick}>
      <h4 className={dayClass}>{day}</h4>
    </td>
  );
};

export default Cell;
