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
import { Box, Hidden, Grid, Card, CardContent } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	getUserTripRequestsAction,
	SearchTripRequests,
} from '../../actions/requests/tripRequestsAction';
import Moment from 'react-moment';
import { setSelectedTripRequestAction } from '../../actions/requests/tripRequestsAction';

const headCells = [
	{ id: 'Origin', align: 'left', label: 'Origin' },
	{ id: 'Destination', align: 'right', label: 'Destination' },
	{ id: 'Trip Type', align: 'right', label: 'Trip Type' },
	{ id: 'Status', align: 'right', label: 'Status' },
	{ id: 'Accomodation', align: 'right', label: 'Accomodation' },
	{ id: 'Departure Date', align: 'right', label: 'Departure Date' },
	{ id: 'Return Date', align: 'right', label: 'Return Date' },
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
}));

export const handleClick = (props, trip) => {
	props.history.push(`/trips/${trip[0].id}`);
	props.setSelectedTripRequestAction(trip);
};

export const Requests = props => {
	const classes = useStyles();

	const [page, setPage] = React.useState(0);
	const [showTable, setShowTable] = React.useState(true);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	useEffect(() => {
		if (props.trips.length == 0) {
			props.getUserTripRequestsAction({ page: 1, limit: 10 });
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
		props.getUserTripRequestsAction({ page: page, limit: rowsPerPage });
	};

	const handleChangeRowsPerPage = (
		props,
		setPage,
		setRowsPerPage,
		event,
		page,
		rowsPerPage,
	) => {
		setRowsPerPage(+event.target.value);
		setPage(1);
		props.getUserTripRequestsAction({ page: page, limit: rowsPerPage });
	};

	const statusColor = status => {
		return status === 'pending'
			? '#FBBC05'
			: status === 'approved'
			? '#34A853'
			: '#E10050';
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
								onChange={e => props.SearchTripRequests(e)}
								placeholder='Search by attribute like names,status, return date etc...'
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
			<Box style={{ display: showTable ? 'block' : 'none' }}>
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
							<TableBody>
								{props.searchError ? (
									<TableRow>
										<TableCell colSpan={7} align='center'>
											{'Ooops ! No related record found'}
										</TableCell>
									</TableRow>
								) : (
									props.trips.map((row, index) => {
										if (row.length > 0) {
											return (
												<TableRow
													id='tableRow'
													hover
													onClick={event => handleClick(props, row)}
													role='checkbox'
													tabIndex={-1}
													key={index}
												>
													<TableCell align='left'>{row[0].origin}</TableCell>
													<TableCell align='right'>
														{row[0].destination}
													</TableCell>
													<TableCell align='right'>{row[0].tripType}</TableCell>
													<TableCell
														align='right'
														style={{
															color: row.length
																? statusColor(row[0].status)
																: '',
														}}
													>
														{row[0].status}
													</TableCell>
													<TableCell align='right'>
														{row[0].accomodation}
													</TableCell>
													<TableCell align='right'>
														{`${row[0].departureDate}` != 'null' ? (
															<Moment format='D MMM YYYY'>
																{row[0].departureDate}
															</Moment>
														) : (
															'-'
														)}
													</TableCell>
													<TableCell align='right'>
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
										} else {
											if (showTable) {
												setShowTable(false);
											}
										}
									})
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Hidden>

				<Hidden lgUp>
					{props.trips.map((item, index) => {
						if (item.length > 0) {
							return (
								<Box key={index} p={1}>
									<Card
										id='cardItem'
										onClick={() => handleClick(props, item)}
										variant='outlined'
									>
										<CardContent style={{ padding: 16 }}>
											<Grid container>
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
														{item[0].departureDate != null ? (
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
														{item[0].returnDate != null ? (
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
						} else {
							return 'No entries!';
						}
					})}
				</Hidden>
				<TablePagination
					id='pagination'
					rowsPerPageOptions={[10, 20, 50, 100]}
					component='div'
					count={props.count}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={(event, newPage) =>
						handleChangePage(props, setPage, event, newPage, page, rowsPerPage)
					}
					onChangeRowsPerPage={event =>
						handleChangeRowsPerPage(
							props,
							setPage,
							setRowsPerPage,
							event,
							page,
							rowsPerPage,
						)
					}
				/>
			</Box>
			<Box
				style={{
					display: showTable ? 'none' : 'block',
				}}
				pb={6}
				pl={3}
			>
				<Typography
					variant='h6'
					style={{ fontSize: 18, color: 'gray' }}
					id='tableTitle'
				>
					No records available!
				</Typography>
			</Box>
		</Paper>
	);
};

export const mapStateToProps = state => {
	return {
		trips: state.tripRequestsReducers.myTrips,
		count: state.tripRequestsReducers.myTripsCount,
		searchError: state.tripRequestsReducers.searchError,
	};
};

export default connect(mapStateToProps, {
	getUserTripRequestsAction,
	setSelectedTripRequestAction,
	SearchTripRequests,
})(withRouter(Requests));
