import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Box, Container, Link } from '@material-ui/core';
import Footer from '../common/footer';
import { connect } from 'react-redux';
import { signIn, history } from '../../actions/signInAction';
import { logout } from '../../actions/logoutAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import { formUseStyles } from '../../styles/login/loginStyle.js';
import SocialAuth from '../auth/SocialLogin.jsx';

export class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.props.logout();
		this.state = {
			email: '',
			password: '',
			submitted: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}
	componentDidUpdate(prevProps) {
		if (this.props.user !== prevProps.user) {
			history.push('/');
		}
	}
	handleSubmit(e) {
		e.preventDefault();
		// this.setState({ submitted: false });
		const { email, password } = this.state;
		if (email && password) {
			this.props.signIn(email, password);
		}
	}
	render() {
		const { classes } = this.props;
		const { email, password, submitted } = this.state;
		return (
			<Container component='main' maxWidth='xs'>
				<div className={classes.paper}>
					<Typography variant='h4' align='left'>
						{' '}
						Sign In{' '}
					</Typography>
					<Typography variant='subtitle2' color='textSecondary' align='left'>
						Sign in to access the full features of Barefoot Nomad.
					</Typography>
					<br />
					<Box pt={1} pb={1}>
						<form onSubmit={this.handleSubmit}>
							<div>
								<TextField
									variant='outlined'
									margin='normal'
									required
									fullWidth
									label='Provide Your email'
									name='email'
									size='small'
									autoComplete='email'
									value={this.email}
									data-test='signin-email'
									onChange={this.handleChange}
									type='email'
									autoFocus
								/>{' '}
								{submitted && !email && (
									<Typography component='h1' variant='subtitle2' color='error'>
										{' '}
										Email is required{' '}
									</Typography>
								)}
							</div>
							<div>
								<TextField
									variant='outlined'
									margin='normal'
									required
									fullWidth
									name='password'
									size='small'
									label='Provide Your Password'
									type='password'
									value={this.password}
									data-test='signin-password'
									onChange={this.handleChange}
									autoComplete='current-password'
								/>{' '}
								{submitted && !password && (
									<Typography component='h1' variant='subtitle2' color='error'>
										{' '}
										Password is required{' '}
									</Typography>
								)}
							</div>
							<Typography component='h2' variant='subtitle1' align='left'>
								<Link
									href='/auth/forgot-password'
									variant='body2'
									style={{ textDecoration: 'none', color: '#0094FF' }}
								>
									{' '}
									Forgot password?
								</Link>
							</Typography>
							{this.props.stateObject.signInReducer.error ? (
								<Typography component='h1' variant='subtitle2' color='error'>
									{' '}
									{this.props.message}
								</Typography>
							) : null}
							{!this.props.isLoading ? (
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='primary'
									data-test='login-btn'
									className={classes.submit}
									disabled={!password || (!email && true)}
								>
									Sign In
								</Button>
							) : (
								<CircularProgress />
							)}
							<Typography variant='h6' color='textSecondary'>
								{' '}
								Or{' '}
							</Typography>
							<SocialAuth /> <br />
							<Typography variant='subtitle2' color='textSecondary'>
								{' '}
								Don't have an account yet?{' '}
								<Link
									href='/auth/signup'
									variant='body2'
									style={{ textDecoration: 'none', color: '#0094FF' }}
								>
									{'Sign Up'}
								</Link>
								<br /> <br /> By signing in or creating an account, you agree
								with our{' '}
								<Link href='#' variant='body2' className={classes.link}>
									{' '}
									{'Terms & Conditions and Privacy Statement'}{' '}
								</Link>
							</Typography>
						</form>
					</Box>
				</div>
				<Footer />
			</Container>
		);
	}
}
export function mapStateToProps(state) {
	const loggingIn = state.signInReducer;
	const loadding = state.appReducer;
	return {
		message: 'Email or Password is incorrect',
		stateObject: state,
		user: loggingIn.user,
		isLoading: loadding.isLoading,
	};
}

const connectedLoginPage = connect(mapStateToProps, {
	signIn,
	logout,
	history,
})(withStyles(formUseStyles)(LoginForm));

export default connectedLoginPage;
