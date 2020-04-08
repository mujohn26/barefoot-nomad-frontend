import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Styles } from '../../styles/createAccommodation';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Hidden from '@material-ui/core/Hidden';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

export class ServiceCard extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Snackbar
					open={this.props.open}
					autoHideDuration={2000}
					onClose={this.props.handleCloseAlert}
					className={classes.servicesSnackbar}
				>
					<Alert severity='success'>{this.props.SnackbarMessage}</Alert>
				</Snackbar>
				<Card className={classes.SubmitCard}>
					<Typography
						style={{
							fontSize: 15,
							color: '#616161',
							textAlign: 'center',
							fontWeight: 'bold',
						}}
					>
						Additional information
					</Typography>
					 <Box m={4} />
					<Hidden mdDown>
					<Grid
						container
						direction='row'
						justify='flex-start'
						alignItems='center'
					>
				
											{/* <Hidden lgUp>
						 <Box m={2} />
				        </Hidden> */}
						<Grid item xs={1}></Grid>
						<Grid item xs={5}>
							<form className={classes.AmenitiesForm}>
								<TextField
									size='small'
									name='serviceName'
									type='name'
									ref='serviceName'
									className={classes.inputFieldAmenities}
									label='Provide Accommodation Service'
									onFocus={this.props.handleFocus}
									data-test='signup-address-field'
									variant='outlined'
									onChange={this.props.handleChangeServices}
								/>{' '}
								<Button
									variant='contained'
									color='primary'
									className={classes.AmenitiesButton}
									onClick={this.props.addServices}
									disabled={this.props.disabled}
								>
									Add
								</Button>
								<Box m={1} />
							<div className={classes.Chip}>
								{this.props.services.map((data, index) => {
									
									return (
										<>
											<Chip
											   data-test="service-chip"
												style={{ marginTop: '2px', marginLeft: '2px' }}
												key={data.serviceName}
												label={data.serviceName}
												onDelete={() =>
													this.props.handleDeleteServiceChipCard(
														data.serviceName,
													)
												}
												className={classes.chipData}
											/>
										</>
									);
								})}
							</div>
							</form>
						</Grid>

						<Grid item xs={5}>
							<form className={classes.AmenitiesForm}>
								<TextField
									size='small'
									name='amenityName'
									type='name'
									id='standard-size-normal'
									className={classes.inputFieldAmenities}
									label='Provide Accommodation Amenity'
									onFocus={this.props.handleFocus}
									data-test='signup-address-field'
									variant='outlined'
									onChange={this.props.handleChangeAmenities}
								/>{' '}
								<Button
									variant='contained'
									color='primary'
									className={classes.AmenitiesButton}
									onClick={this.props.addAmenities}
									disabled={this.props.AmenitiesDisabled}
								>
									Add
								</Button>
								<Box m={1} />
							</form>

							<div className={classes.Chip}>
								{this.props.amenities.map((data, index) => {
									return (
										<>
											<Chip
											data-test="amenity-chip"
												style={{ marginTop: '2px', marginLeft: '2px' }}
												key={data.amenityName}
												label={data.amenityName}
												onDelete={() =>
													this.props.handleDeleteAmenityChipCard(
														data.amenityName,
													)
												}
												className={classes.chipData}
											/>
										</>
									);
								})}
							</div>
						</Grid>
					</Grid>
					</Hidden> 
					<Hidden lgUp>
					<Grid
						container
						direction='column'
						justify='flex-start'
					>
						<Grid item >
							<form className={classes.AmenitiesForm}>
								<TextField
									size='small'
									name='serviceName'
									type='name'
									ref='serviceName'
									className={classes.inputFieldAmenities}
									label='Provide Accommodation Service'
									onFocus={this.props.handleFocus}
									data-test='signup-address-field'
									variant='outlined'
									onChange={this.props.handleChangeServices}
								/>{' '}
								<Button
									variant='contained'
									color='primary'
									className={classes.AmenitiesButton}
									onClick={this.props.addServices}
									disabled={this.props.disabled}
								>
									Add
								</Button>
								<Box m={1} />
							</form>
							<div className={classes.Chip}>
								{this.props.services.map((data, index) => {
									return (
										<>
											<Chip
										data-test="service-chip-small"
												style={{ marginTop: '2px', marginLeft: '2px' }}
												key={data.serviceName}
												label={data.serviceName}
												onDelete={() =>
													this.props.handleDeleteServiceChipCard(
														data.serviceName,
													)
												}
												className={classes.chipData}
											/>
										</>
									);
								})}
							</div>
						</Grid>

						<Grid item >
							<form className={classes.AmenitiesForm}>
								<TextField
									size='small'
									name='amenityName'
									type='name'
									id='standard-size-normal'
									className={classes.inputFieldAmenities}
									label='Provide Accommodation Amenity'
									onFocus={this.props.handleFocus}
									data-test='signup-address-field'
									variant='outlined'
									onChange={this.props.handleChangeAmenities}
								/>{' '}
								<Button
									variant='contained'
									color='primary'
									className={classes.AmenitiesButton}
									onClick={this.props.addAmenities}
									disabled={this.props.AmenitiesDisabled}
								>
									Add
								</Button>
								<Box m={1} />
							</form>

							<div className={classes.Chip}>
								{this.props.amenities.map((data, index) => {
									return (
										<>
											<Chip
											data-test="amenity-chip-small"
												style={{ marginTop: '2px', marginLeft: '2px' }}
												key={data.amenityName}
												label={data.amenityName}
												onDelete={() =>
													this.props.handleDeleteAmenityChipCard(
														data.amenityName,
													)
												}
												className={classes.chipData}
											/>
										</>
									);
								})}
							</div>
						</Grid>
						</Grid>
					</Hidden> 
				</Card>
			</div>
		);
	}
}
export default withStyles(Styles)(ServiceCard);
