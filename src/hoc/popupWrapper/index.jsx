import React from 'react';

import classes from './popupWrapper.css';

const PopupWrapper = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={classes.popupWrapper}
    >
      {props.children}
    </div>
  );
};

export default PopupWrapper;
