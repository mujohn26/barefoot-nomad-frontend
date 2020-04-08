import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import { Card, CardContent, Typography } from '@material-ui/core';
import {
	getAccommodations,
	getAccommodationsSuccess,
} from '../../actions/accommodationFacilitiesActions';
import { Styles } from '../../styles/userRole';
import { createBrowserHistory } from 'history';
import verifyToken from '../../helpers/tokenHelper';
import { Toolbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export const history = createBrowserHistory({
	forceRefresh: true,
});

export function createData(name, description, location, category, owner, id) {
	return { name, description, location, category, owner, id };
}

export class AccommodationFacility extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rowsPerPage: 5,
			page: 0,
			tvalue: [],
		};
	}

	UNSAFE_componentWillMount() {
		const token = localStorage.getItem('token');
		const user = verifyToken(token);
		if (user.payload.role !== 'admin') {
			history.push('/profile');
		}
		const { getAccommodations } = this.props;
		getAccommodations();
	}

	handleChangePage(event, newPage) {
		this.setState({
			page: newPage,
		});
	}
	handleChangeRowsPerPage(event) {
		this.setState({
			rowsPerPage: parseInt(event.target.value, 10),
			page: 0,
		});
	}


	render() {
		const rows = [];
		const { result } = this.props;
		let x;

		let accommodations = [];
		for (x in result) {
			accommodations.push(result[x]);
		}

		accommodations.map((accommodation, index) => {
			rows.push(
				createData(
					accommodation.name,
					accommodation.description,
					accommodation.location.city,
					accommodation.category,
					accommodation.owner,
					accommodation.id,
				),
			);
		});

		const { classes } = this.props;
		const emptyRows =
			this.state.rowsPerPage -
			Math.min(
				this.state.rowsPerPage,
				rows.length - this.state.page * this.state.rowsPerPage,
			);
		return (
			<div className={classes.root}>
				<Toolbar>
					<Typography variant='h6' id='tableTitle'>
						Accommodations
					</Typography>
				</Toolbar>
				<Paper className={classes.paper}>
					<Hidden mdDown>
						<TableContainer>
							<Table
								className={classes.table}
								aria-labelledby='tableTitle'
								aria-label='enhanced table'
								size='medium'
							>
								<TableHead className={classes.tableHeader}>
									<TableRow>
										<TableCell align='left' className={classes.tableCell}>
											Name
										</TableCell>
										<TableCell
											numeric
											align='center'
											className={classes.tableCell}
										>
											Description
										</TableCell>
										<TableCell
											numeric
											align='center'
											className={classes.tableCell}
										>
											Location
										</TableCell>
										<TableCell
											numeric
											align='center'
											className={classes.tableCell}
										>
											Category
										</TableCell>
										<TableCell
											numeric
											align='center'
											className={classes.tableCell}
										>
											Owner
										</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{rows
										.slice(
											this.state.page * this.state.rowsPerPage,
											this.state.page * this.state.rowsPerPage +
												this.state.rowsPerPage,
										)
										.map((row, index) => {
											return (
												<TableRow
													hover
													role='checkbox'
													tabIndex={-1}
													key={row.id}
													padding='checkbox'
												>
													<TableCell component='th' scope='row'>
														{row.name}
													</TableCell>
													<TableCell align='center'>
														{row.description}
													</TableCell>

													<TableCell align='center'>{row.location}</TableCell>
													<TableCell align='center'>{row.category}</TableCell>

													<TableCell align='center'>{row.owner}</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Hidden>
					<Hidden lgUp>
						{rows
							.slice(
								this.state.page * this.state.rowsPerPage,
								this.state.page * this.state.rowsPerPage +
									this.state.rowsPerPage,
							)
							.map((row, index) => {
								return (
									<Box key={index} p={1}>
										<Card id='cardItem' variant='outlined'>
											<CardContent style={{ padding: 16 }}>
												<Grid container>
													<Grid item container justify='space-between'>
														<Grid item>
															<Typography
																style={{ fontSize: 16, color: '#C4C4C4' }}
															>
																Name
															</Typography>
														</Grid>
														<Grid item>{row.name}</Grid>
													</Grid>
													<Grid item container justify='space-between'>
														<Grid item>
															<Typography
																style={{ fontSize: 16, color: '#C4C4C4' }}
															>
																Description
															</Typography>
														</Grid>
														<Grid item>{row.description}</Grid>
													</Grid>
													<Grid
														item
														container
														justify='space-between'
														alignItems='center'
														alignContent='center'
													>
														<Grid item>
															<Typography
																style={{ fontSize: 16, color: '#C4C4C4' }}
															>
																Location
															</Typography>
														</Grid>
														<Grid item>{row.location}</Grid>
													</Grid>
													<Grid item container justify='space-between'>
														<Grid item>
															<Typography
																style={{ fontSize: 16, color: '#C4C4C4' }}
															>
																Category
															</Typography>
														</Grid>
														<Grid item>
														
															{row.category}
													
														</Grid>
													</Grid>
													<Grid item container justify='space-between'>
														<Grid item>
															<Typography
																style={{ fontSize: 16, color: '#C4C4C4' }}
															>
																Owner
															</Typography>
														</Grid>
														<Grid item>
															{' '}
														
															{row.owner}
													
														</Grid>
													</Grid>
												</Grid>
											</CardContent>
										</Card>
									</Box>
								);
							})}
						<Grid container>
							<Grid item xs={12}>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									component='div'
									count={rows.length}
									rowsPerPage={this.state.rowsPerPage}
									page={this.state.page}
									onChangePage={this.handleChangePage.bind(this)}
									onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
								/>
							</Grid>
						</Grid>
					</Hidden>
					<Grid container>
						<Hidden mdDown>
							<Grid item xs={8}>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									component='div'
									count={rows.length}
									rowsPerPage={this.state.rowsPerPage}
									page={this.state.page}
									onChangePage={this.handleChangePage.bind(this)}
									onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
								/>
							</Grid>
						</Hidden>
					</Grid>
				</Paper>
				<Grid container>
				</Grid>
			</div>
		);
	}
}
export const mapStateToProps = state => {
	return {
		result: state.accommodationFacilitiesReducer.accommodations,
	};
};
const connectedAccommodationFacilityPage = withRouter(
	connect(mapStateToProps, {
		getAccommodations,
		getAccommodationsSuccess,
	})(withStyles(Styles)(AccommodationFacility)),
);
export default connectedAccommodationFacilityPage;
