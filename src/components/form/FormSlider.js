/*
  disableSwap: keeps a minimum distance
*/

import { Slider, Typography } from '@mui/material';
import {useEffect, useState} from 'react';

export default function RangeSlider(props) {
  const [value, setValue] = useState([0, 0]);

  /* Help with setting default values */
  useEffect(() => {
    if((value[0] === undefined || 
      value[0] === 0) && 
      (value[1] === undefined ||
      value[1] === 0)){
      setValue([props.min, props.max]);
    }
  }, [props]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const valueSelected = (event, newValue) => {
    setValue([newValue[0], newValue[1]]);
    props.parentCallback(newValue, props.id);
  };

  return (
      <>
        <Typography 
          sx={{
            "mt": 3
          }}
        >
          {props.title} between {props.prefix} {value[0]} {props.suffix} and {props.prefix} {value[1]} {props.suffix}
        </Typography>
        {props.max &&
          <Slider
            getAriaLabel={() => 'range'}
            min={props.min}
            max={props.max}
            step={props.step}
            defaultValue={[props.min, props.max]}
            onChange={handleChange}
            onChangeCommitted={valueSelected}
            disableSwap
            sx={{
              "mt": 1
            }}
          />
        }
      </>
  );
}