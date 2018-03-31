import React from 'react';

import Option from './option';


const Input = ({ type, id, onChange, data, selected }) => {
  let input = null;
  switch(type) {
    case ('text'):
      return (
        <input id={id} type={type} onChange={onChange} value={data.value} />
      );

    case ('select'):
      return (
        <select id={id} onChange={onChange} defaultValue={selected}>
          {data.map((option) => {
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