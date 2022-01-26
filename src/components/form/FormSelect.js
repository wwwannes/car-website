import * as React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function FormSelect(props) {
  const [value, setValue] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue.props.value);
    props.parentCallback(event.target.value, props.id);
  };

  return (
    <FormControl fullWidth={true} margin="normal" variant="standard" disabled={props.disabled}>
        <InputLabel id={props.id}>{props.label}</InputLabel>
        <Select
            labelId={props.id}
            id={props.id}
            value={value}
            label={props.label}
            onChange={handleChange}
        >
            {props.data && props.data.map((item, key) => (
                <MenuItem 
                    value={item.value} 
                    key={key}
                >
                    {item.description}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
  );
}