  
export const Styles = theme => ({
	root: {
		width: '100%',
		overflowX: 'auto',
	},
	paper: {
		minWidth: '100%',
		minHeight: '1130px',
	},
	card: {
		width: '433.09px',
		minHeight: '495.38px',
		marginLeft: '30%',

		['@media (max-width:1024px)']: {
			marginLeft: '0%',
			width: '433.09px',
		},
		['@media (min-width:800px) and (max-width:1285px)']: {
			marginLeft: '17%',
		},
	},
	roomCard: {
		minWidth: '433.09px',
		minHeight: '495.38px',
		marginLeft: '30%',

		['@media (max-width:1024px)']: {
			marginLeft: '0',
			width: '153.09px',
		},

		['@media (max-width:1285px)']: {
			marginLeft: '0%',
			width: '153.09px',
		},
	},
	inputField: {
		width: '300px',
		height: '40px',
	},
	inputFieldAmenities: {
		width: '253px',
		height: '36px',
	},
	Savebutton: {
		marginLeft: '-100%',
		width: '112px',
		height: '41px',
		['@media (min-width:151px) and (max-width:1280px)']: {
			marginLeft: '-56%',
			width: '153.09px',
		},
		['@media (min-width:800px) and (max-width:1285px)']: {
			marginLeft: '-47%',
			width: '153.09px',
		},
		['@media (min-width:751px) and (max-width:799px)']: {
			marginLeft: '-68%'
		  },
	},
	Form: {
		marginLeft: '15%',
		['@media (max-width:1025px)']: {
			marginLeft: '5%',
		},

	},
	RoomForm: {
		marginLeft: '15%',
		marginTop: '5%',
		['@media (max-width:1280px)']: {
			marginLeft: '13%',
		},
	},
	AmenitiesForm: {
		marginLeft: '11%',
		['@media (max-width:1025px)']: {
			marginLeft: '3%',
		},
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
	AmenitiesButton: {
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: 16,
		width: '80px',
		height: '39px',
		lineHeight: 1.5,
		color: 'white',
		textAlign: 'center',
	},
	Typography: {
		marginLeft: '8%',
		display: 'inline-block',
	},
	title:{
		['@media (max-width:1025px)']: {
			marginLeft: '-17%',
		},
	},
	Chip: {
		marginLeft: '8%',
	},
	TypographyRoom: {
		marginLeft: '0%',
	},
	SubmitCard: {
		width: '94%',
		minHeight: '278.38px',
		marginLeft: '15%',
		['@media (max-width:750px)']: {
			marginLeft: '0%',
			width: '433.09px',
		},

		['@media (min-width:800px) and (max-width:1285px)']: {
			marginLeft: '8%',
			width: '105%',
		},
		['@media (min-width:751px) and (max-width:799px)']: {
			marginLeft: '0%'
		  },
	},
	addIcon: {
		marginTop: '300px',
	},
	servicesSnackbar: {
		margin: '20% 36.7%',
		width: '200px',
	},
	SnackbarSuccess: {
		width: '2370px',
	},
	CircularProgress: {
		marginLeft: '-340% ',
	},
	addIcon: {
		fontSize: 40,
		marginLeft: '100%',
		marginTop: '4%',
		cursor: 'pointer',
		['@media (max-width:1280px)']: {
			marginLeft: '694px',
		},
	},
});