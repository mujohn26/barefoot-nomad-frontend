import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import { Grid } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SideNavBarPage from '../views/SideNavBar';
import TopNavBar from '../components/profile/top.nav.bar.jsx';
import Profile from '../components/profile/Profile.jsx';
import Requests from '../views/trip_requests/userTripRequests.view.jsx';
import Request from '../views/trip_requests/userTripRequest.view.jsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserRoleSetting from '../components/user/userRole.jsx';
import UserManagement from '../components/usermanagements/UserManagement.jsx';
import TripRequest from '../views/triprequest.view.jsx';
import ApprovalTable from '../components/approvals_table/approval.table.jsx';
import ApprovalsTripRequest from '../components/approvals_table/trip.request.jsx';
import UserStatistics from '../components/UserStatistics.jsx';
import AccommodationFacility from '../views/creating_accommodation_facilities/AccommodationFacility.jsx';
import CreateAccommodation from '../views/creating_accommodation_facilities/CreateAccommodation.jsx';
import Footer from '../components/common/footer';
import Dashboard from '../views/dashboard/userDashboard.view.jsx';
import Booking from '../views/accommodations/booking.view.jsx';
import NotFound from '../views/404.view.jsx';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(1),
	},
}));

const MainLayout = props => {
	const matches = useMediaQuery('(max-width: 767px)');
	const titleFontSize = matches ? '1.5em' : '2em';
	const appBarCss = matches ? '1px 1px gray' : '0px 0px white';
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const drawer = (
		<div>
			<SideNavBarPage />
		</div>
	);
	return (
		<Router>
			<div className={classes.root}>
				<AppBar
					position='fixed'
					style={{ backgroundColor: 'white', boxShadow: `${appBarCss}` }}
					className={classes.appBar}
				>
					<Toolbar>
						<IconButton
							id='IconButton'
							color='primary'
							aria-label='open drawer'
							edge='start'
							onClick={() => {
								setMobileOpen(!mobileOpen);
							}}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Grid
							container
							justifyItems='right'
							style={{
								marginTop: '2px',
								width: '70%',
								color: '#0094fe',
								textAlign: 'right',
								fontWeight: 'bold',
							}}
						>
							<Grid
								xs={11}
								xl={7}
								md={7}
								style={{
									textAlign: 'left',
									fontSize: titleFontSize,
									fontWeight: 'bold',
									width: '60%',
								}}
							>
								{props.title}
							</Grid>
						</Grid>
						<TopNavBar />
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label='mailbox folders'>
					<Hidden smUp implementation='css'>
						<Drawer
							id='Drawer'
							container={container}
							variant='temporary'
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={mobileOpen}
							onClose={() => {
								setMobileOpen(!mobileOpen);
							}}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true,
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation='css'>
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant='permanent'
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content} style={{ paddingTop: '50px' }}>
					<div className={classes.toolbar} />

					<Switch>
						<Route path='/' exact component={Dashboard} />
						<Route path='/profile' exact component={Profile} />
						<Route path='/trips/:id' component={Request} />
						<Route path='/trips' component={Requests} />
						<Route path='/trips-stats' component={UserStatistics} />
						<Route path='/user/user-role-setting' component={UserRoleSetting} />
						<Route path='/user-management' component={UserManagement} />
						<Route path='/make-trip-request' exact component={TripRequest} />
						<Route path='/approval-table' component={ApprovalTable} />
						<Route path='/trip-request' component={ApprovalsTripRequest} />
						<Route path='/accommodations' component={AccommodationFacility} />
						<Route
							path='/create-accommodations'
							component={CreateAccommodation}
						/>
						<Route path='/booking/:id' component={Booking} />
						<Route component={NotFound} />
					</Switch>
				</main>
			</div>
		</Router>
	);
};
export const mapStateToProps = state => {
	return {
		title: state.mainLauyoutReducer.title,
	};
};

export default connect(mapStateToProps)(MainLayout);
