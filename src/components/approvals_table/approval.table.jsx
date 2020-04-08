import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import CardContent from '@material-ui/core/CardContent';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Hidden, Grid, Card } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	getTripRequests,
	SearchTripRequests,
} from '../../actions/approval.table';
import { setSelectedTripRequestAction } from '../../actions/approval.table';
import Moment from 'react-moment';

const headCells = [
	{ id: 'Names', align: 'left', label: 'Names' },
	{ id: 'OriginDestination', align: 'center', label: 'Origin - Destination' },
	{ id: 'Trip Type', align: 'center', label: 'Trip Type' },
	{ id: 'Status', align: 'center', label: 'Status' },
	{ id: 'Accomodation', align: 'center', label: 'Accomodation' },
	{ id: 'Departure Date', align: 'center', label: 'Departure Date' },
	{ id: 'Return Date', align: 'center', label: 'Return Date' },
];

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	container: {
		maxHeight: 550,
	},
	margin: {
		margin: theme.spacing(1),
	},
	textField: {
		width: '25ch',
	},
}));

export const handleClick = (props, trip) => {
	props.history.push(`/trip-request/${trip[0].tripId}`);
	props.setSelectedTripRequestAction(trip);
};

export const statusColor = status => {
	return status === 'pending'
		? '#FBBC05'
		: status === 'Approved' || status === 'approved'
		? '#34A853'
		: '#E10050';
};

