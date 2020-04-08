import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, CircularProgress, Box, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CheckIcon from '@material-ui/icons/Check';
import Footer from '../components/common/footer.js';
import AdsPictures from '../components/trip-request/adsPictures.jsx';
import OneWay from '../components/trip-request/oneWay.jsx';
import { Button, Grid, Paper, Hidden, Toolbar, Link } from '@material-ui/core';
import {
	requestTrip,
	GetAccomodations,
	editTripRequest,
} from '../actions/tripRequestAction.js';
import { connect } from 'react-redux';
import withWidth from '@material-ui/core/withWidth';

const styles = {
	tabs: {
		background: '#fff',
		color: 'black',
		align: 'center',
	},
	slide: {
		padding: 1,
		minHeight: 20,
		color: '#fff',
	},
	slide1: {
		backgroundColor: '#fff',
		width: '98%',
	},
	slide2: {
		backgroundColor: '#fff',
	},
	slide3: {
		backgroundColor: '#fff',
	},
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: '10px 10px 10px 10px',
		margin: '0px 0px 10px 0px',
		textAlign: 'center',
		alignContent: 'center',
	},
	paperMultiCity: {
		width: '100%',
		padding: '0px 20px 0px 140px',
		margin: '0px 0px 5px 0px',
		textAlign: 'center',
		alignContent: 'center',
	},
	picture: {
		padding: '2px 2px 2px 10px',
		textAlign: 'center',
		alignContent: 'center',
	},
	button: {
		margin: '0px 30px 0px 0px',
		textAlign: 'left',
		backgroundColor: 'white',
	},
};

export class TripRequest extends Component {
	constructor(props) {
		super(props);
		this.handleIndexChange = this.handleIndexChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChangeDepartureDate = this.handleChangeDepartureDate.bind(this);
		this.handleChangeReturnDate = this.handleChangeReturnDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOncloseSnackbar = this.handleOncloseSnackbar.bind(this);
		this.handleAddMultiCityData = this.handleAddMultiCityData.bind(this);
		this.handleDeletemultiCityData = this.handleDeletemultiCityData.bind(this);
		this.handleChangeMultiCityData = this.handleChangeMultiCityData.bind(this);
		this.handleChangeDateMultiCity = this.handleChangeDateMultiCity.bind(this);
		this.handleChangeAccomodationMultiCity = this.handleChangeAccomodationMultiCity.bind(
			this,
		);
		this.state = {
			activeIndex: 0,
			trip: this.props.trip ? this.props.trip : '',
			index: this.props.trip
				? this.props.trip[0].tripType === 'round trip'
					? 1
					: this.props.trip.length >= 2
					? 2
					: 0
				: 0,
			submitted: false,
			From: this.props.trip ? this.props.trip[0].originId : '',
			To: this.props.trip ? this.props.trip[0].destinationId : '',
			editAccomodation: this.props.trip
				? this.props.GetAccomodations(this.props.trip[0].destinationId)
				: '',
			type: this.props.trip ? this.props.trip[0].tripType : 'one way',
			departureDate: this.props.trip
				? this.props.trip[0].departureDate
				: `${new Date()}`,
			returnDate: this.props.trip
				? this.props.trip[0].returnDate
				: `${new Date()}`,
			reason: this.props.trip ? this.props.trip[0].reason : '',
			accomodationId: this.props.trip ? this.props.trip[0].accomodationId : '',
			open: true,
			destination: '',
			multiCity:
				this.props.trip && this.props.trip.length >= 2
					? this.props.trip.map((_, i) => ({
							From: this.props.trip[i].originId,
							To: this.props.trip[i].destinationId,
							type: 'multi-city',
							departureDate: this.props.trip[i].departureDate.split('T', 1)[0],
							reason: this.props.trip[i].reason,
							accomodationId: this.props.trip[i].accomodationId,
					  }))
					: [
							{
								From: '',
								To: '',
								type: 'multi-city',
								departureDate: `${new Date()}`,
								reason: '',
								accomodationId: '',
							},
							{
								From: '',
								To: '',
								type: 'multi-city',
								departureDate: `${new Date()}`,
								reason: '',
								accomodationId: '',
							},
					  ],
			buttonState: true,
			tripSubmitted: false,
		};
	}

