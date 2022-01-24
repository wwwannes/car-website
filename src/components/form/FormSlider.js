/*
  disableSwap: keeps a minimum distance
*/

import { Slider, Typography } from '@mui/material';
import React, {useEffect} from 'react';

export default function RangeSlider(props) {
  const [value, setValue] = React.useState([0, 0]);

  /* Help with setting default values */
  useEffect(() => {
    setValue([props.min, props.max]);
  }, [props]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const valueSelected = () => {
    props.parentCallback(value, props.id);
  };

  return (
      <>
        <Typography>{props.title} between {props.prefix} {value[0]} {props.suffix} and {props.prefix} {value[1]} {props.suffix}</Typography>
        {props.max &&
          <Slider
            getAriaLabel={() => 'range'}
            min={props.min}
            max={props.max}
            step={props.step}
            defaultValue={[props.min, props.max]}
            onChange={handleChange}
            onMouseUp={valueSelected}
            disableSwap
          />
        }
      </>
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