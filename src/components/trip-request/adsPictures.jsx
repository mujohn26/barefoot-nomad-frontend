import React, { Component } from 'react';
import ItemsCarousel from 'react-items-carousel';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { GetAccomodations } from '../../actions/tripRequestAction.js';
import { connect } from 'react-redux';
import {
	Paper,
	ButtonBase,
	CardMedia,
	CardContent,
	CardActionArea,
	Card,
	Button,
	Typography,
	CardHeader,
	CardActions,
	Grid,
	Box,
	Link,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
	paper: {
		padding: '0px 40px 0px',
		textAlign: 'center',
		alignContent: 'center',
	},
	title: {
		fontSize: 22,
		textAlign: 'left',
		padding: '0px 0px 0px 10px',
	},
	information: {
		fontSize: 9,
		textAlign: 'center',
	},
	available: {
		fontSize: 16,
		textAlign: 'left',
		color: 'green',
	},
	notAvailable: {
		fontSize: 16,
		textAlign: 'left',
		color: 'red',
	},
	infoSection: {
		backgroundColor: 'rgba(200, 229, 255, 0.47)',
	},
	button: {
		fontSize: 18,
		textAlign: 'left',
		padding: '0px 5px 0px 5px',
		backgroundColor: 'white',
		color: '#0094FF',
		textDecoration: 'none',
	},
	cardBorder: {
		borderStyle: 'outset',
		borderColor: '#0094FF',
	},
};

export class AdsPictures extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accommodationId: false,
			activeItemIndex: 0,
		};
	}
	render() {
		let accomodationInfomation = this.props.accomodationInfo.accommodations;
		return (
			<Box
				style={
					this.props.bigSize
						? {
								padding: '0',
								maxWidth: '100%',
						  }
						: this.props.screenSize.toString() == 'lg'
						? {
								padding: '0',
								maxWidth: '760px',
						  }
						: this.props.screenSize.toString() == 'md'
						? {
								padding: '0',
								maxWidth: '490px',
						  }
						: this.props.screenSize.toString() == 'sm'
						? {
								padding: '0',
								maxWidth: '420px',
						  }
						: {
								padding: '0',
								width: '350px',
						  }
				}
			>
				{!this.props.accomodationInfo.accommodations ? (
					<Box>
						{' '}
						<Typography variant='h3' align='center' color='textSecondary'>
							{' '}
							<Box m={22} />
							Provide your trip information !!!
							<Box m={22} />
						</Typography>
					</Box>
				) : (
					<>
						<Typography variant='h4' align='center'>
							{' '}
							Available Accommodations in {this.props.destination}
						</Typography>
						<Paper style={Object.assign({}, styles.paper)}>
							<br />
							<Typography variant='h6' align='center' color='textSecondary'>
								{' '}
								To select an accommodation, click on one of your choice
							</Typography>
							<br />
							<div
								style={
									this.props.bigSize && accomodationInfomation.length > 1
										? {
												padding: '0',
												maxWidth: '1100px',
										  }
										: this.props.screenSize.toString() == 'lg'
										? {
												padding: '0',
												maxWidth: '850px',
										  }
										: this.props.screenSize.toString() == 'md'
										? {
												padding: '0',
												maxWidth: '480px',
										  }
										: this.props.screenSize.toString() == 'sm'
										? {
												padding: '0',
												maxWidth: '420px',
										  }
										: {
												padding: '0',
												maxWidth: '320px',
										  }
								}
							>
								<ItemsCarousel
									infiniteLoop={false}
									gutter={12}
									activePosition={'center'}
									chevronWidth={60}
									disableSwipe={false}
									alwaysShowChevrons={false}
									numberOfCards={
										this.props.bigSize && accomodationInfomation.length > 1
											? 2
											: 1
									}
									slidesToScroll={1}
									outsideChevron={true}
									showSlither={true}
									firstAndLastGutter={true}
									activeItemIndex={this.state.activeItemIndex}
									requestToChangeActive={value =>
										this.setState({ activeItemIndex: value })
									}
									rightChevron={<ArrowForwardIcon />}
									leftChevron={<ArrowBackIcon />}
								>
									{this.props.accomodationInfo.accommodations.map((_, i) => (
										<div key={i}>
											<Box
												border={
													this.props.value.accomodationId ==
													accomodationInfomation[i].id
														? 3
														: 0
												}
												style={styles.cardBorder}
											>
												<Card
													onClick={
														this.props.index
															? () => (
																	this.props.onClick(
																		accomodationInfomation[i].id,
																		this.props.number,
																	),
																	this.setState({ accommodationId: true })
															  )
															: () =>
																	this.props.onClick(
																		accomodationInfomation[i].id,
																	)
													}
												>
													<CardActionArea>
														<Typography
															style={Object.assign({}, styles.title)}
															color='textPrimary'
															gutterBottom
														>
															<strong>{accomodationInfomation[i].name}</strong>
														</Typography>
														<CardMedia
															key={i}
															component='img'
															height='270'
															image={
																accomodationInfomation[i].firstImage
																	? accomodationInfomation[i].firstImage
																	: 'https://res.cloudinary.com/drpye5niv/image/upload/v1583421918/images_accomoadation_xvyh9q.jpg'
															}
															title='No Image Provided'
														/>
														<CardContent
															style={Object.assign({}, styles.infoSection)}
														>
															<Grid container spacing={3}>
																<Grid item xs={6} sm={5}>
																	<Rating
																		name='read-only'
																		value={
																			accomodationInfomation[i].averageRate
																		}
																		readOnly
																	/>
																</Grid>
																<Grid item xs={6} sm={3}>
																	{accomodationInfomation[i].availableRooms >
																	0 ? (
																		<Typography
																			style={Object.assign(
																				{},
																				styles.available,
																			)}
																			gutterBottom
																		>
																			<strong>Available</strong>
																		</Typography>
																	) : (
																		<Typography
																			style={Object.assign(
																				{},
																				styles.notAvailable,
																			)}
																			gutterBottom
																		>
																			<strong>Occupied</strong>
																		</Typography>
																	)}
																</Grid>
																<Grid item xs={6} sm={4}>
																	<Link
																		href='/'
																		variant='body2'
																		style={Object.assign({}, styles.button)}
																	>
																		More Details
																	</Link>
																</Grid>
															</Grid>
														</CardContent>
													</CardActionArea>
												</Card>
											</Box>
										</div>
									))}
								</ItemsCarousel>
							</div>
							<br />
						</Paper>{' '}
					</>
				)}
			</Box>
		);
	}
}
export const mapStateToProps = state => {
	return {
		accomodationInfo: state.tripRequestReducer,
	};
};
export const accPictures = connect(mapStateToProps, { GetAccomodations })(
	AdsPictures,
);

export default accPictures;
