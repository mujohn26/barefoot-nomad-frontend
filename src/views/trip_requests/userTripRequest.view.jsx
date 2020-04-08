import React, { useEffect } from 'react';
import {
	Box,
	Card,
	CardContent,
	Typography,
	Grid,
	Button,
	Container,
} from '@material-ui/core';
import TextInput from '../../components/common/TextInput.component.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Comments from '../../components/comments/comments.view.jsx';
import { selectTripToBookAccommodationAction } from '../../actions/booking/accommodation.action';

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

export const Request = (props) => {
	useEffect(() => {
		if (!props.trip.length) {
			props.history.push('/trips');
		}
	})

	const statusColor = status => {
		return status === 'pending'
			? '#FBBC05'
			: status === 'approved'
				? '#34A853'
				: '#E10050';
	};

	const Capitalize = (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : string;

	return (
		<Box p={2}>
			<Card>
				<CardContent>
					<Grid container justify="space-between" alignItems="center">
						<Grid item><Typography style={{ fontWeight: "bold", fontSize: 20, color: '#616161' }} variant="h3">{props.trip.length ? normalizeType(props.trip[0].tripType) : ""}</Typography></Grid>
						<Grid item><Typography style={{ fontSize: 16, color: props.trip.length ? statusColor(props.trip[0].status) : "" }} variant="h3">{props.trip.length ? Capitalize(props.trip[0].status) : ""}</Typography></Grid>
					</Grid>
					<Box py={1}>
						<Typography style={{ fontSize: 14, color: '#616161' }} variant="h3">{props.trip.length ? `${Capitalize(props.user.firstName)} ${Capitalize(props.user.lastName)}` : ""}</Typography>
					</Box>
					<Typography style={{ fontSize: 14, color: '#616161' }} variant="h3">{props.trip.length ? new Date(props.trip[0].createdAt).toDateString() : ""}</Typography>
					{
						props.trip.length ? props.trip.map((item, index) => {
							return (
								<Box key={index} py={2}>
									<Grid container>
										<Grid item container>
											<Grid xs={12} md={4} xl={2} item>
												<Box px={1}>
													<TextInput
														disabled={true}
														id={`origin${index}`}
														label="Origin"
														name="origin"
														defaultValue={Capitalize(item.origin)}
														required={false} />
												</Box>
											</Grid>
											<Grid xs={12} md={4} xl={2} item>
												<Box px={1}>
													<TextInput
														disabled={true}
														id={`destination${index}`}
														label="Destination"
														name="destination"
														defaultValue={Capitalize(item.destination)}
														required={false} />
												</Box>
											</Grid>
											<Grid xs={12} md={4} xl={2} item>
												<Box px={1}>
													<TextInput
														disabled={true}
														id={`departureDate${index}`}
														label="Departure Date"
														name="firstName"
														defaultValue={new Date(item.departureDate).toDateString()}
														required={false} />
												</Box>
											</Grid>
											{props.trip.length ? props.trip[0].tripType == "round trip" ? <Grid xs={12} md={4} xl={2} item>
												<Box px={1}>
													<TextInput
														disabled={true}
														id={`returnDate${index}`}
														label="Return Date"
														name="returnDate"
														defaultValue={new Date(item.returnDate).toDateString()}
														required={false} />
												</Box>
											</Grid> : <></> : <></>}
											<Grid xs={12} md={4} xl={props.trip[0].tripType == "round trip" ? 2 : 4} item>
												<Box px={1}>
													<TextInput
														disabled={true}
														id={`reason${index}`}
														label="Reason"
														name="reason"
														defaultValue={Capitalize(item.reason)}
														required={false} />
												</Box>
											</Grid>
											<Grid xs={12} md={4} xl={2} item>
												<Box px={1}>
													<TextInput
														disabled={true}
														id={`accomodation${index}`}
														label="Accomodation"
														name="accomodation"
														defaultValue={Capitalize(item.accomodation)}
														required={false} />
												</Box>
											</Grid>
										</Grid>
										{item.booking ? <Box key={index + 2} style={{ display: item.booking.length > 0 ? 'block' : 'none' }} pl={1} pt={1}>
											<Grid container spacing={1}>
												<Grid item xs={12}>
													<Typography style={{ fontSize: 16, color: '#616161' }} variant="h3">Booking info</Typography>
												</Grid>
												<Grid item container spacing={2} xs={12}>
													<Grid item>
														<Typography style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.38)' }} variant="h3">Accommodation: </Typography>
													</Grid>
													<Grid item>
														<Typography style={{ fontSize: 16, color: '#616161' }} variant="h3">{item.booking.length > 0 ? Capitalize(item.booking[0].accomodation) : ""} </Typography>
													</Grid>
												</Grid>
												<Grid item container spacing={2} xs={12}>
													<Grid item>
														<Typography style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.38)' }} variant="h3">Room type: </Typography>
													</Grid>
													<Grid item>
														<Typography style={{ fontSize: 16, color: '#616161' }} variant="h3">{item.booking.length > 0 ? Capitalize(item.booking[0].name) : ""} </Typography>
													</Grid>
												</Grid>
												<Grid item container spacing={2} xs={12}>
													<Grid item>
														<Typography style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.38)' }} variant="h3">Room number: </Typography>
													</Grid>
													<Grid item>
														<Typography style={{ fontSize: 16, color: '#616161' }} variant="h3">{item.booking.length > 0 ? item.booking[0].roomid : ""} </Typography>
													</Grid>
												</Grid>
											</Grid>
										</Box> : <div />}
										{item.booking ? <Grid key={index + 3} style={{ display: item.booking.length > 0 ? 'none' : 'flex' }} container justify="space-between" alignItems="flex-end">
											<Grid item>
												<Box py={1} />
												<Button id="btn_edit_booking" disableElevation variant="contained" color="primary" onClick={() => {
													if (props.trip.length && props.trip[0].status.toLowerCase() == "Approved".toLowerCase()) {
														props.selectTripToBookAccommodationAction({
															id: item.id,
															destination: item.destination,
															accommodationId: item.accommodationId
														})
														props.history.push('/booking/3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2')
													}
													else {
														props.history.push('/make-trip-request');
													}
												}}>
													{props.trip.length ? props.trip[0].status.toLowerCase() == "Approved".toLowerCase() ? "Book accommodation" : "Edit" : ""}
												</Button>
											</Grid>
											<Grid item>
												<Box py={1} />
												<Typography style={{ fontSize: 16, color: '#616161' }} variant="h3">Managed by : {props.trip.length ? `${Capitalize(props.trip[0].manager.firstName)} ${Capitalize(props.trip[0].manager.lastName)}` : ''}</Typography>
											</Grid>
										</Grid> : <div />}
									</Grid>
								</Box>
							)
						}) : <div />
					}
				</CardContent>
			</Card>
			<Container style={{ paddingTop: 42 }}>
				<Comments tripId={props.trip.length ? props.trip[0].tripId : ""} />
			</Container>
		</Box >
	)
}

export const mapStateToProps = state => {
	return {
		trip: state.tripRequestsReducers.trip,
		user: state.userProfileReducer.userProfileInfo,
	};
};

export default connect(mapStateToProps, { selectTripToBookAccommodationAction })(withRouter(Request));
