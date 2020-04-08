import React, { Component } from 'react';
import { Grid, Box, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import { connect } from 'react-redux';
import {
	GetNotifications,
	markNotificationAsRead,
	closeErrorMessageAlert,
} from '../../actions/notificationPane';
import { createBrowserHistory } from 'history';
import moment from 'moment';

export const history = createBrowserHistory({
	forceRefresh: true,
});

const useStyles = {
	Snackbar: {
		margin: '48% 40%',
		width: '900px',
		['@media (max-width:780px)']: {
			margin: '150% -20%',
			width: '600px',
		},
	},
};
export class NotificatonPane extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openModal: false,
			limitNumber: 10,
			notificationPaneHeight: 500,
			viewButton: true,
			buttonTitle: 'more',
			open: false,
		};
	}

	notificationPaneHeigthHandle = (height, viewButton) => {
		let notificationPaneHeight = 0;
		let limit = 0;
		let title = '';
		if (height > 10 && viewButton) {
			notificationPaneHeight = 650;
			limit = height;
			title = 'less';
		} else {
			notificationPaneHeight = 500;
			limit = 10;
			title = 'more';
		}

		this.setState({
			notificationPaneHeight: notificationPaneHeight,
			viewButton: !viewButton,
			limitNumber: limit,
			buttonTitle: title,
		});
	};

	UNSAFE_componentWillMount() {
		this.props.GetNotifications();
	}
	handleCloseAlert = () => {
		this.props.closeErrorMessageAlert();
	};
	render() {
		const {
			markNotificationAsRead,
			NotificationError,
			classes,
			markNotificationAsReadErrorMessage,
		} = this.props;

		return (
			<Popover
				style={{ marginTop: '20px' }}
				{...this.props.bindPopover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Grid heigth={100} container style={{ padding: '10px' }}>
					<div
						style={{
							width: '100%',
							paddingBottom: '5px',
							borderBottom: 'solid 0.3px gray',
						}}
					>
						<Snackbar
							id='Snackbar'
							open={this.props.modal}
							autoHideDuration={2000}
							className={classes.Snackbar}
							onClose={this.handleCloseAlert.bind(this)}
						>
							<Alert severity='error'>
								Request has failed please try again
							</Alert>
						</Snackbar>

						<Grid container xl={12}>
							<Grid
								item
								xs={6}
								md={6}
								xl={6}
								style={{
									fontWeight: 'bold',
									color: '#616161',
									textSize: '2em',
								}}
							>
								Notifications
							</Grid>
							<Grid
								id='mark_all_as_read'
								onClick={() => {
									if (this.props.options.length > 0) markNotificationAsRead();
								}}
								item
								xs={6}
								md={5}
								xl={5}
								style={{
									textAlign: 'right',
									fontWeight: 'bold',
									color: '#0094FF',
									cursor: 'pointer',
								}}
							>
								Mark all as read
							</Grid>
						</Grid>
					</div>
					<Divider />
					<div
						style={{
							height: `${this.state.notificationPaneHeight}px`,
							overflow: 'scroll',
							width: '100%',
						}}
					>
						<Divider />
						{Array.isArray(this.props.options) &&
							this.props.options.map((option, index) => {
								if (index < this.state.limitNumber) {
									const color = option.read ? 'gray' : '#0094FF';
									return (
										<Grid
											className='notification'
											{...this.props.bindPopover}
											item
											key={index}
											style={{
												marginTop: '5px',
												marginBottom: '5px',
											}}
										>
											<Grid
												className='notification'
												container
												style={{ marginBottom: '5px', cursor: 'pointer' }}
											>
												<Grid
													id='trip_requests'
													className='notification'
													onClick={() =>
														history.push(`trip-requests/${option.requestId}`)
													}
													item
													xs={8}
													md={8}
													xl={8}
													style={{ color: color, fontWeight: 'bold' }}
												>
													{option.title}
												</Grid>
												<Grid
													id='mark_as_read'
													className='notification'
													onClick={() => markNotificationAsRead(option.id)}
													item
													xs={4}
													md={4}
													xl={4}
													style={{
														color: color,
														textAlign: 'center',
														cursor: 'pointer',
													}}
												>
													Mark as read
												</Grid>
											</Grid>
											<Grid
												className='notification'
												style={{ color: '#616161' }}
											>
												{option.message}
											</Grid>
											<Grid
												className='notification'
												item
												style={{
													marginBottom: '5px',
													marginTop: '5px',
													color: '#616161',
													fontSize: '10px',
												}}
											>
												{moment(option.createdAt).fromNow()}
											</Grid>
											<Divider style={{ marginBottom: '5px' }} />
										</Grid>
									);
								}
							})}
						{!markNotificationAsReadErrorMessage && (
							<div
								style={{
									color: 'gray',
									textAlign: 'center',
									textSize: '2em',
									marginTop: '20px',
								}}
							>
								{NotificationError}
							</div>
						)}
					</div>
					<Grid
						id='notificationPaneHeigthHandle'
						className='notification'
						onClick={() => {
							this.notificationPaneHeigthHandle(
								this.props.options.length,
								this.state.viewButton,
							);
						}}
						item
						xs={12}
						md={12}
						xl={12}
						style={{
							textAlign: 'center',
							fontWeight: 'bold',
							color: '#0094FF',
							marginTop: '5px',
							cursor: 'pointer',
							borderTop: 'solid 0.3px gray',
							paddingTop: '5px',
						}}
					>
						{this.state.buttonTitle}
					</Grid>
				</Grid>
			</Popover>
		);
	}
}

export const mapStateToProps = state => {
	return {
		notifications: state.NotificationReducer.Notifications,
		NotificationError: state.NotificationReducer.NotificationError,
		markNotificationAsReadErrorMessage:
			state.NotificationReducer.markNotificationAsReadErrorMessage,
		modal: state.NotificationReducer.open,
	};
};

const connected = connect(mapStateToProps, {
	GetNotifications,
	markNotificationAsRead,
	closeErrorMessageAlert,
})(withStyles(useStyles)(NotificatonPane));
export default connected;