	handleIndexChange = (event, value) => {
		this.setState({
			index: value,
		});
		this.setState({
			trip: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: `${new Date()}`,
			returnDate: `${new Date()}`,
			reason: '',
			accomodationId: '',
			multiCity: [
				{
					From: '',
					To: '',
					type: 'multi-city',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
				{
					From: '',
					To: '',
					type: 'multi-city',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
			],
		});
		this.props.info.accommodations = '';
	};
	handleChange(e) {
		let { name, value } = e.target;
		if (value === this.state.From || value === this.state.To) {
			this.setState({ To: '', buttonState: false });
			this.props.info.accommodations = '';
		} else if (name === 'To') {
			this.setState({
				accomodationId: '',
			});
			this.setState({ [name]: value, buttonState: false });
			this.props.GetAccomodations(value);
		} else {
			this.setState({ [name]: value, buttonState: false });
		}
	}
	handleChangeDepartureDate(date) {
		this.setState({ departureDate: date, buttonState: false });
	}
	handleChangeReturnDate(date) {
		if (this.state.departureDate > date || !date) {
			this.setState({
				returnDate: this.state.departureDate,
				buttonState: false,
			});
		} else {
			this.setState({ returnDate: date, buttonState: false });
		}
	}
	handleClick(accommodation) {
		if (accommodation) {
			this.setState({
				accomodationId: accommodation,
				buttonState: false,
			});
		}
	}
	handleSubmit() {
		this.setState({
			tripSubmitted: true,
		});
		let {
			From,
			To,
			reason,
			departureDate,
			returnDate,
			accomodationId,
			type,
			multiCity,
		} = this.state;
		if (this.state.index === 0) {
			this.props.trip && !this.state.buttonState
				? this.props.editTripRequest(
						{
							From,
							To,
							departureDate,
							reason,
							accomodationId,
							type,
						},
						this.props.trip[0].tripId,
				  )
				: this.props.requestTrip({
						From,
						To,
						departureDate,
						reason,
						accomodationId,
						type,
				  });
		} else if (this.state.index === 1) {
			this.props.trip && !this.state.buttonState
				? this.props.editTripRequest(
						{
							From,
							To,
							departureDate,
							returnDate,
							reason,
							accomodationId,
							type: 'round trip',
						},
						this.props.trip[0].tripId,
				  )
				: this.props.requestTrip({
						From,
						To,
						departureDate,
						returnDate,
						reason,
						accomodationId,
						type: 'round trip',
				  });
		} else if (this.state.index === 2) {
			this.props.trip && !this.state.buttonState
				? this.props.editTripRequest(multiCity, this.props.trip[0].tripId)
				: this.props.requestTrip(multiCity);
		}
		this.setState({
			From: '',
			To: '',
			type: 'one way',
			departureDate: `${new Date()}`,
			returnDate: `${new Date()}`,
			reason: '',
			accomodationId: '',
			multiCity: [
				{
					From: '',
					To: '',
					type: 'multi-city',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
				{
					From: '',
					To: '',
					type: 'multi-city',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
			],
			buttonState: true,
			tripSubmitted: false,
			trip: '',
		});
		this.props.info.accommodations = '';
	}
	handleOncloseSnackbar() {
		this.setState({ open: false });
	}
	handleAddMultiCityData(e) {
		e;
		this.setState({ submitted: true, buttonState: false });
		this.state.multiCity.push({
			From: '',
			To: '',
			type: 'multi-city',
			departureDate: `${new Date()}`,
			reason: '',
			accomodationId: '',
		});
	}
	handleDeletemultiCityData = index => {
		if (this.state.multiCity.length > 2) {
			this.state.multiCity.splice(this.state.multiCity.indexOf(index), 1);
			this.setState({ submitted: false, buttonState: false });
		}
	};
	handleChangeMultiCityData(e, number) {
		const multiCityData = this.state.multiCity;
		multiCityData.map((trip, i) => {
			if (i === number) {
				trip[e.target.name] = e.target.value;
				this.setState({
					activeIndex: number,
				});
				if (e.target.value === trip['From'] && e.target.value === trip['To']) {
					trip['accomodationId'] = '';
					trip['To'] = '';
					this.props.info.accommodations = '';
				} else if (e.target.name === 'To') {
					if (multiCityData[i + 1]) {
						multiCityData[i + 1].From = e.target.value;
					}
					this.props.GetAccomodations(e.target.value);
				}
			}
		});
		this.setState({
			multiCity: multiCityData,
			submitted: true,
			buttonState: false,
		});
	}
	handleChangeDateMultiCity(date, name, number) {
		let multiCityData = this.state.multiCity;
		let d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		let newDate = [year, month, day].join('-');
		multiCityData.map((trip, i) => {
			if (i === number) {
				trip[name] = newDate;
				this.setState({ activeIndex: number, buttonState: false });
			}
		});
		this.setState({
			multiCity: multiCityData,
		});
	}
	handleChangeAccomodationMultiCity(accommodation, number) {
		if (accommodation) {
			accommodation;
			const multiCityData = this.state.multiCity;
			multiCityData.map((trip, i) => {
				if (number === i) {
					trip['accomodationId'] = accommodation;
				}
			});
			this.setState({
				multiCity: multiCityData,
				buttonState: false,
			});
		}
	}
	render() {
		const { index } = this.state;
		return (
			<Box style={Object.assign({}, styles.root)}>
				<Toolbar>
					{this.props.tripCreated && !this.state.trip && (
						<Snackbar
							open={this.state.open}
							autoHideDuration={3000}
							anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
							data-test='closeSnackbar'
							onClose={this.handleOncloseSnackbar}
						>
							<Alert
								style={{
									width: '100%',
									heigth: '10px',
									padding: '0px 10px 0px 10px',
								}}
								icon={<CheckIcon fontSize='inherit' />}
								severity='success'
							>
								{' '}
								<Typography>
									{this.props.message}. Click here to{' '}
									<Button
										style={Object.assign({}, styles.button)}
										color='primary'
									>
										{' '}
										<Link
											href='/trips'
											variant='body2'
											style={{ textDecoration: 'none', color: '#0094FF' }}
										>
											{'View all trips'}
										</Link>
									</Button>
								</Typography>
							</Alert>
						</Snackbar>
					)}
					{this.props.error && !this.state.trip && (
						<Snackbar
							open={this.state.open}
							autoHideDuration={3000}
							anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
							onClose={this.handleOncloseSnackbar}
						>
							<Alert
								severity='error'
								style={{
									heigth: '40px',
									align: 'left',
									padding: '0px 10px 0px 10px',
								}}
							>
								<Typography>{this.props.message}</Typography>
							</Alert>
						</Snackbar>
					)}
				</Toolbar>
				<Paper style={Object.assign({}, styles.paper)}>
					<Tabs
						value={index}
						data-test='index'
						onChange={this.handleIndexChange}
						style={styles.tabs}
					>
						<Tab label='One Way Trip' />
						<Tab label='Round Trip' />
						<Tab label='Multi City Trip' />
					</Tabs>
					{this.state.index !== 2 ? (
						<OneWay
							value={this.state}
							onHandleChange={this.handleChange}
							handleChangeDepartureDate={this.handleChangeDepartureDate}
							handleChangeReturnDate={this.handleChangeReturnDate}
							city={this.state}
						/>
					) : (
						<Grid container>
							<Grid item container>
								<Box>
									{this.state.multiCity.map((indexValue, i) => (
										<div key={i}>
											<Hidden lgDown>
												<div style={Object.assign({}, styles.paperMultiCity)}>
													<Grid item xs={12} md={12} xl={12} lg={12}>
														<OneWay
															value={this.state.multiCity[i]}
															previousValue={
																i > 0 ? this.state.multiCity[i - 1] : false
															}
															index={indexValue}
															number={i}
															multiCityDatalength={this.state.multiCity.length}
															onHandleChange={this.handleChangeMultiCityData}
															handleChangeDateMultiCity={
																this.handleChangeDateMultiCity
															}
															handleDelete={this.handleDeletemultiCityData}
															city={this.state}
														/>
													</Grid>{' '}
												</div>
											</Hidden>
											<Hidden only='xl'>
												<Paper style={Object.assign({}, styles.paper)}>
													<Grid item xs={12} md={12} xl={12} lg={12}>
														<OneWay
															value={this.state.multiCity[i]}
															previousValue={
																i > 0 ? this.state.multiCity[i - 1] : false
															}
															index={indexValue}
															number={i}
															multiCityDatalength={this.state.multiCity.length}
															onHandleChange={this.handleChangeMultiCityData}
															handleChangeDateMultiCity={
																this.handleChangeDateMultiCity
															}
															handleDelete={this.handleDeletemultiCityData}
															city={this.state}
														/>
													</Grid>{' '}
												</Paper>
											</Hidden>
										</div>
									))}
									<br />
									<Grid>
										<AddCircleRoundedIcon
											style={{
												fontSize: 25,
												cursor: 'pointer',
											}}
											color='primary'
											onClick={this.handleAddMultiCityData}
										/>
									</Grid>
								</Box>
							</Grid>
						</Grid>
					)}
				</Paper>
				<Paper style={Object.assign({}, styles.picture)}>
					<Hidden lgDown>
						{this.state.index === 2 ? (
							this.state.multiCity.map((index, i) => (
								<AdsPictures
									value={this.state.multiCity[i]}
									bigSize={true}
									index={true}
									number={i}
									onClick={this.handleChangeAccomodationMultiCity}
									destination={this.state.destination}
								/>
							))[this.state.activeIndex]
						) : (
							<AdsPictures
								value={this.state}
								bigSize={true}
								screenSize={this.props.width}
								onClick={this.handleClick}
								destination={this.state.destination}
								data-test='click'
							/>
						)}
					</Hidden>
					<Hidden only='xl'>
						{this.state.index === 2 ? (
							this.state.multiCity.map((index, i) => (
								<AdsPictures
									value={this.state.multiCity[i]}
									index={true}
									screenSize={this.props.width}
									number={i}
									onClick={this.handleChangeAccomodationMultiCity}
									destination={this.state.destination}
								/>
							))[this.state.activeIndex]
						) : (
							<AdsPictures
								value={this.state}
								screenSize={this.props.width}
								onClick={this.handleClick}
								destination={this.state.destination}
							/>
						)}
					</Hidden>
				</Paper>
				{!this.props.isLoading && !this.state.tripSubmitted ? (
					<Grid container>
						{' '}
						<Grid item xs={4} xl={5} lg={5}></Grid>
						<Grid item md={8} xl={6} lg={6}>
							<br />
							{this.state.index === 2 ? (
								<Button
									variant='contained'
									color='primary'
									onClick={this.handleSubmit}
									disabled={
										this.state.trip
											? this.state.buttonState ||
											  this.state.multiCity.every(
													(_, index) =>
														!this.state.multiCity[index].From ||
														!this.state.multiCity[index].To ||
														!this.state.multiCity[index].accomodationId ||
														!this.state.multiCity[index].reason ||
														!this.state.multiCity[index].departureDate ||
														!this.state.multiCity[index + 1].From ||
														!this.state.multiCity[index + 1].To ||
														!this.state.multiCity[index + 1].accomodationId ||
														!this.state.multiCity[index + 1].reason ||
														(!this.state.multiCity[index + 1].departureDate &&
															true),
											  )
											: this.state.multiCity.every(
													(_, index) =>
														!this.state.multiCity[index].From ||
														!this.state.multiCity[index].To ||
														!this.state.multiCity[index].accomodationId ||
														!this.state.multiCity[index].reason ||
														!this.state.multiCity[index].departureDate ||
														!this.state.multiCity[index + 1].From ||
														!this.state.multiCity[index + 1].To ||
														!this.state.multiCity[index + 1].accomodationId ||
														!this.state.multiCity[index + 1].reason ||
														(!this.state.multiCity[index + 1].departureDate &&
															true),
											  )
									}
								>
									{this.state.trip ? 'Save Request' : 'Create Request'}
								</Button>
							) : (
								<Button
									variant='contained'
									color='primary'
									onClick={this.handleSubmit}
									disabled={
										this.state.trip
											? this.state.buttonState ||
											  !this.state.From ||
											  !this.state.To ||
											  !this.state.reason ||
											  !this.state.departureDate ||
											  (!this.state.accomodationId && true)
											: !this.state.From ||
											  !this.state.To ||
											  !this.state.reason ||
											  !this.state.departureDate ||
											  (!this.state.accomodationId && true)
									}
								>
									{this.state.trip ? 'Save Request' : 'Create Request'}
								</Button>
							)}
						</Grid>{' '}
					</Grid>
				) : (
					<Grid container>
						{' '}
						<Grid item xs={4} xl={5} lg={5}></Grid>
						<Grid item md={8} xl={6} lg={6}>
							<CircularProgress />{' '}
						</Grid>{' '}
					</Grid>
				)}
				<Grid item style={Object.assign({}, styles.root)}>
					<Typography variant='h4' align='center'>
						{' '}
						<Footer />{' '}
					</Typography>
				</Grid>
			</Box>
		);
	}
}
export const mapStateToProps = state => {
	const loadding = state.appReducer;
	return {
		info: state.tripRequestReducer,
		isLoading: loadding.isLoading,
		message: state.tripRequestReducer.message,
		tripCreated: state.tripRequestReducer.tripCreated,
		error: state.tripRequestReducer.error,
		trip: state.tripRequestsReducers.tripToEdit,
	};
};
const request = connect(mapStateToProps, {
	requestTrip,
	GetAccomodations,
	editTripRequest,
})(withWidth()(TripRequest));

export default request;
