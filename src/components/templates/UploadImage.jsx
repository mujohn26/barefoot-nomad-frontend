import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: 'none',
	},
}));
export default function UploadImage(props) {
	const classes = useStyles();
	return (
		<div>
			<input
				data-test='upload-btn'
				accept='image/*'
				className={classes.input}
				id='contained_button_file'
				multiple
				type='file'
				onChange={e => {
					props.uploadImage(e);
				}}
				display='hidden'
			/>
			<label htmlFor='contained_button_file'>
				<Button
					variant='contained'
					color='primary'
					component='span'
					style={{
						backgroundColor: '#0094ff',
						borderRadius: 0,
					}}
				>
					Upload image
				</Button>
			</label>
		</div>
	);
}
