import React from 'react';

const Option = ({ value, selected }) => {
  return (
    <option value={value} selected={selected}>{value}</option>
  );
};

export default Option;