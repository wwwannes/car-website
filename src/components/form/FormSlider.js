import React, {useEffect} from 'react';

export default function RangeSlider(props) {
  const [value, setValue] = React.useState(0);

  /* Help with setting default values */
  useEffect(() => {
    setValue(props.max);
  }, [props.max]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const valueSelected = () => {
    props.parentCallback(value, props.id);
  };

  return (
    <div className="">

      {/* 'value' results in a console error, but it still works */}
      <input 
        type="range" 
        min={props.min} 
        max={props.max} 
        step={props.step}
        value={value}
        className="slider" 
        id={props.id}
        onMouseUp={valueSelected}
        onChange={handleChange}
      />
      <b>{props.prefix || ""} {value} {props.suffix || ""}</b>
    </div>
  );
}

/*import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}*/