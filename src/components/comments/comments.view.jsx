import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	getTripRequestCommentsAction,
	getMoreTripRequestCommentsAction,
	saveTripRequestCommentAction,
	deleteTripRequestCommentAction,
} from '../../actions/requests/commentsAction';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Moment from 'react-moment';
import {
	Grid,
	Card,
	Button,
	Typography,
	CardContent,
	Avatar,
	TextField,
	Box,
	Hidden,
	Modal,
	CircularProgress,
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(2),
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
	},
}));

export const handleClose = setOpen => {
	setOpen(false);
};

export const Comments = props => {
	const classes = useStyles();

	const [isEditMode, setIsEditMode] = React.useState(false);
	const [comment, setComment] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [data, setData] = React.useState();
	const [page, setPage] = React.useState(1);

	const handleOpen = id => {
		setData({ tripId: props.tripId, id });
		setOpen(true);
	};

	useEffect(() => {
		if (props.comments.length == 0) {
			props.getTripRequestCommentsAction(props.tripId);
		}
	});

	return (
		<Box>
			<InfiniteScroll
				style={{ overflow: 'hiden' }}
				dataLength={props.commentsSize}
				next={() => {
					setPage(page + 1);
					props.getMoreTripRequestCommentsAction({
						tripId: props.tripId,
						page,
					});
				}}
				hasMore={props.commentsSize == props.comments.length ? false : true}
				loader={
					<Grid container justify='center'>
						<Grid item>
							<Box py={2}>
								<CircularProgress />
							</Box>
						</Grid>
					</Grid>
				}
			>
				<Grid container spacing={2}>
					<Grid item container spacing={2}>
						<Grid
							item
							container
							sm={12}
							justify='space-between'
							alignItems='center'
						>
							<Grid xs={2} sm={1} md={1} item container>
								<Avatar alt='image' src={props.user.profileImage} />
							</Grid>
							<Grid xs={9} sm={11} md={11} item container>
								<TextField
									id='commentTextField'
									label='Your comment'
									multiline
									fullWidth
									value={comment}
									onChange={e => {
										setComment(e.target.value);
										if (e.target.value.length > 0) {
											setIsEditMode(true);
										} else {
											setIsEditMode(false);
										}
									}}
								/>
							</Grid>
						</Grid>
						<Grid
							style={{ visibility: isEditMode ? 'visible' : 'hidden' }}
							item
							container
							justify='flex-end'
							spacing={2}
						>
							<Grid item>
								<Button
									id='cancelBtn'
									disableElevation
									onClick={() => {
										setComment('');
										setIsEditMode(false);
									}}
								>
									Cancel
								</Button>
							</Grid>
							<Grid item>
								<Button
									id='commentBtn'
									variant='contained'
									color='primary'
									disableElevation
									onClick={() => {
										props.saveTripRequestCommentAction({
											tripId: props.tripId,
											user: props.user,
											comment: { comment },
										});
										setComment('');
										setIsEditMode(false);
									}}
								>
									Comment
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Hidden lgUp>
						{props.comments.map((item, index) => {
							return (
								<Grid key={index} xs={12} item>
									<Card style={{ borderRadius: 10 }} variant='outlined'>
										<Box
											p={1.5}
											style={{
												backgroundColor: '#F1F1F1',
												borderBottomLeftRadius: 10,
												borderBottomRightRadius: 10,
											}}
										>
											<Grid container spacing={6} alignItems='center'>
												<Grid xs={2} item container>
													<Avatar
														alt='image'
														src={item.user ? item.user.profileImage : ''}
													/>
												</Grid>
												<Grid xs={8} item container>
													<Grid item container>
														<Typography
															style={{ fontSize: 16, color: '#A39E9E' }}
															variant='h3'
														>
															{item.user ? item.user.firstName : ''}
														</Typography>
													</Grid>
													<Grid item container>
														<Typography
															style={{ fontSize: 14, color: '#A39E9E' }}
															variant='h3'
															align='center'
														>
															<Moment fromNow>
																{item.createdAt ? item.createdAt : ''}
															</Moment>
														</Typography>
													</Grid>
												</Grid>
											</Grid>
										</Box>
										<CardContent>
											<Grid container>
												<Grid xs={12} item container>
													<Typography
														style={{ fontSize: 16, color: '#A39E9E' }}
														variant='h3'
													>
														{item.comment}
													</Typography>
												</Grid>
											</Grid>
										</CardContent>
										<Grid
											style={{
												visibility: item.user
													? item.commentorId == props.user.id
														? 'visible'
														: 'hidden'
													: '',
											}}
											container
											justify='flex-end'
										>
											<Grid item>
												<Button
													id='deleteBtn'
													variant='contained'
													color='secondary'
													disableElevation
													onClick={() => handleOpen(item.id)}
												>
													Delete
												</Button>
											</Grid>
										</Grid>
									</Card>
								</Grid>
							);
						})}
					</Hidden>
					<Hidden mdDown>
						{props.comments.map((item, index) => {
							return (
								<Grid key={index} item container>
									<Grid md={1} item container>
										<Avatar
											alt='image'
											src={item.user ? item.user.profileImage : ''}
										/>
									</Grid>
									<Grid md={11} item>
										<Card style={{ borderRadius: 10 }} variant='outlined'>
											<Box
												p={1.5}
												style={{
													backgroundColor: '#F1F1F1',
													borderBottomLeftRadius: 10,
													borderBottomRightRadius: 10,
												}}
											>
												<Grid container>
													<Grid md={6} item container>
														<Typography
															style={{ fontSize: 16, color: '#A39E9E' }}
															variant='h3'
														>
															{item.user
																? item.user.firstName + ' ' + item.user.lastName
																: ''}
														</Typography>
													</Grid>
													<Grid md={6} item container justify='flex-end'>
														<Typography
															style={{ fontSize: 16, color: '#A39E9E' }}
															variant='h3'
															align='center'
														>
															<Moment fromNow>{item.createdAt}</Moment>
														</Typography>
													</Grid>
												</Grid>
											</Box>
											<CardContent>
												<Grid container>
													<Grid md={12} item container>
														<Typography
															style={{ fontSize: 16, color: '#A39E9E' }}
															variant='h3'
														>
															{item.comment}
														</Typography>
													</Grid>
												</Grid>
											</CardContent>
											<Grid container justify='flex-end'>
												<Grid item>
													<Button
														id='deleteBtn'
														style={{
															visibility: item.user
																? item.commentorId == props.user.id
																	? 'visible'
																	: 'hidden'
																: '',
														}}
														variant='contained'
														color='secondary'
														disableElevation
														onClick={() => handleOpen(item.id)}
													>
														Delete
													</Button>
												</Grid>
											</Grid>
										</Card>
									</Grid>
								</Grid>
							);
						})}
					</Hidden>
				</Grid>
			</InfiniteScroll>
			<Modal
				id='modelPop'
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={() => handleClose(setOpen)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				disablePortal
				disableEnforceFocus
				disableAutoFocus
			>
				<Fade in={open}>
					<Box p={3} className={classes.paper}>
						<Box pb={3}>
							<Typography style={{ fontSize: 32, color: 'red' }} variant='h3'>
								Warning!
							</Typography>
						</Box>
						<Typography style={{ fontSize: 18, color: '#A39E9E' }} variant='h3'>
							Your are about to delete a comment, are you sure?
						</Typography>
						<ModelPop
							{...props}
							handleClose={handleClose}
							setOpen={setOpen}
							data={data}
						/>
					</Box>
				</Fade>
			</Modal>
		</Box>
	);
};

export const ModelPop = props => {
	return (
		<Box pt={3}>
			<Grid container justify='flex-end' spacing={2}>
				<Grid item>
					<Button
						id='cancelBtn'
						disableElevation
						onClick={() => props.handleClose(props.setOpen)}
					>
						Cancel
					</Button>
				</Grid>
				<Grid item>
					<Button
						id='finalDeleteBtn'
						variant='contained'
						color='secondary'
						disableElevation
						onClick={() => {
							props.deleteTripRequestCommentAction(props.data);
							props.handleClose(props.setOpen);
						}}
					>
						Delete
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export const mapStateToProps = state => {
	return {
		comments: state.tripRequestCommentsReducer.comments,
		commentsSize: state.tripRequestCommentsReducer.commentsSize || 0,
		user: state.userProfileReducer.userProfileInfo,
	};
};

export default connect(mapStateToProps, {
	getTripRequestCommentsAction,
	getMoreTripRequestCommentsAction,
	saveTripRequestCommentAction,
	deleteTripRequestCommentAction,
})(Comments);
