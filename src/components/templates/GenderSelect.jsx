import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	option: {
		fontSize: 15,
		'& > span': {
			marginRight: 10,
			fontSize: 18,
		},
	},
});

export default function GenderSelect(props) {
	const classes = useStyles();
	return (
		<Autocomplete
			id='gender_select'
			options={gender}
			classes={{
				option: classes.option,
			}}
			value={{ label: props.value }}
			autoHighlight
			getOptionLabel={option => option.label}
			renderInput={params => (
				<TextField
					{...params}
					label='Gender'
					variant='outlined'
					style={{ width: '100%' }}
					inputProps={{
						...params.inputProps,
						autoComplete: 'new-Gender',
					}}
				/>
			)}
			onChange={(event, value) => props.handleChange(event, value, 'gender')}
		/>
	);
}

const gender = [{ label: 'Male' }, { label: 'Female' }];
