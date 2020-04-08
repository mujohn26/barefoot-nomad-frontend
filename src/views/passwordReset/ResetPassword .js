import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import {
	Grid,
	Paper,
	Box,
	Typography,
	TextField,
	LinearProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from '../../styles/Styles';
import Button from '@material-ui/core/Button';
import {
	resetPassword,
	resetPasswordSuccess,
	deleteResetError
} from '../../actions/resetPasswordAction';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from 'history';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#0094ff',
			light: '#ffd449',
			dark: '#38a2ff',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#E10050',
			light: '#ffb644',
			dark: '#e10050e6',
			contrastText: '#ffffff',
		},
		error: {
			main: '#A21C2B',
		},
	},
});

export const history = createBrowserHistory({
	forceRefresh: true,
});
export class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			confirmPassword: '',
			matchingError: '',
			passwordError:'',
			passwordValidate: '',
			confirmPasswordValidate: '',
			isPasswordValid: true,
			isConfirmPasswordValid: true,
			isMatching: false,
			target:''
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.resetMessage !== prevProps.resetMessage) {
			history.push('/auth/reset-notification-sucess');
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		const { resetPassword } = this.props;
		const params = queryString.parse(location.search);
		const token = params.resetToken;
		const { password, confirmPassword } = this.state;
		const updatedPassword = {
			password,
			confirmPassword,
		};

		
		if (this.state.isMatching===true && this.state.isPasswordValid === true) {
			resetPassword({ token, updatedPassword });
		}
	
	}

	validate(name, value) {
		let passwordError = '';

		if (this.state.password === value && name === 'confirmPassword') {
			this.setState({
				passwordError:'',
				isMatching: true,
			});
			
			return true;
		}
		else{
		this.setState({
			passwordError:'Password does not match',
			isMatching: false,
			target:name
		});
		return false;}
	}
	shouldBeDisabled() {
		const { isPasswordValid, isConfirmPasswordValid, isMatching } = this.state;
		if (isPasswordValid && isConfirmPasswordValid && isMatching) {
			return false;
		}
		return true;
	}
	handleBlur(event) {
		this.setState({
			passwordError:'',
		});


		const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		if (event.target.name === 'password' && event.target.name !== '') {
			const isPasswordValid = regEx.test(event.target.value);
			this.setState({
				isPasswordValid: isPasswordValid,
			});
		}
		if (event.target.name === 'confirmPassword' && event.target.name !== '') {
			const isConfirmPasswordValid = regEx.test(event.target.value);
			this.setState({
				isConfirmPasswordValid: isConfirmPasswordValid
			});
		}
	}
	handleChange(event) {
		const {deleteResetError} = this.props;
		deleteResetError();

		this.setState({
			[event.target.name]: event.target.value,
			passwordError: '',
			isPasswordValid: true,
			isConfirmPasswordValid: true,
		});

		this.validate(event.target.name, event.target.value);
	}
	render() {
		const { classes } = this.props;
		return (
			<div>
				<ThemeProvider theme={theme}>
					<Grid container>
						 
						<img
							src='https://res.cloudinary.com/drpye5niv/image/upload/v1580822689/barefoot_nomad_logo_xvfgsp.png'
							width='279px'
							height='91.93px'
						/>
					</Grid>
					<Box m={18} />
					<Grid
						container
						direction='column'
						justify='center'
						alignItems='center'
					>
						<Grid item xs={6}>
							<Paper className={classes.paper2}>
								<Grid
									container
									item
									direction='column'
									justify='center'
									alignItems='stretch'
								>
									<Box m={2} />
									<Grid item xs={12}>
										<Typography className={classes.title}>
											Reset your password
										</Typography>
									</Grid>
									<Box m={1} />
									<Grid item xs={12}>
										 
										<form onSubmit={this.handleSubmit.bind(this)}>
											<TextField
												className={classes.inputField}
												data-test='reset-password-field'
												name='password'
												type='password'
												id='user-input1'
												label='Provide your new password'
												variant='outlined'
												onBlur={this.handleBlur.bind(this)}
												onChange={this.handleChange.bind(this)}
												required
												error={!this.state.isPasswordValid}
												helperText={
													!this.state.isPasswordValid
														? 'Password must be at least 8 characters and 1 number'
														: ''
												}
											/>
											<Box m={5} />{' '}
											<TextField
												className={classes.inputField}
												data-test='reset-confirm-password-field'
												name='confirmPassword'
												type='password'
												id='user-input2'
												label='Confirm Password'
												variant='outlined'
												onBlur={this.handleBlur.bind(this)}
												onChange={this.handleChange.bind(this)}
												required
												error={!this.state.isConfirmPasswordValid}
												helperText={
													!this.state.isConfirmPasswordValid
														? 'Confirm password must be at least 8 characters and 1 number'
														: ''
												}
											/>
											{this.state.passwordError && this.state.target === 'confirmPassword' ? (
												<div style={{ color: 'red', fontSize: '15px' }}>
												<Box m={3} />
													 {this.state.passwordError}
													
												</div>
											) : null}
											<Box m={4} />
											<Button
												color='primary'
												type='submit'
												data-test='reset-btn'
												className='submitButton'
												disableElevation
												variant='contained'
												className={classes.button}
												disabled={this.shouldBeDisabled()}
											>
												submit
											</Button>
											<Box hidden={!this.props.isLoading} pt={0.5}> <LinearProgress/> </Box>
										</form>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</ThemeProvider>
			</div>
		);
	}
}

export const mapStateToProps = state => {


	return {
		resetMessage: state.passwordReducer.resetMessage,
		isLoading:state.passwordReducer.isLoading,
		resetMessageError:state.passwordReducer.resetMessageError
	};
};
const connectedResetPasswordPage = connect(mapStateToProps, {
	resetPassword,
	resetPasswordSuccess,
	deleteResetError
})(withStyles(useStyles)(ResetPassword));
export default connectedResetPasswordPage;
