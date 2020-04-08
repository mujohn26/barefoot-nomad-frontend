import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import verifyToken from '../../helpers/tokenHelper';
import {getMostTraveledDestinations,getDestinations} from '../../actions/dashboardAction';
import Chip from '@material-ui/core/Chip';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import UserStatistics from '../../components/UserStatistics.jsx';
import {Styles }from '../../styles/userDashboard';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
export class Dashboard extends Component{

	constructor(props) {
		super(props);
		this.state = {
		lastName:''
		};
	}

    UNSAFE_componentWillMount() {

        const token = localStorage.getItem('token');
		const user = verifyToken(token);
  this.setState({
    lastName:user.payload.lastName
})
this.props.getMostTraveledDestinations()
	}
    render(){

		const Locations = [];
		const { locations,classes } = this.props;
		let x;
		for (x in locations) {
			Locations.push(locations[x]);
        }
    const tempDate = new Date();
  const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
  
   
        return(
<Grid 
  container   
  direction="column"
  justify="flex-start"
  alignItems="flex-start">
  <Typography className={classes.TypographyTitle} >Welcome {this.state.lastName} !</Typography><Box m={4} />
<Grid item xs={12}>
<Typography className={classes.Typography}>Here is so far the most traveled destinations, you might be interested visiting one of them.</Typography><Box m={3} />

{!this.props.isLoading?(Locations.map(data => {
       
        return (
        <div className={classes.chipContainer} key={data.city}>
          <Chip
            key={data.city}
            icon={<LocationOnIcon/>}
            label={data.city}
            color='primary'
          />
          <Typography>{data.travelledTimes} Trips</Typography>
    </div>
        );
      })):(
        <CircularProgress className={classes.CircularProgress}/>
      )}
</Grid>
<Box m={3} />
<Grid item >
<Typography className={classes.Typography}>Here is so far the total number trip requests you have made in each trip type.</Typography>

<UserStatistics displayDatePicker={true} currentDate={currentDate} />
</Grid>
</Grid>



        )
    }
}
export const mapStateToProps = state => {
	return {
    locations: state.userDashboardReducer.locations,
    isLoading:state.userDashboardReducer.isLoading
	
	};
};
const connectedUserDashboardPage =connect(
    mapStateToProps, {getMostTraveledDestinations,getDestinations})(withStyles(Styles)(Dashboard));

export default connectedUserDashboardPage;
