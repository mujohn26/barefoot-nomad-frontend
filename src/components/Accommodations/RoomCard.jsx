import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Styles } from '../../styles/createAccommodation';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UploadRoomImage } from '../../components/Accommodations/UploadRoomImage.jsx';
import Chip from '@material-ui/core/Chip';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
export class RoomCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRoomValid: true,
			validRoomError: '',
			isPriceValid: true,
			isPriceValidError: '',
		};
	}
	handleBlur(event) {
		const regEx = /^[0-9]*$/;
		if (event.target.name === 'numberOfRoom' && event.target.name !== '') {
			const isRoomValid = regEx.test(event.target.value);
			this.setState({
				isRoomValid: isRoomValid,
			});
		}
		if (event.target.name === 'price' && event.target.name !== '') {
			const isPriceValid = regEx.test(event.target.value);
			this.setState({
				isPriceValid: isPriceValid,
			});
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<Grid item xs={5}>
				<Card className={classes.roomCard}>
					<CloseRoundedIcon
						style={{
							fontSize: 25,
							cursor: 'pointer',
						}}
						color='secondary'
						onClick={() => this.props.handleDeleteCard(this.props.index)}
						data-test='detele-icon'
					/>

					<form className={classes.RoomForm}>
						<TextField
							name='numberOfRoom'
							type='name'
							id='standard-search'
							className={classes.inputField}
							label='Provide How many rooms'
							data-test='numberOfRoom-field'
							variant='outlined'
							onBlur={this.handleBlur.bind(this)}
							error={!this.state.isRoomValid}
							onChange={(e, value) =>
								this.props.handleChangeRooms(e, value, this.props.index)
							}
							helperText={
								!this.state.isRoomValid
									? 'Number of rooms must be a number'
									: ''
							}
						/>
						 <Box m={6} />
						<Autocomplete
							id='roomType'
							data-test='roomType-field'
							options={this.props.AcccommodationTypes}
							className={classes.Autocomplete}
							getOptionLabel={option => option.name}
							style={{ width: 300 }}
							onChange={(e, value) => {
								const name = 'typeId';
								this.props.handleChangeRooms(
									e,
									value.id,
									this.props.index,
									name,
								);
							}}
							renderInput={params => (
								<TextField
									{...params}
									label='Provide Room Type'
									variant='outlined'
								/>
							)}
						/>
						 <Box m={2} />
						<TextField
							name='price'
							type='name'
							id='standard-search'
							className={classes.inputField}
							label='Provide Room Price Per Night'
							data-test='price-field'
							variant='outlined'
							onBlur={this.handleBlur.bind(this)}
							error={!this.state.isPriceValid}
							onChange={(e, value) =>
								this.props.handleChangeRooms(e, value, this.props.index)
							}
							helperText={
								!this.state.isPriceValid ? 'Price  must be a number' : ''
							}
						/>
						<Box m={6} />
						<Autocomplete
							id='currency'
							name='currency'
							options={Currencies}
							data-test='currency-field'
							getOptionLabel={option => option.name}
							className={classes.Autocomplete}
							style={{ width: 300 }}
							onChange={(e, value) => {
								const name = 'currency';
								this.props.handleChangeRooms(
									e,
									value.name,
									this.props.index,
									name,
								);
							}}
							renderInput={params => (
								<TextField
									{...params}
									label='Provide currency'
									variant='outlined'
								/>
							)}
						/>
						<Box m={4} />
						<UploadRoomImage
							cardClicked={this.props.cardClicked}
							id={this.props.index}
							HandleUploadRoomImage={this.props.HandleUploadRoomImage}
							label='	Provide Room Image'
							isLoading={this.props.isLoading}
						/>
						<Box m={4} />
						<div className={classes.Chip}>
							{this.props.RoomImagesResult &&
								this.props.RoomImagesResult.map((data, index) => {
									{
								this.props.rooms[data.cardId].roomTypeImageUrl=data.Image;
										if (data.cardId === this.props.index) {
										
											return (
												<Chip
												data-test="room-image-chip"
													style={{ marginTop: '2px', marginLeft: '2px' }}
													key={data.Image}
													label={`image ${index + 1}`}
													className={classes.chipData}
													onDelete={()=>this.props.handleDeleteRoomChipCard(data.cardId)}
												/>
											);
										}
									}
								})}
						</div>{' '}
						 
					</form>
				</Card>
			</Grid>
		);
	}
}

const Currencies = [
	{ name: 'USD', id: 1 },
	{ name: 'EUR', id: 2 },
	{ name: 'JPY', id: 3 },
	{ name: 'RWF', id: 4 },
	{ name: 'BIF', id: 5 },
	{ name: 'BIF', id: 6 },
	{ name: 'UGX', id: 7 },
];
export default withStyles(Styles)(RoomCard);
