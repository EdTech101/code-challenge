import React, { useRef } from 'react';
import './user-filter.css';

export const UserFilter = ({onFilter}) => {   
  const inputRef = useRef(null)
  const filter=()=>onFilter(inputRef.current.value);

  return (
      <select onChange={()=>filter()} ref={inputRef} name="choices" id="choices">
        <option value="">No filter</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    )
}