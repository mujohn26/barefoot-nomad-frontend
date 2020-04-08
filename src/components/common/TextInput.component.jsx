import React from 'react';
import { TextField, Box } from '@material-ui/core';

function TextInput(props) {
    return (
        <Box pt={props.pt || 1} pb={props.pb || 1}>
            <TextField
                required={props.required || true}
                disabled={props.disabled || false}
                id={props.id}
                name={props.name}
                key={props.id}
                label={props.label}
                variant="outlined"
                fullWidth
                size="small"
                error={props.error || false}
                onChange={props.onChange}
                helperText={props.helperText}
                type={props.type || "text"}
                defaultValue={props.defaultValue}
                onBlur={props.onBlur}
            />
        </Box>
    )
}

export default TextInput;
