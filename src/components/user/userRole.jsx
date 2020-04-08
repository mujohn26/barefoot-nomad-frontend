import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import { Card, CardContent, Typography } from '@material-ui/core';

import { Grid, Container } from '@material-ui/core';
import {
	getUsers,
	getUsersAction,
	updateUserRole,
	updateRoleSucess,
	updateRoleFailure,
	updateOneUser,
} from '../../actions/UserRoleSettingAction';
import { Styles } from '../../styles/userRole';
import { createBrowserHistory } from 'history';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Moment from 'react-moment';
import verifyToken from '../../helpers/tokenHelper';
import { log } from 'util';
import { Toolbar } from '@material-ui/core';
import Footer from '../common/footer';

export const history = createBrowserHistory({
	forceRefresh: true,
});

export function createData(name, email, role, createdAt, updatedAt, id) {
	return { name, email, role, createdAt, updatedAt, id };
}

export class UserRoleSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rowsPerPage: 5,
			page: 0,
			userId: '',
			open: false,
			openModal: false,
			user: [],
			roles: [],
			disabled: true,
			tvalue: [],
		};
	}

	UNSAFE_componentWillMount() {
		const token = localStorage.getItem('token');
		const user = verifyToken(token);
		if (user.payload.role !== 'admin') {
			history.push('/profile');
		}
		const { getUsers } = this.props;
		getUsers();
	}

	handleClick(event) {
		const { updateUserRole } = this.props;
		const { user } = this.state;
		user.map((users, index) => {
			updateUserRole({ userId: users.userId, role: users.role });
		});
		this.setState({
			disabled: true,
		});
	}
	handleCloseAlert(event, reason) {
		this.setState({
			open: false,
		});
	}
	handleCloseModal() {
		this.setState({
			openModal: false,
		});
	}
	handleCancel() {
		const { getUsers } = this.props;
		getUsers();
		this.setState({
			disabled: true,
			openModal: false,
		});
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
	componentDidUpdate(prevProps) {
		if (this.props.role !== prevProps.role) {
			this.setState({
				open: true,
				disabled: true,
			});
		}
	}

	render() {
		const rows = [];
		let defaultRole;
		const { result } = this.props;
		let x;
		let users = [];
		for (x in result) {
			users.push(result[x]);
		}

		users.map((user, index) => {
			rows.push(
				createData(
					user.firstName + ' ' + user.lastName,
					user.email,
					user.role,
					user.createdAt,
					user.updatedAt,
					user.id,
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
				<Modal
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'
					open={this.state.openModal}
					className={classes.popUp}
				>
					<div className={classes.modal}>
						<h2 id='simple-modal-title'>Important Message</h2>
						<p id='simple-modal-description'>
							This user role you are going to change is a manager who is
							assigned to users,kindly first assign managers to these users. Do
							you wish to continue ?
						</p>

						<Button onClick={this.handleCloseModal.bind(this)}>Yes</Button>
						<Button onClick={this.handleCancel.bind(this)}>No</Button>
					</div>
				</Modal>
				<Snackbar
					open={this.state.open}
					autoHideDuration={5000}
					className={classes.Snackbar}
					onClose={this.handleCloseAlert.bind(this)}
				>
					<Alert severity='success'>Role updated successfully</Alert>
				</Snackbar>
				<Paper className={classes.paper}>
					<Hidden mdDown>
						<TableContainer>
							<Table
								className={classes.table}
								aria-labelledby='tableTitle'
								aria-label='enhanced table'
								size='small'
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
											Email
										</TableCell>
										<TableCell
											numeric
											align='center'
											className={classes.tableCell}
										>
											Role
										</TableCell>
										<TableCell
											numeric
											align='center'
											className={classes.tableCell}
										>
											Created At
										</TableCell>
										<TableCell
											numeric
											align='center'
											className={classes.tableCell}
										>
											Updated At
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
													<TableCell align='center'>{row.email}</TableCell>

													<TableCell align='right'>
														<Autocomplete
															data-test='autocomplete-field'
															id={row.id}
															size='small'
															key={row.id}
															options={roles}
															classes={{
																option: classes.option,
															}}
															value={{ role: row.role }}
															inputValue={row.role}
															getOptionLabel={option => option.role}
															defaultValue={roles[3].role}
															onChange={(e, value) => {
																if (row.role === 'manager') {
																	this.setState({
																		openModal: true,
																	});
																}
																const myArray = this.state.user;
																myArray.push({
																	userId: row.id,
																	role: value.role,
																});
																this.setState({
																	user: myArray,
																	disabled: false,
																});

																this.props.updateOneUser(
																	{ id: row.id, role: value.role },
																	users,
																);
															}}
															renderInput={params => (
																<TextField
																	{...params}
																	fullWidth
																	label='user role'
																	margin='normal'
																/>
															)}
														/>
													</TableCell>
													<TableCell align='center'>
														<Moment format='D MMM YYYY'>{row.createdAt}</Moment>
													</TableCell>

													<TableCell align='center'>
														<Moment format='D MMM YYYY'>{row.updatedAt}</Moment>
													</TableCell>
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
																Email
															</Typography>
														</Grid>
														<Grid item>{row.email}</Grid>
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
																Role
															</Typography>
														</Grid>
														<Grid item>
															<Autocomplete
																className={classes.Autocomplete}
																data-test='autocomplete-field'
																id={row.id}
																size='small'
																key={row.id}
																options={roles}
																classes={{
																	option: classes.option,
																}}
																value={{ role: row.role }}
																inputValue={row.role}
																getOptionLabel={option => option.role}
																defaultValue={roles[3].role}
																onChange={(e, value) => {
																	if (row.role === 'manager') {
																		this.setState({
																			openModal: true,
																		});
																	}
																	const myArray = this.state.user;
																	myArray.push({
																		userId: row.id,
																		role: value.role,
																	});
																	this.setState({
																		user: myArray,
																		disabled: false,
																	});

																	this.props.updateOneUser(
																		{ id: row.id, role: value.role },
																		users,
																	);
																}}
																renderInput={params => (
																	<TextField
																		{...params}
																		fullWidth
																		label='user role'
																		margin='normal'
																	/>
																)}
															/>
														</Grid>
													</Grid>
													<Grid item container justify='space-between'>
														<Grid item>
															<Typography
																style={{ fontSize: 16, color: '#C4C4C4' }}
															>
																createdAt
															</Typography>
														</Grid>
														<Grid item>
															<Moment format='D MMM YYYY'>
																{row.createdAt}
															</Moment>
														</Grid>
													</Grid>
													<Grid item container justify='space-between'>
														<Grid item>
															<Typography
																style={{ fontSize: 16, color: '#C4C4C4' }}
															>
																updatedAt
															</Typography>
														</Grid>
														<Grid item>
															{' '}
															<Moment format='D MMM YYYY'>
																{row.updatedAt}
															</Moment>
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
						<Grid item xs={5}></Grid>
						<Grid item xs={1}>
							<Button
								className={classes.cancelButton}
								variant='contained'
								color='secondary'
								onClick={this.handleCancel.bind(this)}
								disabled={this.state.disabled}
							>
								Cancel
							</Button>
						</Grid>
						<Grid item xs={1}>
							{!this.props.isLoading ? (
								<Button
									data-test='update-btn'
									variant='contained'
									color='primary'
									className={classes.updateButton}
									onClick={this.handleClick.bind(this)}
									disabled={this.state.disabled}
								>
									update
								</Button>
							) : (
								<CircularProgress />
							)}
						</Grid>
						<Hidden mdDown>
							<Grid item xs={5}>
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
				<Footer />
			</div>
		);
	}
}
const roles = [
	{ role: 'travel admin' },
	{ role: 'travel team ' },
	{ role: 'manager' },
	{ role: 'requester' },
	{ role: 'supplier' },
	{ role: 'admin' },
];
export const mapStateToProps = state => {
	return {
		result: state.UserSettingReducer.users,
		role: state.UserSettingReducer.role,
		isLoading: state.UserSettingReducer.isLoading,
		isLoadingData: state.UserSettingReducer.isLoadingData,
		updateErrorMessage: state.UserSettingReducer.updateErrorMessage,
	};
};
const connectedUserRoleSettingPage = withRouter(
	connect(mapStateToProps, {
		updateUserRole,
		updateRoleSucess,
		getUsers,
		getUsersAction,
		updateRoleFailure,
		updateOneUser,
	})(withStyles(Styles)(UserRoleSetting)),
);
export default connectedUserRoleSettingPage;
