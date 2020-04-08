import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import {
	getLocations,
	getlocationsSuccess,
	uploadNewImageOnCloud,
	getAccommodationType,
	getaccommodationTypesSuccess,
	uploadNewRoomImageOnCloud,
	createAccomodationFacility,
	createAccommodationSuccess,
	cardClicked,
	handleDeleteAccommodation,
} from '../../actions/accommodationFacilitiesActions';
import { Styles } from '../../styles/createAccommodation';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import verifyToken from '../../helpers/tokenHelper';
import { createBrowserHistory } from 'history';
import UploadImage from '../../components/Accommodations/UploadImage.jsx';
import ServiceCard from '../../components/Accommodations/servicesCard.jsx';
import RoomCard from '../../components/Accommodations/RoomCard.jsx';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import ItemsCarousel from 'react-items-carousel';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@material-ui/core/MobileStepper';
export const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
import Footer from '../../components/common/footer';
import { log } from 'util';
export const history = createBrowserHistory({
	forceRefresh: true,
});

export class AccommodationFacility extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accommodationName: '',
			description: '',
			locationId: '',
			owner: '',
			category: '',
			images: this.props.images,
			amenities: [],
			services: [],
			serviceName: '',
			amenityName: '',
			disabled: true,
			AmenitiesDisabled: true,
			SaveDisabled: true,
			SnackbarMessage: '',
			files: [],
			RoomFiles: [],
			open: false,
			roomChildCard: 2,
			roomImagesState: [],
			roomImages: [],
			rooms: [
				{
					numberOfRoom: '',
					typeId: '',
					price: '',
					currency: '',
					roomTypeImageUrl: '',
				},
				{
					numberOfRoom: '',
					typeId: '',
					price: '',
					currency: '',
					roomTypeImageUrl: '',
				},
				{
					numberOfRoom: '',
					typeId: '',
					price: '',
					currency: '',
					roomTypeImageUrl: '',
				},
			],
			activeItemIndex: 0,
			deleted: false,
			isRooChipDeleted: false,
		};
	}

	handleClick(event) {
		const {
			accommodationName,
			description,
			locationId,
			owner,
			category,
			images,
			rooms,
			amenities,
			services,
		} = this.state;
		const data = {
			accommodationName: accommodationName,
			description: description,
			locationId: locationId,
			owner: owner,
			category: category,
			images: this.props.images,
			rooms: rooms,
			services: services,
			amenities: amenities,
		};
		const { createAccomodationFacility } = this.props;
		createAccomodationFacility(data);
	}

	componentDidUpdate(prevProps) {
		if (this.props.data !== prevProps.data) {
			history.push('/accommodations');
		}
	}
	uploadAccommodationImage = async e => {
		this.state.files.push(...e.target.files);
		const files = [...e.target.files];
		files.map((file, index) => {
			const data = new FormData();
			data.append('file', files[index]);
			data.append('upload_preset', 'barefootnomad');

			this.props.uploadNewImageOnCloud(data, index);
		});
		this.setState({
			files: [],
		});
	};
	HandleUploadRoomImage = async (e, cardId) => {
		this.state.files.push(...e.target.files);
		const files = [...e.target.files];
		files.map((file, index) => {
			const data = new FormData();
			data.append('file', files[index]);
			data.append('upload_preset', 'barefootnomad');
			this.props.uploadNewRoomImageOnCloud(data, cardId);
		});
	};
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
			SaveDisabled: false,
		});

		if (
			this.state.accommodationName !== '' &&
			this.state.locationId !== '' &&
			this.state.owner !== ''
		) {
			this.setState({
				SaveDisabled: false,
			});
		}
	}
	handleChangeRooms = (event, value, Index1, name) => {
		const rooms = this.state.rooms;
		rooms.map((room, index) => {
			if (index === Index1) {
				if (event.target.id !== 'standard-search') {
					room[name] = value;
				}

				room[event.target.name] = event.target.value;
			}
		});
		this.setState({
			rooms: rooms,
		});
	};

	handleChangeServices(event) {
		this.setState({
			[event.target.name]: event.target.value,
			disabled: false,
		});
	}
	handleChangeAmenities(event) {
		this.setState({
			[event.target.name]: event.target.value,
			AmenitiesDisabled: false,
		});
	}
	handleFocus(event) {
		event.target.value = '';
	}
	addCard(event) {
		this.setState({ activeItemIndex: this.state.activeItemIndex + 1 });
		event;
		this.state.rooms.push({
			numberOfRoom: '',
			typeId: '',
			price: '',
			currency: '',
			roomTypeImageUrl: '',
		});
	}
	addServices(event) {
		this.setState({
			disabled: true,
			open: true,
			SnackbarMessage: 'Service added',
		});
		this.state.services.push({ serviceName: this.state.serviceName });
	}
	handleCloseAlert(event, reason) {
		this.setState({
			open: false,
		});
	}
	addAmenities(event) {
		this.setState({
			AmenitiesDisabled: true,
			open: true,
			SnackbarMessage: 'Amenity added',
		});

		this.state.amenities.push({ amenityName: this.state.amenityName });
	}
	UNSAFE_componentWillMount() {
		const token = localStorage.getItem('token');
		const user = verifyToken(token);
		if (user.payload.role !== 'admin') {
			history.push('/profile');
		}
		const { getLocations, getAccommodationType } = this.props;
		getLocations();
		getAccommodationType();
	}
	handleDeleteCard = index => {
		if (this.state.rooms.length > 2) {
			this.state.rooms.splice(this.state.rooms.indexOf(index), 1);
			this.setState({ activeItemIndex: this.state.activeItemIndex - 1 });
		}
	};
	handleDeleteAccommodation = key => {
		this.props.images.splice(key, 1);
		this.props.handleDeleteAccommodation(this.props.images);
		this.setState({
			deleted: true,
		});
	};
	handleDeleteServiceChipCard = IndexName => {
		this.state.services.splice(this.state.services.indexOf(IndexName), 1);
	};
	handleDeleteRoomChipCard = cardId => {
		this.props.RoomImagesResult.splice(cardId, 1);
		this.setState({
			isRooChipDeleted: true,
		});
	};
	handleDeleteAmenityChipCard = IndexName => {
		this.state.amenities.splice(this.state.amenities.indexOf(IndexName), 1);
	};
	handleNext = () => {
		this.setState({
			activeItemIndex: this.state.activeItemIndex + 1,
		});
	};
	handleBack = () => {
		this.setState({
			activeItemIndex: this.state.activeItemIndex - 1,
		});
	};
	render() {
		this.props.RoomImagesResult.map((room, index) => {
			this.state.roomImages.push({ index: room.cardId, imageUrl: room.Image });
		});
		let rows = [];
		let AcccommodationTypes = [];
		let accommodations = [];
		let Images = [];
		const { locations, accommodationTypes } = this.props;
		let x;
		let Locations = [];
		for (x in locations) {
			Locations.push(locations[x]);
		}
		for (x in accommodationTypes) {
			accommodations.push(accommodationTypes[x]);
		}
		Locations.map((location, index) => {
			rows.push({ id: location.id, city: location.city });
		});
		accommodations.map((accommodation, index) => {
			AcccommodationTypes.push({
				id: accommodation.id,
				name: accommodation.name,
			});
		});

		this.props.RoomImagesResult.map((image, index) => {
			this.state.roomImagesState.push({ key: index, imageUrl: image.image });
		});
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.paper} elevation={3}>
					<Box m={2} />
					<Grid container direction='column' alignItems='center'>
						<Box m={2} />
						<Hidden mdDown>
							<Grid container direction='row' alignItems='baseline'>
								<Grid item sm={5}>
									<Card className={classes.card}>
										<Typography
											style={{
												fontSize: 15,
												color: 'black',
												textAlign: 'center',
											}}
										>
											Accommodation information
										</Typography>
										<Box m={2} />
										<form className={classes.Form}>
											<TextField
												name='accommodationName'
												type='name'
												data-test='accommodation-name-field'
												className={classes.inputField}
												label='Provide Accommodation Name'
												data-test='signup-firstName-field'
												variant='outlined'
												onChange={this.handleChange.bind(this)}
												required
											/>
											<Box m={6} />
											<TextField
												name='description'
												type='name'
												id='standard-search'
												className={classes.inputField}
												label='Enter description'
												data-test='signup-lastName-field'
												variant='outlined'
												onChange={this.handleChange.bind(this)}
											/>
											<Box m={6} />
											<Autocomplete
												data-test='accommodation-location-field'
												id='combo-box-demo'
												options={rows}
												getOptionLabel={option => option.city}
												style={{ width: 300 }}
												onChange={(e, value) => {
													this.setState({
														locationId: value.id,
													});
												}}
												renderInput={params => (
													<TextField
														{...params}
														label='Provide Accommodation Locations'
														variant='outlined'
														required
													/>
												)}
											/>
											<Box m={4} />
											<Autocomplete
												data-test='accommodation-category-field'
												id='combo-box-demo'
												options={Categories}
												getOptionLabel={option => option.title}
												style={{ width: 300 }}
												onChange={(e, value) => {
													this.setState({
														category: value.title,
													});
												}}
												renderInput={params => (
													<TextField
														{...params}
														label='Provide Accommodation Category'
														variant='outlined'
													/>
												)}
											/>
											<Box m={4} />
											<TextField
												name='owner'
												type='name'
												id='standard-search'
												className={classes.inputField}
												label='owner'
												data-test='signup-address-field'
												variant='outlined'
												onChange={this.handleChange.bind(this)}
												required
											/>
										</form>
									</Card>
								</Grid>
								<Grid item sm={5}>
									<Card className={classes.card}>
										<Typography
											style={{
												fontSize: 15,
												color: 'black',
												textAlign: 'center',
											}}
										>
											Upload Images
										</Typography>
										<Box m={4} />
										<div className={classes.Typography}>
											<UploadImage
												uploadAccommodationImage={this.uploadAccommodationImage.bind(
													this,
												)}
												label='Provide Accomodation Image'
												data-test='upload-btn'
												isLoading={this.props.isLoading}
											/>
										</div>
										<Box m={4} />
										<div className={classes.Chip}>
											{this.props.images.map((data, index) => {
												return (
													<>
														<Chip
															data-test='accommodation-image-chip-large'
															style={{ marginTop: '2px', marginLeft: '2px' }}
															label={`image ${index + 1}`}
															onDelete={() => {
																this.handleDeleteAccommodation(data.key);
															}}
															className={classes.chipData}
														/>
													</>
												);
											})}
										</div>{' '}
									</Card>
								</Grid>
							</Grid>
						</Hidden>
						<Hidden lgUp>
							<Grid container direction='column' alignItems='baseline'>
								<Grid item xs={5}>
									<Card className={classes.card}>
										<Typography
											style={{
												fontSize: 15,
												color: 'black',
												textAlign: 'center',
											}}
											className={classes.title}
										>
											Accommodation information
										</Typography>
										<Box m={2} />
										<form className={classes.Form}>
											<TextField
												name='accommodationName'
												type='name'
												id='standard-search'
												className={classes.inputField}
												label='Provide Accommodation Name'
												data-test='signup-firstName-field'
												variant='outlined'
												onChange={this.handleChange.bind(this)}
												required
											/>
											<Box m={6} />
											<TextField
												name='description'
												type='name'
												id='standard-search'
												className={classes.inputField}
												label='Enter description'
												data-test='signup-lastName-field'
												variant='outlined'
												onChange={this.handleChange.bind(this)}
											/>
											<Box m={6} />
											<Autocomplete
												data-test='accommodation-location-field'
												id='combo-box-demo'
												options={rows}
												className={classes.Autocomplete}
												getOptionLabel={option => option.city}
												style={{ width: 300 }}
												onChange={(e, value) => {
													this.setState({
														locationId: value.id,
													});
												}}
												renderInput={params => (
													<TextField
														{...params}
														label='Provide Accommodation Locations'
														variant='outlined'
														required
													/>
												)}
											/>
											<Box m={4} />
											<Autocomplete
												data-test='accommodation-category-field'
												id='combo-box-demo'
												options={Categories}
												getOptionLabel={option => option.title}
												style={{ width: 300 }}
												onChange={(e, value) => {
													this.setState({
														category: value.title,
													});
												}}
												renderInput={params => (
													<TextField
														{...params}
														label='Provide Accommodation Category'
														variant='outlined'
													/>
												)}
											/>
											<Box m={4} />
											<TextField
												name='owner'
												type='name'
												id='standard-search'
												className={classes.inputField}
												label='owner'
												data-test='signup-address-field'
												variant='outlined'
												onChange={this.handleChange.bind(this)}
												required
											/>
										</form>
									</Card>
								</Grid>
								<Grid item xs={5}>
									<Card className={classes.card}>
										<Typography
											style={{
												fontSize: 15,
												color: 'black',
												textAlign: 'center',
											}}
										>
											Upload Images
										</Typography>
										<Box m={4} />
										<div className={classes.Typography}>
											<UploadImage
												uploadAccommodationImage={this.uploadAccommodationImage.bind(
													this,
												)}
												currentImages={this.state.images}
												label='Provide Accomodation Image'
											/>
										</div>
										<Box m={6} />
										<div className={classes.Chip}>
											{this.props.images.map((data, index) => {
												return (
													<>
														<Chip
															data-test='accommodation-image-chip-small'
															style={{ marginTop: '2px', marginLeft: '2px' }}
															label={`image ${index + 1}`}
															onDelete={() => {
																this.handleDeleteAccommodation(data.key);
															}}
															className={classes.chipData}
														/>
													</>
												);
											})}
										</div>{' '}
									</Card>
								</Grid>
							</Grid>
						</Hidden>
						<Box m={2} />
						<Typography
							style={{ fontSize: 15, color: 'black', textAlign: 'center' }}
						>
							Create rooms Category
						</Typography>
						<Box m={2} />
						<Grid container>
							<Hidden mdDown>
								<Grid item>
									<div
										style={
											this.state.rooms.length > 2
												? {
														padding: '20',
														maxWidth: '1090px',
														marginLeft: '5%',
												  }
												: {
														padding: '0',
														minWidth: '1030px',
														marginLeft: '6%',
												  }
										}
									>
										<ItemsCarousel
											infiniteLoop={false}
											gutter={12}
											activePosition={'center'}
											chevronWidth={24}
											disableSwipe={false}
											alwaysShowChevrons={false}
											numberOfCards={2}
											slidesToScroll={1}
											outsideChevron={true}
											showSlither={true}
											firstAndLastGutter={true}
											activeItemIndex={this.state.activeItemIndex}
											requestToChangeActive={value => {
												return this.setState({ activeItemIndex: value });
											}}
											rightChevron={<ArrowForwardIcon />}
											leftChevron={<ArrowBackIcon />}
											className='itemsCoursel'
										>
											{this.state.rooms.map((_, index) => {
												return (
													<div
														style={{
															with: '100%',
														}}
														key={index}
													>
														<RoomCard
															index={index}
															cardClicked={this.props.cardClicked}
															currentCard={this.props.currentCard}
															numberOfRoom={
																this.state.rooms ||
																this.state.rooms[index].numberOfRoom
																	? this.state.rooms[index].numberOfRoom
																	: null
															}
															typeId={this.state.rooms[index].typeId}
															price={this.state.rooms[index].price}
															currency={this.state.rooms[index].currency}
															roomTypeImageUrl={
																this.state.rooms[index].roomTypeImageUrl
															}
															handleChange={this.handleChange.bind(this)}
															AcccommodationTypes={AcccommodationTypes}
															HandleUploadRoomImage={this.HandleUploadRoomImage.bind(
																this,
															)}
															RoomImagesResult={this.props.RoomImagesResult}
															handleChangeRooms={this.handleChangeRooms}
															handleDeleteCard={this.handleDeleteCard}
															isLoading={this.props.isLoading}
															handleDeleteRoomChipCard={
																this.handleDeleteRoomChipCard
															}
															rooms={this.state.rooms}
														/>
													</div>
												);
											})}
										</ItemsCarousel>
									</div>
								</Grid>
								<Grid>
									<AddCircleRoundedIcon
										className={classes.addIcon}
										color='primary'
										onClick={this.addCard.bind(this)}
									/>
								</Grid>
							</Hidden>
							<Hidden lgUp>
								<Grid item>
									<div
										style={{
											padding: '0px',
											maxWidth: '400px',
										}}
									>
										<AutoPlaySwipeableViews
											index={this.state.activeItemIndex}
											enableMouseEvents
										>
											{this.state.rooms.map((_, index) => {
												return (
													<div key={index}>
														<RoomCard
															index={index}
															cardClicked={this.props.cardClicked}
															currentCard={this.props.currentCard}
															numberOfRoom={
																this.state.rooms ||
																this.state.rooms[index].numberOfRoom
																	? this.state.rooms[index].numberOfRoom
																	: null
															}
															typeId={this.state.rooms[index].typeId}
															price={this.state.rooms[index].price}
															currency={this.state.rooms[index].currency}
															roomTypeImageUrl={
																this.state.rooms[index].roomTypeImageUrl
															}
															handleChange={this.handleChange.bind(this)}
															AcccommodationTypes={AcccommodationTypes}
															HandleUploadRoomImage={this.HandleUploadRoomImage.bind(
																this,
															)}
															RoomImagesResult={this.props.RoomImagesResult}
															handleChangeRooms={this.handleChangeRooms}
															handleDeleteCard={this.handleDeleteCard}
															isLoading={this.props.isLoading}
															handleDeleteRoomChipCard={
																this.handleDeleteRoomChipCard
															}
															rooms={this.state.rooms}
														/>
													</div>
												);
											})}
										</AutoPlaySwipeableViews>
									</div>
									<AddCircleRoundedIcon
										style={{
											fontSize: 40,
											marginLeft: '80%',
											marginTop: '4%',
											cursor: 'pointer',
										}}
										color='primary'
										onClick={this.addCard.bind(this)}
									/>
									<MobileStepper
										steps={this.state.rooms.length}
										position='static'
										variant='text'
										activeStep={this.state.activeItemIndex}
										nextButton={
											<Button
												size='small'
												onClick={this.handleNext}
												disabled={
													this.state.activeItemIndex ===
													this.state.rooms.length - 1
												}
											>
												<KeyboardArrowRight />
											</Button>
										}
										backButton={
											<Button
												size='small'
												onClick={this.handleBack.bind(this)}
												disabled={this.state.activeItemIndex === 0}
											>
												<KeyboardArrowLeft />
											</Button>
										}
									/>
								</Grid>
							</Hidden>
						</Grid>
						<Box m={1} />
						<Grid container>
							<Grid item xs={10}>
								<ServiceCard
									handleChangeServices={this.handleChangeServices.bind(this)}
									handleChangeAmenities={this.handleChangeAmenities.bind(this)}
									addServices={this.addServices.bind(this)}
									addAmenities={this.addAmenities.bind(this)}
									disabled={this.state.disabled}
									AmenitiesDisabled={this.state.AmenitiesDisabled}
									handleFocus={this.handleFocus.bind(this)}
									open={this.state.open}
									SnackbarMessage={this.state.SnackbarMessage}
									handleCloseAlert={this.handleCloseAlert.bind(this)}
									services={this.state.services}
									amenities={this.state.amenities}
									handleDeleteServiceChipCard={this.handleDeleteServiceChipCard}
									handleDeleteAmenityChipCard={this.handleDeleteAmenityChipCard}
								/>
							</Grid>
						</Grid>
						<Box m={2} />
						<Grid container justify='flex-end'>
							<Grid item>
								{!this.props.isLoading ? (
									<Button
										variant='contained'
										color='primary'
										className={classes.Savebutton}
										onClick={this.handleClick.bind(this)}
										disabled={this.state.SaveDisabled}
									>
										Save
									</Button>
								) : (
									<CircularProgress className={classes.CircularProgress} />
								)}
							</Grid>
						</Grid>
					</Grid>
				</Paper>

				<Footer />
			</div>
		);
	}
}
const Categories = [
	{ title: 'Hotel', id: 1 },
	{ title: 'Motel', id: 2 },
	{ title: 'Guest house', id: 3 },
	{ title: 'Hostel', id: 4 },
	{ title: 'Self-catering', id: 5 },
];
export const mapStateToProps = state => {
	return {
		locations: state.accommodationFacilitiesReducer.locations,
		images: state.accommodationFacilitiesReducer.images,
		RoomImagesResult: state.accommodationFacilitiesReducer.roomImages,
		accommodationTypes: state.accommodationFacilitiesReducer.accommodationTypes,
		data: state.accommodationFacilitiesReducer.data,
		isLoading: state.accommodationFacilitiesReducer.isLoading,
		currentCard: state.accommodationFacilitiesReducer.payload,
	};
};
const connectedAccommodationFacilityPage = connect(mapStateToProps, {
	getLocations,
	getlocationsSuccess,
	uploadNewImageOnCloud,
	getAccommodationType,
	getaccommodationTypesSuccess,
	uploadNewRoomImageOnCloud,
	createAccomodationFacility,
	createAccommodationSuccess,
	cardClicked,
	handleDeleteAccommodation,
})(withStyles(Styles)(AccommodationFacility));
export default connectedAccommodationFacilityPage;
