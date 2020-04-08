export const Styles = theme => ({
	root: {
		width: '100%',
		overflowX: 'auto',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(1),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	cancelButton: {
		marginTop: '10px',
		color: 'white',
		['@media (max-width:780px)']: {
			marginLeft: '-50px',
		},
		['@media (max-width:780px)']: {
			marginLeft: '-70px',
		},
		['@media (min-width:769px) and (max-width:1024px) ']: {
			marginLeft: '-130px',
		},
	},
	updateButton: {
		marginTop: '10px',
		['@media (max-width:780px)']: {
			marginLeft: '10px',
		},
		['@media (max-width:320px)']: {
			marginLeft: '10px',
		},
		['@media (min-width:769px) and (max-width:1024px)']: {
			marginLeft: '-90px',
		},
	},
	tableHeader: {
		fontSize: '30px',
		height: '56px',
	},

	Snackbar: {
		margin: '48% 40%',
		width: '800px',
		['@media (max-width:780px)']: {
			margin: '150% -20%',
			width: '600px',
		},
	},
	tableCell: {
		backgroundColor: '#0094FF',
		color: 'white',
	},
	Autocomplete: {
		width: '150px',
	},
	modal: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    ['@media (min-width:312px) and (max-width:780px)']: {
      width: 300,

		},
	  },
	  popUp: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	  },
});