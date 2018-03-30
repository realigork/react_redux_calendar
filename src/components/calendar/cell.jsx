import React from 'react';

import classes from './cell.css';

const Cell = ({ day, isCurrent }) => {
  const activeClass = isCurrent ? classes.isActive : null;
  return (
    <td className={activeClass}>
      <h4>{day}</h4>
    </td>
  );
};

export default Cell;