export const locationManager = trip => {
	if (trip.length > 1) {
		return `${trip[0].origin} (---) ${trip[trip.length - 1].destination}`;
	} else {
		return `${trip[0].origin} - ${trip[0].destination}`;
	}
};
export const ApprovalsTable = props => {
	const classes = useStyles();

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	useEffect(() => {
		if (props.trips.length == 0) {
			props.getTripRequests({ page: 1, limit: 10 });
		}
	});

	const handleChangePage = (
		props,
		setPage,
		event,
		newPage,
		page,
		rowsPerPage,
	) => {
		setPage(newPage);
		props.getTripRequests({ page: page, limit: rowsPerPage });
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
		props.getTripRequests({ page: 1, limit: +event.target.value });
	};

	return (
		<Paper>
			{props.trips.length > 0 && (
				<Grid container justify='center'>
					<Grid xs={11} xl={6} ms={6} item>
						<FormControl
							style={{ width: '99%' }}
							className={clsx(classes.margin, classes.textField)}
							variant='outlined'
						>
							<OutlinedInput
								style={{ backgroundColor: '#F1F1F1', border: '0px' }}
								id='outlined_adornment_weight'
								placeholder='Search by attribute like names,status, return date etc...'
								onChange={e => props.SearchTripRequests(e)}
								startAdornment={
									<InputAdornment position='start'>
										<SearchIcon />
									</InputAdornment>
								}
								aria-describedby='outlined-weight-helper-text'
								inputProps={{
									'aria-label': 'search',
								}}
							/>
						</FormControl>
					</Grid>
				</Grid>
			)}
			<Toolbar>
				<Typography variant='h6' id='tableTitle'></Typography>
			</Toolbar>
			<Hidden mdDown>
				<TableContainer
					style={{ overflowX: 'auto' }}
					className={classes.container}
				>
					<Table
						stickyHeader
						className={classes.table}
						aria-labelledby='tableTitle'
						size={'medium'}
						aria-label='enhanced table'
						style={{ minWidth: '340px' }}
					>
						<TableHead>
							<TableRow>
								{headCells.map(column => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ backgroundColor: '#0094FF', color: 'white' }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						{!props.count ? (
							<TableBody>
								<TableRow>
									<TableCell colSpan={7} align='center'>
										<CircularProgress align='center' />
									</TableCell>
								</TableRow>
							</TableBody>
						) : (
							<TableBody>
								{props.searchError ? (
									<TableRow>
										<TableCell colSpan={7} align='center'>
											{'Ooops ! No related record found'}
										</TableCell>
									</TableRow>
								) : (
									props.trips.map((row, index) => {
										return (
											<TableRow
												onClick={event => handleClick(props, row)}
												id='tableRow'
												hover
												role='checkbox'
												tabIndex={-1}
												key={index}
											>
												<TableCell align='left'>
													{row[0].firstName} {row[0].lastName}
												</TableCell>
												<TableCell align='center'>
													{locationManager(row)}
												</TableCell>
												<TableCell align='center'>{row[0].tripType}</TableCell>
												<TableCell
													align='center'
													style={{ color: `${statusColor(row[0].status)}` }}
												>
													{row[0].status.charAt(0).toUpperCase() +
														row[0].status.slice(1)}
												</TableCell>
												<TableCell align='center'>
													{row[0].accomodation}
												</TableCell>
												<TableCell align='center'>
													{`${row[0].departureDate}` != 'null' ? (
														<Moment format='D MMM YYYY'>
															{row[0].departureDate}
														</Moment>
													) : (
														'-'
													)}
												</TableCell>
												<TableCell align='center'>
													{`${row[0].returnDate}` != 'null' ? (
														<Moment format='D MMM YYYY'>
															{row[0].returnDate}
														</Moment>
													) : (
														'-'
													)}
												</TableCell>
											</TableRow>
										);
									})
								)}
							</TableBody>
						)}
					</Table>
				</TableContainer>
			</Hidden>

			<Hidden lgUp>
				{!props.count ? (
					<TableContainer>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell colSpan={7} align='center'>
										<CircularProgress align='center' />
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					props.trips.map((item, index) => {
						return (
							<Box key={index} p={1}>
								<Card
									id='cardItem'
									variant='outlined'
									onClick={() => handleClick(props, item)}
								>
									<CardContent style={{ padding: 16 }}>
										<Grid container>
											<Grid item container justify='space-between'>
												<Grid item>
													<Typography
														style={{ fontSize: 16, color: '#C4C4C4' }}
													>
														Names
													</Typography>
												</Grid>
												<Grid item>
													{item[0].firstName} {item[0].lastName}
												</Grid>
											</Grid>
											<Grid item container justify='space-between'>
												<Grid item>
													<Typography
														style={{ fontSize: 16, color: '#C4C4C4' }}
													>
														Origin
													</Typography>
												</Grid>
												<Grid item>{item[0].origin}</Grid>
											</Grid>
											<Grid item container justify='space-between'>
												<Grid item>
													<Typography
														style={{ fontSize: 16, color: '#C4C4C4' }}
													>
														Destination
													</Typography>
												</Grid>
												<Grid item>{item[0].destination}</Grid>
											</Grid>
											<Grid item container justify='space-between'>
												<Grid item>
													<Typography
														style={{ fontSize: 16, color: '#C4C4C4' }}
													>
														Trip type
													</Typography>
												</Grid>
												<Grid item>{item[0].tripType}</Grid>
											</Grid>
											<Grid item container justify='space-between'>
												<Grid item>
													<Typography
														style={{ fontSize: 16, color: '#C4C4C4' }}
													>
														Status
													</Typography>
												</Grid>
												<Grid item>{item[0].status}</Grid>
											</Grid>
											<Grid item container justify='space-between'>
												<Grid item>
													<Typography
														style={{ fontSize: 16, color: '#C4C4C4' }}
													>
														Accomodation
													</Typography>
												</Grid>
												<Grid item>{item[0].accomodation}</Grid>
											</Grid>
											<Grid item container justify='space-between'>
												<Grid item>
													<Typography
														style={{ fontSize: 16, color: '#C4C4C4' }}
													>
														Departure date
													</Typography>
												</Grid>
												<Grid item>
													{`${item[0].departureDate}` != 'null' ? (
														<Moment format='D MMM YYYY'>{`${item[0].departureDate}`}</Moment>
													) : (
														'-'
													)}
												</Grid>
											</Grid>
											<Grid item container justify='space-between'>
												<Grid item>
													<Typography
														style={{ fontSize: 16, color: '#C4C4C4' }}
													>
														Return date
													</Typography>
												</Grid>
												<Grid item>
													{`${item[0].returnDate}` != 'null' ? (
														<Moment format='D MMM YYYY'>
															{item[0].returnDate}
														</Moment>
													) : (
														'-'
													)}
												</Grid>
											</Grid>
										</Grid>
									</CardContent>
								</Card>
							</Box>
						);
					})
				)}
			</Hidden>
			<TablePagination
				id='pagination'
				rowsPerPageOptions={[10, 20, 30, 40, 50, 70, 100]}
				component='div'
				count={props.count}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={(event, newPage) =>
					handleChangePage(props, setPage, event, newPage, page, rowsPerPage)
				}
				onChangeRowsPerPage={event => handleChangeRowsPerPage(event)}
			/>
		</Paper>
	);
};

export const mapStateToProps = state => {
	return {
		trips: state.approvalsTableReducer.tripRequests,
		count: state.approvalsTableReducer.count,
		searchError: state.approvalsTableReducer.searchError,
	};
};

export default connect(mapStateToProps, {
	getTripRequests,
	setSelectedTripRequestAction,
	SearchTripRequests,
})(withRouter(ApprovalsTable));
