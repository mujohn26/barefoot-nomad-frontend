import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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
export function UploadRoomImage(props) {
	const classes = useStyles();
	return (
		<div>
			<input
				data-test='upload-btn'
				accept='image/*'
				className={classes.input}
				id={props.id}
				multiple
				type='file'
				onChange={e => {
					props.cardClicked(props.id);
					props.HandleUploadRoomImage(e, props.id);
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
				{props.label}
			</label>
			&ensp;
			<label htmlFor={props.id}>
				<Button
					variant='contained'
					color='default'
					className={classes.button}
					component='span'
					startIcon={<CloudUploadIcon />}
				>
					Upload
				</Button>
			</label>
		</div>
	);
}
