import React, { useEffect, useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Typography,
	Grid,
	Button,
	Container,
	Snackbar,
	Modal,
} from '@material-ui/core';
import TextInput from '../../components/common/TextInput.component.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Comments from '../../components/comments/comments.view.jsx';
import verifyToken from '../../helpers/tokenHelper';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {
	editTripRequestStatus,
	closeErrorMessageAlert,
} from '../../actions/approval.table';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

export const normalizeType = type => {
	switch (type) {
		case 'multi-city':
			return 'Multiple cities trip';
		case 'one way':
			return 'One way trip';
		case 'return trip':
			return 'Return trip';
		default:
			break;
	}
};

const useStyles = makeStyles(theme => ({
	Snackbar: {
		margin: '48% 37%',
		width: '900px',
		['@media (max-width:780px)']: {
			margin: '150% -20%',
			width: '600px',
		},
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(2),
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
	},
}));
export const Request = props => {
	if (props.trip[0].id === 0) {
		props.history.push('/approval-table');
	}

	useEffect(() => {
		const token = localStorage.getItem('token');
		const logenInUser = verifyToken(token);
		if (logenInUser.payload.role !== 'manager') {
			props.history.push('/trips');
		}
	});
	const [open, setOpen] = React.useState(false);
	const [data, setData] = React.useState({});
	const [message, setMessage] = React.useState();
	const [textColor, setTextColor] = React.useState();
	const [status, setStatus] = React.useState(props.trip[0].status);
	const classes = useStyles();

	const statusColor = status => {
		return status === 'pending'
			? '#FBBC05'
			: status === 'approved'
			? '#34A853'
			: '#E10050';
	};

	const handleCloseAlert = () => {
		props.closeErrorMessageAlert();
	};

	const handleClose = setOpen => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	return (
		<Box p={2}>
			<Card>
				<CardContent>
					<Grid container justify='space-between' alignItems='center'>
						<Grid item>
							<Typography
								style={{ fontWeight: 'bold', fontSize: 20, color: '#616161' }}
								variant='h3'
							>
								{props.trip.length ? normalizeType(props.trip[0].tripType) : ''}
							</Typography>
							<Snackbar
								id='Snackbar1'
								open={props.successModal}
								autoHideDuration={3000}
								className={classes.Snackbar}
								onClose={() => handleCloseAlert()}
							>
								<Alert severity='success'>{props.message}</Alert>
							</Snackbar>
							<Snackbar
								id='Snackbar2'
								open={props.failModel}
								autoHideDuration={3000}
								className={classes.Snackbar}
								onClose={() => handleCloseAlert()}
							>
								<Alert severity='error'>{props.message}</Alert>
							</Snackbar>
						</Grid>
						<Grid item>
							<Typography
								style={{
									fontSize: 16,
									color: statusColor(status),
								}}
								variant='h3'
							>
								{status.charAt(0).toUpperCase() + status.slice(1)}
							</Typography>
						</Grid>
					</Grid>
					<Box py={1}>
						<Typography
							style={{ fontSize: 14, color: '#616161' }}
							variant='h3'
						>{`${props.trip[0].firstName} ${props.trip[0].lastName}`}</Typography>
					</Box>
					<Typography style={{ fontSize: 14, color: '#616161' }} variant='h3'>
						{props.trip.length > 0
							? new Date(props.trip[0].departureDate).toDateString()
							: ''}
					</Typography>
					{props.trip.map((trip, index) => {
						return (
							<Box key={index} py={4}>
								<Grid container justify='space-between'>
									<Grid xs={12} md={4} xl={2} item>
										<Box px={1}>
											<Snackbar
												id='Snackbar3'
												open={props.successModal}
												autoHideDuration={3000}
												className={classes.Snackbar}
												onClose={() => handleCloseAlert()}
											>
												<Alert severity='success'>{props.message}</Alert>
											</Snackbar>
											<Snackbar
												id='Snackbar4'
												open={props.failModel}
												autoHideDuration={3000}
												className={classes.Snackbar}
												onClose={() => handleCloseAlert()}
											>
												<Alert severity='error'>{props.message}</Alert>
											</Snackbar>
											<TextInput
												disabled={true}
												className='origin'
												key={`origin${trip.id}`}
												label='Origin'
												name='origin'
												defaultValue={trip.origin}
												required={false}
											/>
										</Box>
									</Grid>
									<Grid xs={12} md={4} xl={2} item>
										<Box px={1}>
											<TextInput
												disabled={true}
												className='destination'
												key={`destination${trip.id}`}
												label='Destination'
												name='destination'
												defaultValue={trip.destination}
												required={false}
											/>
										</Box>
									</Grid>
									<Grid xs={12} md={4} xl={2} item>
										<Box px={1}>
											<TextInput
												disabled={true}
												className='departureDate'
												key={`departureDate${trip.id}`}
												label='Departure Date'
												name='firstName'
												defaultValue={new Date(
													trip.departureDate,
												).toDateString()}
												required={false}
											/>
										</Box>
									</Grid>
									<Grid xs={12} md={4} xl={2} item>
										<Box px={1}>
											<TextInput
												disabled={true}
												className='returnDate'
												key={`returnDate${trip.id}`}
												label='Return Date'
												name='returnDate'
												defaultValue={new Date(trip.returnDate).toDateString()}
												required={false}
											/>
										</Box>
									</Grid>
									<Grid xs={12} md={4} xl={2} item>
										<Box px={1}>
											<TextInput
												disabled={true}
												key={`reason${trip.id}`}
												label='Reason'
												name='reason'
												defaultValue={trip.reason}
												required={false}
											/>
										</Box>
									</Grid>
									<Grid xs={12} md={4} xl={2} item>
										<Box px={1}>
											<TextInput
												disabled={true}
												key={`accomodation${trip.id}`}
												label='Accomodation'
												name='accomodation'
												defaultValue={trip.accomodation}
												required={false}
											/>
										</Box>
									</Grid>
								</Grid>
							</Box>
						);
					})}
					<Grid container justify='space-between' alignItems='flex-end'>
						<Grid item>
							<Button
								id='accept'
								disabled={status === 'pending' ? false : true}
								style={{ marginRight: '5px' }}
								disableElevation
								variant='contained'
								color='primary'
								onClick={() => {
									setData({
										status: 'approved',
										tripRequestId: props.trip[0].id,
									});
									setTextColor('primary');
									setMessage('Accept');
									handleOpen(1);
								}}
							>
								Accept
							</Button>
							<Button
								id='reject'
								disabled={status === 'pending' ? false : true}
								disableElevation
								variant='contained'
								color='secondary'
								onClick={() => {
									setData({
										status: 'rejected',
										tripRequestId: props.trip[0].id,
									});
									setTextColor('secondary');
									setMessage('Reject');
									handleOpen(1);
								}}
							>
								Reject
							</Button>
						</Grid>
						<Grid item>
							<Typography
								style={{ fontSize: 16, color: '#616161' }}
								variant='h3'
							>
								Managed by :{' '}
								{props.trip.length ? (props.trip[0].manager ? `You` : '') : ''}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<Container style={{ paddingTop: 42 }}>
				<Comments tripId={props.trip.length ? props.trip[0].tripId : ''} />
			</Container>
			<Modal
				id='modelPop'
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={() => handleClose(setOpen)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				disablePortal
				disableEnforceFocus
				disableAutoFocus
			>
				<Fade in={open}>
					<Box p={3} className={classes.paper}>
						<Box pb={3}>
							<Typography
								style={{ fontSize: 32, color: '#0094FF' }}
								variant='h3'
							>
								Warning!
							</Typography>
						</Box>
						<Typography style={{ fontSize: 18, color: '#A39E9E' }} variant='h3'>
							Are you sure you want to {message} this trip request ?
						</Typography>
						<Box pt={3}>
							<Grid container justify='flex-end' spacing={2}>
								<Grid item>
									<Button
										id='cancelBtn'
										disableElevation
										onClick={() => {
											setStatus(props.trip[0].status);
											handleClose(setOpen);
										}}
									>
										Cancel
									</Button>
								</Grid>
								<Grid item>
									<Button
										id='finalDeleteBtn'
										variant='contained'
										color={textColor}
										disableElevation
										onClick={() => {
											props.editTripRequestStatus(
												data.status,
												data.tripRequestId,
												props.trips,
											);
											handleClose(setOpen);
											setStatus(
												data.status === 'approved' ? 'approved' : 'rejected',
											);
										}}
									>
										{message}
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Fade>
			</Modal>
		</Box>
	);
};

export const mapStateToProps = state => {
	const initialTrip = [
		{
			id: 0,
			origin: '',
			destination: '',
			tripId: '',
			tripTripId: 0,
			tripType: '',
			status: '',
			accomodation: '',
			departureDate: '',
			returnDate: null,
			createdAt: '',
			manager: {
				firstName: '',
				lastName: '',
			},
		},
	];
	return {
		trips: state.approvalsTableReducer.tripRequests,
		trip:
			state.tripRequestsReducers.trip.length === 0
				? initialTrip
				: state.tripRequestsReducers.trip,
		user: state.userProfileReducer.userProfileInfo,
		successModal: state.approvalsTableReducer.successMessage,
		failModel: state.approvalsTableReducer.errorMessage,
		message: state.approvalsTableReducer.message,
	};
};

export default connect(mapStateToProps, {
	editTripRequestStatus,
	closeErrorMessageAlert,
})(withRouter(Request));
