import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import { Divider, Typography, Collapse, List } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import verifyToken from '../../helpers/tokenHelper';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import HotelIcon from '@material-ui/icons/Hotel';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { titleGenerator } from '../../helpers/titleGenerator.js';
import { setTitle } from '../../actions/main.layout.action';
import { connect } from 'react-redux';

const useStyles = theme => ({
	isActive: {
		backgroundColor: '#F1F1F1',
		color: '#2196F3',
	},
});

export class NavLinks extends Component {
	state = {
		bgcolor: '#f1f1f1',
		role: '',
		location: '/',
		open: false,
	};

	UNSAFE_componentWillMount() {
		this.props.setTitle(titleGenerator());
		const token = localStorage.getItem('token');

		const user = verifyToken(token);
		this.setState({
			role: user.payload.role,
		});
	}

	isActive = path => {
		return path == this.state.location;
	};

	render() {
		const { classes } = this.props;

		return (
			<Grid
				container
				style={{ width: '100%', backgroundColor: 'white', marginTop: '15px' }}
			>
				<Divider />
				<ListItem
					id='dashboard'
					selected={this.isActive('/')}
					button
					onClick={() => {
						this.props.setTitle(titleGenerator());
						this.setState({ location: '/' });
					}}
				>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText>
						<Link to='/' style={{ textDecoration: 'none' }}>
							<Typography style={{ fontSize: this.state.fontSize }}>
								Dashboard
							</Typography>
						</Link>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem
					id='trips'
					button
					onClick={() => {
						this.props.setTitle(titleGenerator());
						this.setState({ location: '/trips' });
						this.state.open
							? this.setState({ open: false })
							: this.setState({ open: true });
					}}
					selected={this.isActive('/trips')}
				>
					<ListItemIcon>
						<DirectionsWalkIcon />
					</ListItemIcon>
					<ListItemText>
						<Link to='/trips' style={{ textDecoration: 'none' }}>
							<Typography>Trips</Typography>
						</Link>
					</ListItemText>
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				{this.state.open ? (
					<Collapse in={this.state.open} timeout='auto'>
						<List component='div' disablePadding>
							<ListItem
								id='make-trip-request'
								button
								onClick={() => {
									this.props.setTitle(titleGenerator());
									this.setState({ location: '/make-trip-request' });
								}}
								selected={this.isActive('/make-trip-request')}
								style={{ paddingLeft: 80, paddingRight: 80 }}
								key={1}
							>
								<ListItemText>
									<Link
										to='/make-trip-request'
										style={{ textDecoration: 'none' }}
									>
										<Typography>Create Trip</Typography>
									</Link>
								</ListItemText>
							</ListItem>
						</List>
					</Collapse>
				) : null}

				<Divider />
				<ListItem
					id='profile'
					selected={this.isActive('/profile')}
					button
					onClick={() => {
						this.props.setTitle(titleGenerator());
						this.setState({ location: '/profile' });
					}}
				>
					<ListItemIcon>
						<PersonIcon />
					</ListItemIcon>
					<ListItemText>
						<Link to='/profile' style={{ textDecoration: 'none' }}>
							<Typography style={{ fontSize: this.state.fontSize }}>
								Profile
							</Typography>
						</Link>
					</ListItemText>
				</ListItem>
				<Divider />
				{this.state.role === 'admin' ? (
					<>
						<ListItem
							button
							className={
								window.location.pathname === '/user/user-role-setting'
									? classes.isActive
									: 'null'
							}
							id='userRole'
							selected={this.isActive('/user/user-role-setting')}
							button
							onClick={() => {
								this.props.setTitle(titleGenerator());
								this.setState({ location: '/user/user-role-setting' });
							}}
						>
							<ListItemIcon>
								<SupervisorAccountIcon />
							</ListItemIcon>

							<ListItemText>
								<Link
									to='/user/user-role-setting'
									style={{ textDecoration: 'none' }}
								>
									<Typography>Role</Typography>
								</Link>
							</ListItemText>
						</ListItem>

						<ListItem
							button
							id='userManagement'
							selected={this.isActive('/user-management')}
							button
							onClick={() => {
								this.props.setTitle(titleGenerator());
								this.setState({ location: '/user-management' });
							}}
						>
							<ListItemIcon>
								<SupervisorAccountIcon />
							</ListItemIcon>
							<ListItemText>
								<Link to='/user-management' style={{ textDecoration: 'none' }}>
									<Typography>Managers</Typography>
								</Link>
							</ListItemText>
						</ListItem>
					</>
				) : (
					''
				)}
				{this.state.role === 'manager' ? (
					<ListItem
						id='approval_table'
						selected={this.isActive('/approval-table')}
						button
						onClick={() => {
							this.props.setTitle(titleGenerator());
							this.setState({ location: '/approval-table' });
						}}
					>
						<ListItemIcon>
							<DoneAllOutlinedIcon />
						</ListItemIcon>
						<ListItemText>
							<Link to='/approval-table' style={{ textDecoration: 'none' }}>
								<Typography style={{ fontSize: '1em' }}>Approvals</Typography>
							</Link>
						</ListItemText>
					</ListItem>
				) : (
					''
				)}

				<Divider />
				<ListItem
					id='trips-stats'
					button
					onClick={() => {
						this.props.setTitle(titleGenerator());
						this.setState({ location: '/trips-stats' });
					}}
					selected={this.isActive('/trips-stats')}
				>
					<ListItemIcon>
						<EqualizerIcon />
					</ListItemIcon>
					<ListItemText>
						<Link to='/trips-stats' style={{ textDecoration: 'none' }}>
							<Typography>Statistics</Typography>
						</Link>
					</ListItemText>
				</ListItem>
				{this.state.role === 'admin' || this.state.role === 'travel admin' ? (
					<ListItem
						button
						id='accommodations'
						selected={this.isActive('/create-accommodations')}
						button
						onClick={() => {
							this.props.setTitle(titleGenerator());
							this.setState({ location: '/create-accommodations' });
						}}
					>
						<ListItemIcon>
							<HotelIcon />
						</ListItemIcon>

						<ListItemText>
							<Link
								to='/create-accommodations'
								style={{ textDecoration: 'none' }}
							>
								<Typography >
									Accommodations
								</Typography>
							</Link>
						</ListItemText>
					</ListItem>
				) : (
					''
				)}
			</Grid>
		);
	}
}
export const mapStateToProps = state => {
	return {};
};
export default connect(mapStateToProps, {
	setTitle,
})(withStyles(useStyles)(withRouter(NavLinks)));
