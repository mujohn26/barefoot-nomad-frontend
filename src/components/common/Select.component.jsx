import React from 'react';
import { Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';

const SelectField = (props) => {

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl size="small" fullWidth variant="outlined" required>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">Room type</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={props.value}
                onChange={props.onChange}
                labelWidth={labelWidth}>
                <MenuItem value=""><em>None</em></MenuItem>
                {props.options.map((option, index) => <MenuItem key={index} value={index + 1}>{option}</MenuItem>)}
            </Select>
        </FormControl>
    )

}

export default SelectField;