import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	TextField,
	MenuItem,
	Select,
	FormControl,
	Container,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { GetLocations } from '../../actions/tripRequestAction.js';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const useStyles = {
	box: {
		'& > *': {
			margin: '10px 0px 0px 5px',
			width: 200,
		},
	},
};

export class OneWayForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			destination: '',
		};
	}

	UNSAFE_componentWillMount() {
		this.props.GetLocations();
	}
	render() {
		const { classes, info } = this.props;
		const { From, To, departureDate, reason, returnDate } = this.props.value;
		const departureLocation = info.locationsInfo.map((location, index) => (
			<MenuItem value={location.id} key={index}>
				{location.city}
			</MenuItem>
		));
		const destinationLocation = info.locationsInfo.map(
			(location, index) => (
				To === location.id ? (this.props.city.destination = location.city) : '',
				(
					<MenuItem value={location.id} key={index}>
						{location.city}
					</MenuItem>
				)
			),
		);
		return (
			<div>
				<Container maxWidth='xl' className={classes.box}>
					<FormControl size='small' fullWidth>
						<Select
							name='From'
							id='departure'
							value={
								this.props.previousValue ? this.props.previousValue.To : From
							}
							onChange={
								this.props.index
									? e => (
											this.props.onHandleChange(e, this.props.number),
											this.setState({ submitted: true })
									  )
									: this.props.onHandleChange
							}
							variant='outlined'
							displayEmpty
							disabled={
								this.props.previousValue
									? this.props.previousValue.To
										? true
										: false
									: false
							}
						>
							<MenuItem value='' disabled>
								<em>Departure</em>
							</MenuItem>
							{departureLocation}
						</Select>
					</FormControl>
					<FormControl size='small' fullWidth>
						<Select
							name='To'
							id='destination'
							value={To}
							onChange={
								this.props.index
									? e => (
											this.props.onHandleChange(e, this.props.number),
											this.setState({ submitted: false })
									  )
									: this.props.onHandleChange
							}
							variant='outlined'
							displayEmpty
						>
							<MenuItem value='' city='' disabled>
								<em>Destination</em>
							</MenuItem>
							{destinationLocation}
						</Select>
					</FormControl>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							inputVariant='outlined'
							disableToolbar
							variant='inline'
							size='small'
							format='MM/dd/yyyy'
							margin='none'
							label='Departure date'
							name='departureDate'
							minDate={
								this.props.previousValue
									? this.props.previousValue.departureDate
									: departureDate
							}
							minDateMessage='Departure date should be prior to the departure date of previous trip'
							value={departureDate}
							onChange={
								this.props.index
									? e => (
											this.props.handleChangeDateMultiCity(
												e,
												'departureDate',
												this.props.number,
											),
											this.setState({ submitted: true })
									  )
									: this.props.handleChangeDepartureDate
							}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</MuiPickersUtilsProvider>
					{this.props.value.index === 1 ? (
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								inputVariant='outlined'
								disableToolbar
								variant='inline'
								size='small'
								format='MM/dd/yyyy'
								margin='none'
								minDate={departureDate}
								minDateMessage='Return date should be prior to the departure date'
								label='Return Date'
								name='returnDate'
								value={returnDate}
								onChange={() => this.props.handleChangeReturnDate}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
						</MuiPickersUtilsProvider>
					) : null}
					<TextField
						size='small'
						label='reason'
						type='name'
						variant='outlined'
						value={reason}
						name='reason'
						onChange={
							this.props.index
								? e => (
										this.props.onHandleChange(e, this.props.number),
										this.setState({ submitted: false })
								  )
								: this.props.onHandleChange
						}
					/>
					{this.props.index && this.props.multiCityDatalength > 2 ? (
						<CloseRoundedIcon
							style={{
								fontSize: 20,
								cursor: 'pointer',
								margin: '12px 0px 0px 0px',
								width: 100,
							}}
							color='secondary'
							onClick={() => this.props.handleDelete(this.props.index)}
							data-test='detele-icon'
						/>
					) : null}
				</Container>
			</div>
		);
	}
}
export const mapStateToProps = state => {
	return {
		info: state.tripRequestReducer,
	};
};
const OneWay = connect(mapStateToProps, {
	GetLocations,
})(withStyles(useStyles)(OneWayForm));

export default OneWay;
