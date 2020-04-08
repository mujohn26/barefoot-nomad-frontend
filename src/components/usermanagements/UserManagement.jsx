import React, { Component } from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import {
	getUsersManagers,
	getManagers,
	updateUserManager,
	onChangeState,
} from '../../actions/userManagementAction';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Toolbar } from '@material-ui/core';
import { Styles } from '../../styles/userManagementStyles';
import Footer from '../common/footer';

export class UserManagement extends Component {
	state = {
		page: 0,
		rowsPerPage: 5,
		isButtonDisabled: true,
		managers: [],
		open: false,
		usersToUpdate: [],
		otherRows: [],
		isCancelled: false,
		userManagerCopy: [],
	};
	componentDidMount() {
		const { getUsersManagers, getManagers } = this.props;
		const { page, rowsPerPage } = this.state;
		getUsersManagers(page, rowsPerPage);
		getManagers();
	}

	componentDidUpdate(prevProps) {
		if (this.props.updatedData !== prevProps.updatedData) {
			this.setState({ open: true, isButtonDisabled: true });
			const { getUsersManagers, getManagers } = this.props;
			const { page, rowsPerPage } = this.state;
			getUsersManagers(page, rowsPerPage);
		}
	}
	handleChangePage = (event, newPage) => {
		this.setState({ page: newPage });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: +event.target.value });
		this.setState({ page: 0 });
	};
	handleCancel = async () => {
		const { getUsersManagers } = this.props;
		const { page, rowsPerPage } = this.state;
		await getUsersManagers(page, rowsPerPage);
		this.setState({
			isButtonDisabled: true,
		});
	};
	handleOnClose = () => {
		this.setState({ open: false });
	};
	handleOptionLabel = option => {
		return option.firstName;
	};

	handleOnChangeLabel = (e, value, user) => {
		this.props.onChangeState(this.props.userData, {
			id: user.id,
			manager: `${!value ? '' : value.firstName} ${
				!value ? '' : value.lastName
			}`,
		});
		const found = this.state.usersToUpdate.find(row => row.userId === user.id);
		if (found) {
			lodash.remove(this.state.usersToUpdate, users => {
				return users.userId === user.id;
			});
		}
		if (user && value) {
			this.setState({
				usersToUpdate: [
					...this.state.usersToUpdate,
					{ userId: user.id, managerId: value.id },
				],
				isButtonDisabled: false,
				snackMessageError: false,
			});
			return;
		}

		this.setState({
			isButtonDisabled: false,
		});
	};
	handleUpdate = () => {
		this.state.usersToUpdate.map((row, index) => {
			this.props.updateUserManager(row.userId, row.managerId);
		});
	};
	filterManager = (managers, currentUser) => {
		const userManager = [];
		managers.map(manager => {
			if (
				manager.firstName + ' ' + manager.lastName !== currentUser.manager &&
				manager.id !== currentUser.id
			) {
				userManager.push(manager);
			}
		});
		return userManager;
	};

	render() {
		const columns = [
			{ id: 'firstName', label: 'First Name', minWidth: 100, align: 'center' },
			{ id: 'lastName', label: 'Last Name', minWidth: 100, align: 'center' },
			{ id: 'email', label: 'User Email', minWidth: 130, align: 'center' },
			{ id: 'role', label: 'Role', minWidth: 130, align: 'center' },
			{ id: 'manager', label: 'Line Manager', minWidth: 130, align: 'center' },
		];
		const { classes, userData, managerData } = this.props;
		return (
			<div className={classes.root}>
				<Snackbar
					open={this.state.open}
					autoHideDuration={3000}
					className={classes.Snackbar}
					onClose={this.handleOnClose}
				>
					<Alert severity='success'>
						User successfully assigned to manager
					</Alert>
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
										{columns.map(column => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{
													minWidth: column.minWidth,
													backgroundColor: '#0094FF',
													color: 'white',
												}}
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{userData
										.slice(
											this.state.page * this.state.rowsPerPage,
											this.state.page * this.state.rowsPerPage +
												this.state.rowsPerPage,
										)

										.map((user, index) => {
											return (
												<TableRow
													hover
													role='checkbox'
													tabIndex={-1}
													key={user.id}
												>
													<TableCell align='center'>{user.firstName}</TableCell>
													<TableCell align='center'>{user.lastName}</TableCell>
													<TableCell align='center'>{user.email}</TableCell>
													<TableCell align='center'>{user.role}</TableCell>
													<TableCell align='center'>
														<Autocomplete
															id={managerData.id}
															options={this.filterManager(managerData, user)}
															name={'value'}
															className='getOption'
															getOptionLabel={option =>
																this.handleOptionLabel(option)
															}
															value={{ firstName: `${user.manager} ` }}
															style={{ fontSize: '5px' }}
															onChange={(e, value) =>
																this.handleOnChangeLabel(e, value, user)
															}
															renderInput={params => {
																return (
																	<TextField
																		{...params}
																		label={'Assign a manager'}
																		margin='normal'
																		fullWidth
																	/>
																);
															}}
														/>
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
						<footer className={classes.footer}>
							<Footer />
						</footer>
					</Hidden>
					<Hidden lgUp>
						{userData
							.slice(
								this.state.page * this.state.rowsPerPage,
								this.state.page * this.state.rowsPerPage +
									this.state.rowsPerPage,
							)
							.map((user, index) => {
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
																First Name
															</Typography>
														</Grid>
														<Grid item>{user.firstName}</Grid>
													</Grid>
													<Grid item container justify='space-between'>
														<Grid item>
															<Typography
																style={{ fontSize: 16, color: '#C4C4C4' }}
															>
																Last Name
															</Typography>
														</Grid>
														<Grid item>{user.lastName}</Grid>
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
																Email
															</Typography>
														</Grid>
														<Grid item>{user.email}</Grid>
													</Grid>
													<Grid item container justify='space-between'>
														<Grid item>
															<Typography
																style={{ fontSize: 16, color: '#C4C4C4' }}
															>
																Role
															</Typography>
														</Grid>
														<Grid item>{user.role}</Grid>
													</Grid>
													<Grid item container justify='space-between'>
														<Grid item>
															<Typography
																style={{ fontSize: 16, color: '#C4C4C4' }}
															>
																Manager
															</Typography>
														</Grid>
														<Grid item xs={10} sm={8}>
															<Autocomplete
																id={managerData.id}
																options={this.filterManager(
																	managerData,
																	user.manager,
																)}
																name={'value'}
																getOptionLabel={option =>
																	this.handleOptionLabel(option)
																}
																className='getOptions'
																value={{ firstName: `${user.manager} ` }}
																style={{ fontSize: '5px' }}
																onChange={(e, value) =>
																	this.handleOnChangeLabel(e, value, user)
																}
																renderInput={params => (
																	<TextField
																		{...params}
																		style={{ margin: 5 }}
																		label={'Assign a manager'}
																		margin='normal'
																		fullWidth
																	/>
																)}
															/>
														</Grid>
													</Grid>
												</Grid>
											</CardContent>
										</Card>
									</Box>
								);
							})}
						<Grid>
							<Grid item xs={12}>
								<TablePagination
									rowsPerPageOptions={[2, 5, 10, 30]}
									component='div'
									count={userData.length}
									rowsPerPage={this.state.rowsPerPage}
									page={this.state.page}
									onChangePage={this.handleChangePage}
									onChangeRowsPerPage={this.handleChangeRowsPerPage}
								/>
							</Grid>
						</Grid>
					</Hidden>
					<Grid container justify='flex-end'>
						<Grid item xs={1}>
							<Button
								variant='contained'
								color='secondary'
								style={{ fontWeight: 'bolder' }}
								disabled={this.state.isButtonDisabled}
								className={`${classes.cancelButton} cancelbutton`}
								onClick={this.handleCancel}
								id='cancel-button'
							>
								Cancel
							</Button>
						</Grid>
						<Grid item xs={1}>
							<Button
								variant='contained'
								color='primary'
								style={{ fontWeight: 'bolder' }}
								disabled={this.state.isButtonDisabled}
								onClick={this.handleUpdate}
								className={`${classes.updateButton} updatebutton`}
							>
								Update
							</Button>
						</Grid>
						<Hidden mdDown>
							<Grid item xs={8} container justify='flex-end'>
								<TablePagination
									rowsPerPageOptions={[2, 5, 10, 30]}
									component='div'
									count={userData.length}
									rowsPerPage={this.state.rowsPerPage}
									page={this.state.page}
									onChangePage={this.handleChangePage.bind(this)}
									onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
								/>
							</Grid>
						</Hidden>
					</Grid>
				</Paper>
				<footer className={classes.footer}>
					<Footer />
				</footer>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		userData: state.userManagementReducer.userData,
		managerData: state.userManagementReducer.managerData,
		updatedData: state.userManagementReducer.updatedData,
		errorMessage: state.userManagementReducer.errorMessage,
		cancelUpdate: state.userManagementReducer.cancelledUpdateManagers,
	};
};

export default connect(mapStateToProps, {
	updateUserManager,
	getUsersManagers,
	getManagers,
	onChangeState,
})(withStyles(Styles)(UserManagement));
