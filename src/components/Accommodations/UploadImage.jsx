import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import { log } from 'util';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: 'none',
	},
	button: {
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: 16,
		width: '150px',
		height: '40px',
		lineHeight: 1.5,
		color: 'black',
		textAlign: 'center',
		['@media (max-width:750px)']: {
			width: '308.77px',
		},
	},
}));
export default function UploadImage(props) {
	const classes = useStyles();
	return (
		<div>
			<input
				data-test="upload-btn"
				accept='image/*'
				className={classes.input}
				id='contained_button_file'
				multiple
				type='file'
				onChange={e => {
					props.uploadAccommodationImage(e);
				}}
				display='hidden'
			/>
			<label
				style={{
					fontSize: 15,
					color: '#C4C4C4',
					textAlign: 'center',
				}}
			>
				Provide Accomodation Image
			</label>
			&ensp;
			<label htmlFor='contained_button_file'>
			{!props.isLoading?(
				<Button
					variant='contained'
				
					color='default'
					className={classes.button}
					component='span'
					startIcon={<CloudUploadIcon />}
				>
					Upload
				</Button>):(<CircularProgress className={classes.CircularProgress} />)}
			</label>
		</div>
	);
}
