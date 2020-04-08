import React, { useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import Comments from '../../components/comments/comments.view.jsx';
import Select from '../../components/common/Select.component.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Grid, GridList, GridListTile, Typography, GridListTileBar, Card, CardContent, Box, Container, Button, Modal, Hidden, CircularProgress, Snackbar } from '@material-ui/core';
import {
    getAvailableAccommodationsAction,
    getAccommodationDetailsAction,
    likeAccommodationAction,
    rateAccommodationAction,
    setSnackBarMessageAction,
    getUserRatingsAccommodationAction,
    updateRateAccommodationAction,
    getAccommodationRoomTypeAction,
    bookAccommodationAction,
    getUserLikeStatusAccommodationAction
} from '../../actions/booking/accommodation.action';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2)
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5]
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    titleBar: {
        background:
            'none',
    },
}));

export const Booking = (props) => {
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [openAlert, setopenAlert] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [isBooking, setIsBooking] = React.useState(false);
    const [options, setoptions] = React.useState('');
    const [selectedAccommodation, setSelectedAccommodation] = React.useState(0);

    const [roomTypeId, setRoomTypeId] = React.useState(null);
    const [roomTypeName, setRoomTypeName] = React.useState(null);
    const [requestIsSent, setrequestIsSent] = React.useState(false);

    const [selectedDate1, setSelectedDate1] = React.useState(Date.now());
    const [selectedDate2, setSelectedDate2] = React.useState(Date.now());

    const classes = useStyles();

    const handleDateChange1 = date => {
        setSelectedDate1(date);
    };

    const handleDateChange2 = date => {
        setSelectedDate2(date);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose = () => {
        setOpen(false);
        setRoomTypeId(null);
        setoptions('');
    };

    const handleCloseAlert = () => {
        props.setSnackBarMessageAction({ message: '', type: 'warning' });
        setopenAlert(false);
    };

    const handleClose2 = (setOpen) => {
        setOpen2(false);
    };

    let count = 0;
    let countImage = 0;

    useEffect(() => {
        if (isBooking && !props.isBooking) {
            handleClose()
            props.history.push(`/trips/${props.trip.id}`);
        }
        if (props.trip.id == undefined) {
            props.history.push('/trips');
        }
        if (!requestIsSent) {
            setSelectedAccommodation(props.accommodationId);
            props.getAvailableAccommodationsAction({ accommodationId: props.accommodationId });
            props.getUserRatingsAccommodationAction(props.accommodationId);
            props.getAccommodationRoomTypeAction(props.accommodationId);
            props.getUserLikeStatusAccommodationAction(props.accommodationId);
            setrequestIsSent(true)
        }
        if (props.snackbarMessage.message != '' && !openAlert) {
            setopenAlert(true);
            if (props.snackbarMessage.message == 'You have not booked that accomodation') {
                setValue(0);
            }
        }
    })

    return (
        <Box>
            <Hidden mdDown>
                <Box pt={2}>
                    {props.accommodations.length > 0 ?
                        <Card>
                            <CardContent>
                                <Grid container spacing={4}>
                                    <Grid item lg={4}>
                                        <Box pb={2}>
                                            <Typography style={{ fontSize: 24, color: '#616161' }} variant="h3">Available accommodations</Typography>
                                        </Box>
                                        <GridList style={{ overflow: 'scroll' }} className="booking_grid_scroll" spacing={22}>
                                            {props.accommodations.map((item, index) => {
                                                return (
                                                    <GridListTile
                                                        className="hover_event"
                                                        key={index}
                                                        onClick={() => {
                                                            setSelectedAccommodation(item.id);
                                                            props.getAccommodationDetailsAction(item.id);
                                                            props.getUserRatingsAccommodationAction(item.id);
                                                            props.getAccommodationRoomTypeAction(item.id);
                                                            props.getUserLikeStatusAccommodationAction(item.id);
                                                        }}>
                                                        <img src={item.firstImage ? item.firstImage : 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder.png'} alt={'image'} />
                                                        <GridListTileBar
                                                            style={item.id == selectedAccommodation ? { backgroundColor: '#fbbc05' } : {}}
                                                            title={item.name}
                                                        />
                                                    </GridListTile>
                                                )
                                            })}
                                        </GridList>
                                    </Grid>
                                    {props.accommodation.accommodations && !props.isLoading ?
                                        <Grid item container lg={8} alignItems="flex-start" style={{ overflow: 'scroll' }} className="booking_list_scroll">
                                            <Grid item container xs={5}>
                                                <Box width={250}>
                                                    <Typography style={{ fontSize: 24, color: 'black' }} variant="h3">{props.accommodation.accommodations.length ? props.accommodation.accommodations[0].name : ""}</Typography>
                                                    <Box py={2}>
                                                        <Typography style={{ fontSize: 18, color: '#616161' }} variant="h3">{props.city}</Typography>
                                                    </Box>
                                                    <Grid container justify="flex-start">
                                                        <Grid item xs={6} spacing={1} container alignItems="center">
                                                            <Grid item>
                                                                <Typography className='hover_event' style={{ fontSize: 14, color: '#616161' }} variant="h3">{props.accommodation.accommodations.length ? props.accommodation.accommodations[0].likes : 0}</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <ThumbUpAltOutlinedIcon onClick={() => {
                                                                    props.likeAccommodationAction({
                                                                        id: props.accommodation.accommodations[0].id,
                                                                        isLike: true,
                                                                        status: props.userLikes.islike
                                                                    })
                                                                }} className='hover_event' style={{ color: props.userLikes.islike == true ? '#0094FF' : '#616161' }} />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6} spacing={1} container alignItems="center">
                                                            <Grid item>
                                                                <Typography className='hover_event' style={{ fontSize: 14, color: '#616161' }} variant="h3">{props.accommodation.accommodations.length ? props.accommodation.accommodations[0].unlikes : 0}</Typography></Grid>
                                                            <Grid item>
                                                                <ThumbDownOutlinedIcon onClick={() => {
                                                                    props.likeAccommodationAction({
                                                                        id: props.accommodation.accommodations[0].id,
                                                                        isLike: false,
                                                                        status: props.userLikes.islike
                                                                    })
                                                                }}
                                                                    className='hover_event' style={{ color: props.userLikes.islike == false ? 'red' : '#616161' }} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Box pt={2}>
                                                        <Rating
                                                            name="simple-controlled"
                                                            value={props.accommodation.accommodations.length ? props.accommodation.accommodations[0].averageRate : 0}
                                                            disabled
                                                        />
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Typography style={{ fontSize: 18, color: 'red' }} variant="h3"> {props.accommodation.accommodations[0].availableRooms > 0 ? "" : "Fully occupied"}</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button
                                                    id="bookingBtn"
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={props.accommodation.accommodations[0].availableRooms > 0 ? false : true}
                                                    fullWidth
                                                    disableElevation
                                                    onClick={handleOpen}>
                                                    Book now
                                                </Button>
                                            </Grid>
                                            <Grid item container>
                                                <Grid item xs={12}>
                                                    <Box pt={2}>
                                                        <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Services</Typography>
                                                        <Box py={0.5}></Box>
                                                        <div className={classes.root}>
                                                            {props.accommodation.accommodationServices ? props.accommodation.accommodationServices.map((item, index) => {
                                                                return (<Chip key={index} label={item.name} />)
                                                            }) : <div />}
                                                        </div>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box pt={2}>
                                                        <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Amenities</Typography>
                                                        <Box py={0.5}></Box>
                                                        <div className={classes.root}>
                                                            {props.accommodation.accommodationAmenities ? props.accommodation.accommodationAmenities.map((item, index) => {
                                                                return (<Chip key={index} label={item.name} />)
                                                            }) : <div />}
                                                        </div>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box py={2}>
                                                        <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Description</Typography>
                                                        <Box py={0.5}></Box>
                                                        <Typography style={{ fontSize: 16, color: '#616161' }} variant="h3">{props.accommodation.accommodations.length ? props.accommodation.accommodations[0].description : "hhjgdhgashbhfsb fn hbfsdbhsdfbhbhfbhasbn  bbhgshtuahsuhahjbsb gbhbegbgn b sbjbhfdjgnsnd   bdbhfgsbhgshbhghxbgisfs omlshbsf usduhtgsdv guwhjsybg s."}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Gallery</Typography>
                                                    <Box py={0.5}></Box>
                                                    <div className="row" style={{ whiteSpace: "nowrap" }}>
                                                        {props.accommodation.accommodationImages ? props.accommodation.accommodationImages.map((item, index) => {
                                                            return (
                                                                <div key={index} style={{ padding: 4, display: "inline-block" }}>
                                                                    <img width={120} height={90} src={item.imageUrl ? item.imageUrl : "https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder.png"} alt={'image'} />
                                                                </div>
                                                            )
                                                        }) : <div />}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Box pt={1}>
                                                <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Your rating</Typography>
                                                <Box py={0.5}></Box>
                                                <Rating
                                                    name="rating-controlled"
                                                    value={props.userRating != 0 ? props.userRating : value}
                                                    onChange={(event, newValue) => {
                                                        if (props.userRating > 0) {
                                                            props.updateRateAccommodationAction({ rate: newValue, item: props.accommodation.accommodations[0] })
                                                        } else {
                                                            props.rateAccommodationAction({
                                                                id: props.accommodation.accommodations[0].id,
                                                                rate: newValue
                                                            });
                                                        }
                                                        setValue(newValue);
                                                    }}
                                                />
                                            </Box>
                                            <Grid xs={12} item>
                                                <Container style={{ paddingTop: 42 }}>
                                                    <Comments tripId={props.match.params.id} />
                                                </Container>
                                            </Grid>
                                        </Grid>
                                        : <Grid item container lg={8} alignItems="center" justify="center" style={{ overflow: 'scroll' }} className="booking_list_scroll">
                                            <Grid item>
                                                <Box>
                                                    <CircularProgress />
                                                </Box>
                                            </Grid>
                                        </Grid>}
                                </Grid>
                            </CardContent>
                        </Card> : <Grid item xs={12} container alignItems="center" justify="center">
                            <Grid item>
                                <Box pt={40}>
                                    <CircularProgress />
                                </Box>
                            </Grid>
                        </Grid>}
                </Box>
            </Hidden>
            <Hidden lgUp>
                {props.accommodations.length > 0 ?
                    <Card>
                        <CardContent>
                            <Box pb={2}>
                                <Typography style={{ fontSize: 18, color: '#616161' }} variant="h3">Available accommodations</Typography>
                            </Box>
                            <GridList spacing={8}>
                                {props.accommodations.map((item, index) => {
                                    return (
                                        <GridListTile
                                            className="hover_event"
                                            key={index}
                                            onClick={() => {
                                                setSelectedAccommodation(item.id)
                                                props.getAccommodationDetailsAction(item.id);
                                                props.getUserRatingsAccommodationAction(item.id);
                                                props.getAccommodationRoomTypeAction(item.id);
                                                props.getUserLikeStatusAccommodationAction(item.id);
                                                handleOpen2();
                                            }}>
                                            <img src={item.firstImage ? item.firstImage : "https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder.png"} alt={'image'} />
                                            <GridListTileBar
                                                style={item.id == selectedAccommodation ? { backgroundColor: '#fbbc05' } : {}}
                                                title={item.name}
                                            />
                                            <GridListTileBar
                                                titlePosition="top"
                                                actionPosition="right"
                                                className={classes.titleBar}
                                            />
                                        </GridListTile>
                                    )
                                })}
                            </GridList>
                        </CardContent>
                    </Card>
                    : <Grid container alignItems="center" justify="center">
                        <Grid item>
                            <Box pt={27}>
                                <CircularProgress />
                            </Box>
                        </Grid>
                    </Grid>}
            </Hidden>
            <Modal
                id='modelPop2'
                aria-labelledby="transition-modal-title2"
                aria-describedby="transition-modal-description2"
                className={'modal-2'}
                open={open2}
                onClose={() => handleClose2(setOpen2)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                disablePortal
                disableEnforceFocus
                disableAutoFocus>
                <Fade in={open2}>
                    <Box p={3} className={classes.paper}>
                        {props.accommodation.accommodations && !props.isLoading ?
                            <Grid item container xs={12} lg={8} alignItems="flex-start" style={{ overflow: 'scroll' }} className="booking_list_scroll2">
                                <Grid item container xs={5}>
                                    <Box width={250}>
                                        <Typography style={{ fontSize: 24, color: 'black' }} variant="h3">{props.accommodation.accommodations.length ? props.accommodation.accommodations[0].name : ""}</Typography>
                                        <Box py={2}>
                                            <Typography style={{ fontSize: 18, color: '#616161' }} variant="h3">{props.city}</Typography>
                                        </Box>
                                        <Grid container justify="flex-start">
                                            <Grid item xs={6} spacing={1} container alignItems="center">
                                                <Grid item>
                                                    <Typography className='hover_event' style={{ fontSize: 14, color: '#616161' }} variant="h3">{props.accommodation.accommodations.length ? props.accommodation.accommodations[0].likes : 0}</Typography></Grid>
                                                <Grid item>
                                                    <ThumbUpAltOutlinedIcon onClick={() => {
                                                        props.likeAccommodationAction({
                                                            id: props.accommodation.accommodations[0].id,
                                                            isLike: true,
                                                            status: props.userLikes.islike
                                                        })
                                                    }} className='hover_event' style={{ color: props.userLikes.islike == true ? '#0094FF' : '#616161' }} />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6} spacing={1} container alignItems="center">
                                                <Grid item>
                                                    <Typography className='hover_event' style={{ fontSize: 14, color: '#616161' }} variant="h3">{props.accommodation.accommodations.length ? props.accommodation.accommodations[0].unlikes : 0}</Typography></Grid>
                                                <Grid item>
                                                    <ThumbDownOutlinedIcon onClick={() => {
                                                        props.likeAccommodationAction({
                                                            id: props.accommodation.accommodations[0].id,
                                                            isLike: false,
                                                            status: props.userLikes.islike
                                                        })
                                                    }} className='hover_event' style={{ color: props.userLikes.islike == false ? 'red' : '#616161' }} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Box pt={2}>
                                            <Rating
                                                name="simple-controlled"
                                                value={props.accommodation.accommodations.length ? props.accommodation.accommodations[0].averageRate : 0}
                                                disabled
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography style={{ fontSize: 18, color: 'red' }} variant="h3"> {props.accommodation.accommodationRooms.length ? "" : "Fully occupied"}</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Button
                                        id="bookingBtn"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        disabled={props.accommodation.accommodations[0].availableRooms > 0 ? false : true}
                                        disableElevation
                                        onClick={() => handleOpen()}>
                                        Book now
                                    </Button>
                                </Grid>
                                <Grid item container>
                                    <Grid item xs={12}>
                                        <Box pt={2}>
                                            <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Services</Typography>
                                            <Box py={0.5}></Box>
                                            <div className={classes.root}>
                                                {props.accommodation.accommodationServices ? props.accommodation.accommodationServices.map((item, index) => {
                                                    return (<Chip key={index} label={item.name} />)
                                                }) : <div />}
                                            </div>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box pt={2}>
                                            <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Amenities</Typography>
                                            <Box py={0.5}></Box>
                                            <div className={classes.root}>
                                                {props.accommodation.accommodationAmenities ? props.accommodation.accommodationAmenities.map((item, index) => {
                                                    return (<Chip key={index} label={item.name} />)
                                                }) : <div />}
                                            </div>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box py={2}>
                                            <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Description</Typography>
                                            <Box py={0.5}></Box>
                                            <Typography style={{ fontSize: 16, color: '#616161' }} variant="h3">{props.accommodation.accommodations.length ? props.accommodation.accommodations[0].description : "hhjgdhgashbhfsb fn hbfsdbhsdfbhbhfbhasbn  bbhgshtuahsuhahjbsb gbhbegbgn b sbjbhfdjgnsnd   bdbhfgsbhgshbhghxbgisfs omlshbsf usduhtgsdv guwhjsybg s."}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Gallery</Typography>
                                        <Box py={0.5}></Box>
                                        <div className="row" style={{ whiteSpace: "nowrap" }}>
                                            {props.accommodation.accommodationImages ? props.accommodation.accommodationImages.map((item, index) => {
                                                return (
                                                    <div key={index} style={{ padding: 4, display: "inline-block" }}>
                                                        <img width={120} height={90} src={item.imageUrl ? item.imageUrl : 'https://tnthomeimprovements.com/wp-content/uploads/2019/08/placeholder.png'} alt={'image'} />
                                                    </div>
                                                )
                                            }) : <div />}
                                        </div>
                                    </Grid>
                                </Grid>
                                <Box pt={1}>
                                    <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Your rating</Typography>
                                    <Box py={0.5}></Box>
                                    <Rating
                                        id="rating1"
                                        name="rating-controlled"
                                        value={props.userRating != 0 ? props.userRating : value}
                                        onChange={(event, newValue) => {
                                            if (props.userRating > 0) {
                                                props.updateRateAccommodationAction({ rate: newValue, item: props.accommodation.accommodations[0] })
                                            } else {
                                                props.rateAccommodationAction({
                                                    id: props.accommodation.accommodations[0].id,
                                                    rate: newValue
                                                });
                                            }
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                                <Grid xs={12} item>
                                    <Container style={{ paddingTop: 42 }}>
                                        <Comments tripId={props.match.params.id} />
                                    </Container>
                                </Grid>
                            </Grid>
                            : <Grid item container xs={12} lg={8} alignItems="center" justify="center" style={{ overflow: 'scroll' }} className="booking_list_scroll">
                                <Grid item>
                                    <Box>
                                        <CircularProgress />
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                    </Box>
                </Fade>
            </Modal>
            <Modal
                id='modelPop'
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                disablePortal
                disableEnforceFocus
                disableAutoFocus>
                <Fade in={open}>
                    <Box p={3} className={classes.paper}>
                        <Box pb={3}>
                            <Typography style={{ fontSize: 24, color: 'black' }} variant="h3">{props.accommodation.accommodations != undefined && props.accommodation.accommodations.length ? props.accommodation.accommodations[0].name : ""}</Typography>
                            <Box py={1}>
                                <Typography style={{ fontSize: 18, color: '#616161' }} variant="h3">{props.city}</Typography>
                            </Box>
                        </Box>
                        <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Room types</Typography>
                        <Box py={1}></Box>
                        <div className="row" style={{ whiteSpace: "nowrap" }}>
                            {props.accommodation.accommodationImages ? props.accommodation.accommodationImages.map((item, index) => {
                                if (item.imageType.includes('roomType')) {
                                    if (roomTypeId) {
                                        if (countImage == 0 && roomTypeId == item.imageType.split(' ')[1]) {
                                            countImage = 1;
                                            return (
                                                <div key={index} style={{ padding: 4, display: "inline-block" }}>
                                                    <img width={120} height={90} src={item.imageUrl} alt={'image'} />
                                                </div>
                                            )
                                        }
                                    } else {
                                        return (
                                            <div key={index} style={{ padding: 4, display: "inline-block" }}>
                                                <img width={120} height={90} src={item.imageUrl} alt={'image'} />
                                            </div>
                                        )
                                    }
                                }
                            }) : <div />}
                        </div>
                        <Box py={1}></Box>
                        <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Price</Typography>
                        <Box py={1}></Box>
                        <div className="row" style={{ whiteSpace: "nowrap" }}>
                            {props.accommodation.accommodationRooms ? props.accommodation.accommodationRooms.map((item, index) => {
                                if (roomTypeId) {
                                    if (count == 0 && roomTypeId == item.typeId) {
                                        count = 1;
                                        return (
                                            <div key={index} style={{ padding: 4, display: "inline-block" }}>
                                                <Chip key={index} label={`${item.price} ${item.currency}`} />
                                            </div>
                                        )
                                    }
                                } else {
                                    return (
                                        <div key={index} style={{ padding: 4, display: "inline-block" }}>
                                            <Chip key={index} label={`${item.price} ${item.currency}`} />
                                        </div>
                                    )
                                }
                            }) : <div />}
                        </div>
                        <Box py={1}></Box>
                        <Typography style={{ fontSize: 14, color: '#C4C4C4' }} variant="h3">Book a room</Typography>
                        <Box py={1}></Box>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={4}>
                                    <Select options={props.roomTypes.map(i => { return i.name; })} value={options} onChange={(e) => {
                                        setoptions(e.target.value);
                                        if (e.target.value) {
                                            setRoomTypeId(props.roomTypes[e.target.value - 1].typeid);
                                            setRoomTypeName(props.roomTypes[e.target.value - 1].name);
                                        } else {
                                            setRoomTypeId(null);
                                        }
                                    }} />
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <KeyboardDatePicker
                                        inputVariant="outlined"
                                        size="small"
                                        fullWidth
                                        disableToolbar
                                        disablePast
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="none"
                                        id="date-picker-inline"
                                        label="Departure date"
                                        value={selectedDate1}
                                        onChange={handleDateChange1}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <KeyboardDatePicker
                                        inputVariant="outlined"
                                        size="small"
                                        disableToolbar
                                        fullWidth
                                        minDate={selectedDate1}
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="none"
                                        id="date-picker-inline"
                                        label="Checkout date"
                                        value={selectedDate2}
                                        onChange={handleDateChange2}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Box py={2} />
                        <Grid container spacing={2} justify="flex-end">
                            <Grid item>
                                <Button
                                    id="closeBtn"
                                    variant="contained"
                                    color="default"
                                    fullWidth
                                    disableElevation
                                    onClick={() => handleClose()}>
                                    Close
                                </Button>
                            </Grid>
                            <Grid item>
                                {!props.isBooking ? <Button
                                    id="submitBtn"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={roomTypeId == null || selectedDate2 <= selectedDate1 ? true : false}
                                    disableElevation
                                    onClick={() => {
                                        props.bookAccommodationAction({
                                            accommodation: props.accommodation.accommodations[0].name,
                                            name: roomTypeName,
                                            booking: {
                                                tripId: parseInt(props.trip.id),
                                                accommodationId: selectedAccommodation,
                                                roomTypeId: parseInt(roomTypeId),
                                                departureDate: new Date(selectedDate1),
                                                checkoutDate: new Date(selectedDate2)
                                            }
                                        })
                                        setIsBooking(true);
                                    }}>
                                    Submit
                                </Button> : <Box width={99.3} px={3}>
                                        <CircularProgress />
                                    </Box>}
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={props.snackbarMessage.type}>
                    {props.snackbarMessage.message}
                </Alert>
            </Snackbar>
        </Box >
    )
}

export const mapStateToProps = (state) => {
    return {
        accommodations: state.accommodationsReducer.availableAccommodations,
        accommodation: state.accommodationsReducer.accommodation,
        snackbarMessage: state.accommodationsReducer.snackbarMessage,
        userRating: state.accommodationsReducer.userRating,
        roomTypes: state.accommodationsReducer.roomTypes,
        isBooking: state.accommodationsReducer.isBooking,
        userLikes: state.accommodationsReducer.userLikes,
        trip: state.accommodationsReducer.tripInfo,
        city: state.accommodationsReducer.tripInfo.destination,
        accommodationId: state.accommodationsReducer.tripInfo.accommodationId,
        isLoading: state.appReducer.isLoading
    };
};

export default connect(mapStateToProps, {
    getAvailableAccommodationsAction,
    getAccommodationDetailsAction,
    likeAccommodationAction,
    rateAccommodationAction,
    setSnackBarMessageAction,
    getUserRatingsAccommodationAction,
    updateRateAccommodationAction,
    getAccommodationRoomTypeAction,
    bookAccommodationAction,
    getUserLikeStatusAccommodationAction
})(withRouter(Booking));
