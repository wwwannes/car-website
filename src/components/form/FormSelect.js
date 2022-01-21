import * as React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function FormSelect(props) {
  const [value, setValue] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.parentCallback(event.target.value, props.id);
    console.log("change")
  };

  return (
    <FormControl fullWidth="true" margin="normal" variant="standard">
        <InputLabel id={props.id}>{props.label}</InputLabel>
        <Select
            labelId={props.id}
            id={props.id}
            value={value}
            label={props.label}
            onChange={handleChange}
        >
            {props.data &&
                <>
                    {props.data.map((item, key) =>
                        <MenuItem value={item.value} key={key}>{item.description}</MenuItem>
                    )}
                </>
            }
        </Select>

        {/*
            <label htmlFor={props.id}>{props.label}</label>
        <select 
            id={props.id}
            onChange={handleChange}
            className="col"
            name={props.id}
            value={value}
        >
            <option value="">{props.label}</option>
            {props.data &&
                <>
                    {props.data.map((item, key) =>
                        <option value={item.value} key={key}>{item.description}</option>
                    )}
                </>
            }
        </select>*/}
    </FormControl>
  );
}

/* https://mui.com/components/selects/ */
/*import * as React from 'react';
import Box from '@mui/material/Box';
import {Select, InputLabel, MenuItem, FormControl} from '@mui/material';

export default function FormSelect(props) {
  const [value, setValue] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log('SELECT CHANGE');
    this.props.parentCallback(event.target.myname.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id={props.id}>{props.label}</InputLabel>
            <Select
                labelId={props.id}
                id={props.id + "Select"}
                className="col"
                name={props.id}
                value={value}
                onChange={handleChange}
            >
                {props.data &&
                    <>
                        {props.data.map((item, key) =>
                            <MenuItem value={item.value} key={key}>{item.description}</MenuItem>
                        )}
                    </>
                }
            </Select>
        </FormControl>
    </Box>
  );
}*/