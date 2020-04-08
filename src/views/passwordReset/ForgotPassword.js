import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Box, Typography, TextField,LinearProgress} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {
	sendResetLink,
	forgotPasswordSuccess,
	forgotPasswordError,
	deleteForgotError,
} from '../../actions/resetPasswordAction';
import { useStyles } from '../../styles/Styles';
import {createBrowserHistory} from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';


export const history=createBrowserHistory({
  forceRefresh:true
})


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

export class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			error: '',
		};
	}
	componentDidUpdate(prevProps) {		
		if (this.props.forgotMessage !== prevProps.forgotMessage) {
		history.push('/auth/reset-notification');
		}
	   }
	handleSubmit(event) {
		const { deleteForgotError } = this.props;
		deleteForgotError();
		event.preventDefault();
		const email = this.state.email;
		const { sendResetLink } = this.props;

		sendResetLink(email);
		this.setState({ error: 'this email is not registered' });
	}
	handleChange(event) {
		this.setState({
			email: event.target.value,
			error: '',

		});
	}
	shouldBeDisabled () {
		const {email} = this.state;
		const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       const isEmailValid = regEx.test(email);
		
        if (isEmailValid) {
            return false;
        }
        return true;
    };

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
				<Box m={20} />
				<Grid container direction='column' justify='center' alignItems='center'>
					<Grid item xs={6}>
						<Paper className={classes.paper}>
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
										Confirm your email
									</Typography>
									<br />
									<Typography className={classes.subtitle}>
										Enter your email address and we will send 
										<br />
										you a link to reset your password.
									</Typography>
								</Grid>
								<Box m={1} />
								<Grid item xs={12}>
									 
									<form onSubmit={this.handleSubmit.bind(this)}>
										<TextField
										    
											className={classes.inputField}
											data-test='forgot-email-field'
											type='email'
											id='user-input'
											label='Provide your email'
											variant='outlined'
											onChange={this.handleChange.bind(this)}
											required
										/>
										 <Box m={4} />
										{this.props.forgotMessageError ? (
											<div className style={{ color: 'red', fontSize: '16px' }}>
											{this.state.error}
											</div>
										) : null}
										
										<Button
										     color="primary"
											type='submit'
											id='submitButton'
											data-test='forgot-btn'
											disableElevation
											variant="contained"
											className={classes.button}
											disabled={this.shouldBeDisabled()}
										>
											send
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
		forgotMessage: state.passwordReducer.forgotMessage,
		isLoading:state.passwordReducer.isLoading,
		forgotMessageError:state.passwordReducer.forgotMessageError
	};
};

const connectedForgotPasswordPage = connect(mapStateToProps, {
	sendResetLink,
	forgotPasswordSuccess,
	forgotPasswordError,
	deleteForgotError,
})(withStyles(useStyles)(ForgotPassword));
export default connectedForgotPasswordPage;
