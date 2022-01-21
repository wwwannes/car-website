import * as React from 'react';

export default function FormCheckbox(props) {
  const handleChange = (event) => {
    const value = event.target.checked ? event.target.value : "";
    props.parentCallback(value, props.id);
  };

  return (

    <div className="">
        <input 
            type="checkbox"
            id={props.id}
            className="col"
            name={props.id}
            value="1"
            onChange={handleChange}
        />
        <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}