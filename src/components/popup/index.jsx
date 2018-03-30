import React from 'react';

import classes from './popup.css';

const Popup = (props) => {
  return (
    <div
      onClick={(e) => { e.stopPropagation(); }}
      className={classes.popup}
    >
      {props.children}
    </div>
  )
};

export default Popup;
