import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, Hidden, CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CountrySelect from '../templates/CountrySelect.jsx';
import GenderSelect from '../templates/GenderSelect.jsx';
import LanguageSelect from '../templates/LangugeSelect.jsx';
import UploadImage from '../templates/UploadImage.jsx';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import { connect } from 'react-redux';
import {
	GetUserProfile,
	changeAttribute,
	updateUserProfile,
	cancelUserUpdate,
	uploadNewImageOnCloud,
} from '../../actions/user.profile.action';
import { Link } from 'react-router-dom';
import Footer from '../common/footer';

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
var useStyles = theme => ({
	textFild: {
		'& > *': {
			margin: theme.spacing(1),
			width: 282,
		},
	},
	root: {
		flexGrow: 2,
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
	paper: {
		padding: theme.spacing(10),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	input: {
		display: 'none',
	},
	datePicker: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 280,
	},
	colorPrimary: {
		backgroundColor: '#0094ff',
	},
	error: {
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
});
export class Profile extends Component {
	state = {
		buttonState: true,
		errorMessage: '',
		attribute: 0,
		firstName: false,
		lastName: false,
	};

	// changing user store handlers
	handleChange = e => {
		if (this.state.firstName || this.state.lastName) {
			this.props.changeAttribute({ [e.target.id]: e.target.value });
		} else {
			this.props.changeAttribute({ [e.target.id]: e.target.value });
			this.setState({ buttonState: false });
		}
	};
	autoCompliteHandleChange = (e, value, type) => {
		if (this.state.firstName || this.state.lastName) {
			this.props.changeAttribute({ [type]: value.label });
		} else {
			this.props.changeAttribute({ [type]: value.label });
			this.setState({ buttonState: false });
		}
	};

	switchHandleChange = name => event => {
		this.props.changeAttribute({ [name]: event.target.checked });
		this.setState({ buttonState: false });
	}; //------ end -------

	//uploading profile picture on cloude
	uploadUserImage = async e => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'barefootnomad');

		this.props.uploadNewImageOnCloud(data);
		this.setState({ buttonState: false });
	};

	// getting a loget in user information
	UNSAFE_componentWillMount() {
		this.props.GetUserProfile();
	}

	render() {
		const { classes, userProfileInfo, UpdateduserProfileInfo } = this.props;
		return (
			<>
				{userProfileInfo && (
					<Card>
						<ThemeProvider theme={theme}>
							<CardContent>
								<Grid xs={12} container item>
									<Grid xs={12} md={4} item container justify='center'>
										<Grid item xs={11} mb={2}>
											<Grid item xs={12} sm={12} sl={12}>
												{UpdateduserProfileInfo.updateStatus && (
													<Alert
														style={{ width: '100%', heigth: '20px' }}
														icon={<CheckIcon fontSize='inherit' />}
														severity='success'
													>
														Profile has successfully updated
													</Alert>
												)}
												{UpdateduserProfileInfo.errorMessage && (
													<Alert
														severity='error'
														style={{
															width: '100%',
															heigth: '20px',
														}}
													>
														Fail to upload image please try again
													</Alert>
												)}
											</Grid>
											<Box style={{ textAlign: 'center' }}>
												<Typography
													variant='h5'
													mb={2}
													style={{ color: '#0094ff', textAlign: 'left' }}
												></Typography>
												<Box>
													<img
														style={{
															width: '120px',
															height: '120px',
															borderRadius: '50%',
															objectFit: 'cover',
														}}
														src={userProfileInfo.profileImage}
														alt=''
													/>
												</Box>

												<Box height={30}>
													<UploadImage uploadImage={this.uploadUserImage} />
												</Box>
												<Box marginTop={4} marginBottom={2}>
													<Typography
														variant='h5'
														gutterBottom
														style={{ color: 'gray' }}
													>
														Setting
													</Typography>
												</Box>
												<Grid container>
													<Grid alignContent='center' container item xs={6}>
														<Typography
															style={{ color: 'gray', lineHeight: '38px' }}
														>
															In-App notification
														</Typography>
													</Grid>
													<Grid item xs={6}>
														<FormControlLabel
															control={
																<Switch
																	data-test='switch-btn'
																	checked={userProfileInfo.appNotification}
																	onChange={this.switchHandleChange(
																		'appNotification',
																	)}
																	value='appNotification'
																	color='primary'
																	id='appNotification'
																/>
															}
														/>
													</Grid>
												</Grid>
												<Grid container>
													<Grid alignContent='center' container item xs={6}>
														<Typography
															style={{ color: 'gray', lineHeight: '38px' }}
														>
															E-mail notification
														</Typography>
													</Grid>
													<Grid item xs={6}>
														<FormControlLabel
															control={
																<Switch
																	checked={userProfileInfo.emailNotification}
																	value='emailNotification'
																	color='primary'
																	onChange={this.switchHandleChange(
																		'emailNotification',
																	)}
																/>
															}
														/>
													</Grid>
												</Grid>
											</Box>
										</Grid>
									</Grid>
									<Grid xs={12} md={8} item container justify='center'>
										<Grid spacing={3} xs={12} item container>
											<Grid xs={12} md={6} item>
												<Box pt={1}>
													<TextField
														fullWidth
														id='firstName'
														label='First name'
														variant='outlined'
														width={this.props.textFieldWidth}
														value={userProfileInfo.firstName}
														onChange={e => {
															this.handleChange(e);
															if (e.target.value === '') {
																this.setState({
																	firstName: true,
																	buttonState: true,
																});
															} else {
																this.setState({
																	firstName: false,
																});
															}
														}}
														helperText={
															this.state.firstName &&
															'First name can not be empty.'
														}
														error={this.state.firstName}
													/>
												</Box>
											</Grid>
											<Grid xs={12} md={6} item>
												<Box pt={1} mb={2}>
													<TextField
														fullWidth
														id='lastName'
														label='Last name'
														variant='outlined'
														width={this.props.textFieldWidth}
														value={userProfileInfo.lastName}
														onChange={e => {
															this.handleChange(e);
															if (e.target.value === '') {
																this.setState({
																	lastName: true,
																	buttonState: true,
																});
															} else {
																this.setState({
																	lastName: false,
																});
															}
														}}
														helperText={
															this.state.lastName &&
															'Last name can not be empty.'
														}
														error={this.state.lastName}
													/>
												</Box>
											</Grid>
										</Grid>
										<Grid xs={12} spacing={3} item container>
											<Grid xs={12} md={6} item>
												<Box pt={1}>
													<GenderSelect
														handleChange={this.autoCompliteHandleChange}
														value={userProfileInfo.gender}
														width={this.props.textFieldWidth}
													/>
												</Box>
											</Grid>
											<Grid xs={12} md={6} item>
												<Box pt={1} mb={2}>
													<CountrySelect
														id='country'
														handleChange={this.autoCompliteHandleChange}
														value={userProfileInfo.country}
														width={this.props.textFieldWidth}
													/>
												</Box>
											</Grid>
										</Grid>
										<Grid xs={12} spacing={3} item container>
											<Grid xs={12} md={6} item>
												<Box pt={1}>
													<LanguageSelect
														handleChange={this.autoCompliteHandleChange}
														value={userProfileInfo.preferredlanguage}
														width={this.props.textFieldWidth}
													/>
												</Box>
											</Grid>
											<Grid xs={12} md={6} item>
												<Box pt={1} mb={2}>
													<TextField
														fullWidth
														id='department'
														label='Department'
														variant='outlined'
														width={this.props.textFieldWidth}
														value={userProfileInfo.department}
														onChange={e => this.handleChange(e)}
													/>
												</Box>
											</Grid>
										</Grid>
										<Grid xs={12} spacing={3} item container>
											<Grid xs={12} md={6} item>
												<Box pt={1}>
													<TextField
														fullWidth
														id='preferredcurrency'
														label='Preferred Currency'
														variant='outlined'
														width={this.props.textFieldWidth}
														value={userProfileInfo.preferredcurrency}
														onChange={e => this.handleChange(e)}
													/>
												</Box>
											</Grid>
											<Grid xs={12} md={6} item>
												<Box pt={1}>
													<TextField
														fullWidth
														id='place'
														label='Address'
														variant='outlined'
														width={this.props.textFieldWidth}
														value={userProfileInfo.place}
														onChange={e => this.handleChange(e)}
													/>
												</Box>
											</Grid>
										</Grid>
										<Grid xs={12} spacing={3} item container>
											<Grid xs={12} md={6} item>
												<Box pt={1}>
													<TextField
														style={{ width: '96%' }}
														id='birthdate'
														label='Birthday'
														type='date'
														value={userProfileInfo.birthdate}
														className={classes.datePicker}
														InputLabelProps={{
															shrink: true,
														}}
														width={this.props.textFieldWidth}
														onChange={e => this.handleChange(e)}
													/>
												</Box>
											</Grid>
											<Grid xs={12} md={6} item></Grid>
										</Grid>
										<Grid xs={12} spacing={3} item container>
											<Grid xs={12} md={6} item></Grid>
											<Grid xs={12} md={6} item container>
												<Grid
													item
													style={{ marginLeft: '19%', marginRight: '2%' }}
												>
													<Button
														id='cancel'
														variant='contained'
														color='secondary'
														disabled={this.state.buttonState}
														style={{
															borderRadius: 0,
															width: '100%',
														}}
														onClick={() => {
															this.setState({ buttonState: true });
															this.props.cancelUserUpdate();
														}}
													>
														Cancel
													</Button>
												</Grid>
												<Grid item style={{ float: 'right' }}>
													<Button
														id='update'
														variant='contained'
														color='primary'
														style={{
															borderRadius: 0,
															width: '100%',
														}}
														disabled={this.state.buttonState}
														onClick={() => {
															this.setState({ buttonState: true });
															this.props.updateUserProfile(userProfileInfo);
														}}
													>
														Update
													</Button>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</CardContent>
						</ThemeProvider>
					</Card>
				)}

				<Footer />
			</>
		);
	}
}

export const mapStateToProps = state => {
	return {
		userProfileInfo: state.userProfileReducer.userProfileInfo,
		UpdateduserProfileInfo: state.userProfileReducer.UpdateduserProfileInfo,
	};
};

const connected = connect(mapStateToProps, {
	GetUserProfile,
	changeAttribute,
	updateUserProfile,
	cancelUserUpdate,
	uploadNewImageOnCloud,
})(withStyles(useStyles)(Profile));
export default connected;
