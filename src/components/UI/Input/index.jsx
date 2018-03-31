import React from 'react';

import Option from './option';


const Input = ({ type, id, onChange, inputData, selectData, selected }) => {
  let input = null;
  switch(type) {
    case ('text'):
      return (
        <input id={id} type={type} onChange={onChange} value={inputData.value} />
      );

    case ('select'):
      console.log(selectData);
      return (
        <select id={id} onChange={onChange} defaultValue={selected}>
          {selectData.map((option) => {
            return (
              <Option
                key={option}
                value={option}
              />
            );
          })}
        </select>
      )

    default:
      return null;
  }

  return (
    <div>
      {input}
    </div>
  );
};

export default Input;