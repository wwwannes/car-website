import * as React from 'react';
import { Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';

export default function FormSelect(props) {
    return (
        <FormControl fullWidth="true" margin="normal" variant="standard">
            <TextField 
                variant="standard"
                label={props.title} 
                defaultValue={props.default}
                type={props.type}
                required={props.required}
                disabled={props.disabled}
                multiline={props.multiline}
                rows={props.rows}
            />
        </FormControl>
    );
}

/* Set the default values */
FormSelect.defaultProps = {
    required: false,
    disabled: false,
    multiline: false,
    rows: false
}