import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import NotificationPane from '../notification/notificationPane.jsx';
import { connect } from 'react-redux';
import { GetNotifications } from '../../actions/notificationPane';

const style = {
	borderRadius: '50%',
	height: '20px',
	width: '20px',
	backgroundColor: '#0094FF',
	display: 'grid',
	justifyItems: 'center',
	fontSize: '12px',
	alignItems: 'center',
	color: '#FFF',
	float: 'right',
};

export class TopNavBar extends Component {
	state = {
		notificationCounter: 0,
		notification: '',
	};

	count = notifications => {
		let count = 0;
		notifications.map((notification, index) => {
			if (!notification.read) {
				count += 1;
			}
		});

		if (count === 0) {
			return false;
		} else if (count > 9) {
			return '9+';
		} else {
			return count;
		}
	};

	render() {
		const { notifications } = this.props;
		return (
			<>
				{notifications && (
					<Box width={30 / 100} display='flex' justifyContent='flex-end'>
						<Box pr={1} style={{ marginTop: '10px' }}>
							<img
								src='https://res.cloudinary.com/dby88h516/image/upload/v1580893608/email_1_jupvlq.svg'
								width='100%'
								height='24px'
							/>
						</Box>
						<Box pl={1} style={{ marginTop: '10px' }}>
							<PopupState
								style={{ width: '50%' }}
								variant='popover'
								popupId='demo-popup-popover'
							>
								{popupState => (
									<div>
										<Box
											className='notificationsIcon'
											{...bindTrigger(popupState)}
											style={{
												width: '35px',
												height: '25px',
												cursor: 'pointer',
											}}
										>
											{this.count(this.props.notifications) && (
												<div style={style}>
													{this.count(this.props.notifications)}
												</div>
											)}
										</Box>

										<NotificationPane
											bindPopover={bindPopover(popupState)}
											options={this.props.notifications}
										/>
									</div>
								)}
							</PopupState>
						</Box>
					</Box>
				)}
			</>
		);
	}
}

export const mapStateToProps = state => {
	const data = state.NotificationReducer.Notifications;

	return {
		notifications: data,
	};
};

const connected = connect(mapStateToProps, { GetNotifications })(TopNavBar);
export default connected;
