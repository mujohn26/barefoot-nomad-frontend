export const formUseStyles = {
	paper: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'left',
		color: '#0094ff',
	},
	form: {
		width: '90%',
    marginTop: 1,
    padding: 10,
		color: '#0094ff',
	},
	submit: {
		margin: '15px 0px 10px',
		background: '#0094ff',
		'&:hover': {
			backgroundColor: 'white',
			color: '#0094ff',
		},
	},
	link: {
		color: '#0094ff',
	},
};

export const viewUseStyles = {
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: '2px',
		textAlign: 'center',
		color: 'grey',
	},
	leftGrid: {
		['@media (max-width:1024px)']: {
			display: 'none',
		},
	},
	phoneContent: {
		['@media (min-width:1025px)']: {
			display: 'none',
		},
	},
};
