import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import reducer from '../../src/reducers/index';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createMount } from '@material-ui/core/test-utils';
import { Booking, mapStateToProps } from '../../src/views/accommodations/booking.view.jsx';

describe('Booking test', () => {

    const props = {
        roomTypeId: 1,
        userRating: 2,
        match: { params: { id: 1 } },
        userLikes: { islike: false },
        isBooking: false,
        trip: {},
        snackbarMessage: { message: '', type: 'warning' },
        roomTypes: [{
            typeid: 1,
            name: 'sdjddj'
        }],
        accommodations: [
            {
                id: 1,
                name: 'Mariott',
                firstImage: 'https://image-example.png'
            }
        ],
        accommodation: {
            accommodations: [
                {
                    id: 5,
                    name: "Marriot Hotel",
                    description: "a hotel",
                    locationId: 120,
                    category: "1",
                    owner: "benit",
                    numberOfRooms: 25,
                    availableRooms: 25,
                    likes: 0,
                    unlikes: 0,
                    averageRate: 4,
                    createdAt: "2020-01-21T10:13:09.739Z",
                    updatedAt: "2020-01-21T10:14:38.903Z"
                }
            ],
            accommodationImages: [
                {
                    id: 1,
                    recordId: 5,
                    imageType: "accomodation",
                    imageUrl: "https://q-cf.bstatic.com/images/hotel/max1024x768/931/93100137.jpg",
                    createdAt: "2020-01-21T10:13:09.767Z",
                    updatedAt: "2020-01-21T10:13:09.767Z"
                },
                {
                    id: 1,
                    recordId: 5,
                    imageType: "roomType 1",
                    imageUrl: "https://q-cf.bstatic.com/images/hotel/max1024x768/931/93100137.jpg",
                    createdAt: "2020-01-21T10:13:09.767Z",
                    updatedAt: "2020-01-21T10:13:09.767Z"
                }
            ],
            accommodationRooms: [
                {
                    id: 3,
                    accomodationId: 5,
                    typeId: 1,
                    price: 200,
                    currency: "francs",
                    status: "available",
                    createdAt: "2020-01-21T10:14:38.876Z",
                    updatedAt: "2020-01-21T10:14:38.876Z"
                }
            ],
            accommodationServices: [
                {
                    id: 1,
                    name: "club",
                    accomodationId: 5,
                    createdAt: "2020-01-21T10:14:38.933Z",
                    updatedAt: "2020-01-21T10:14:38.933Z"
                }
            ],
            accommodationAmenities: [
                {
                    id: 1,
                    name: "breakfast",
                    accomodationId: 5,
                    createdAt: "2020-01-21T10:14:38.954Z",
                    updatedAt: "2020-01-21T10:14:38.954Z"
                }
            ]
        },
        city: "Nairobi",
        accommodationId: 32,
        tripId: "3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2",
        isLoading: false,
        getAvailableAccommodationsAction: jest.fn(),
        getAccommodationDetailsAction: jest.fn(),
        getUserRatingsAccommodationAction: jest.fn(),
        getAccommodationRoomTypeAction: jest.fn(),
        getUserLikeStatusAccommodationAction: jest.fn(),
        rateAccommodationAction: jest.fn(),
        updateRateAccommodationAction: jest.fn(),
        likeAccommodationAction: jest.fn(),
        bookAccommodationAction: jest.fn(),
        setSnackBarMessageAction: jest.fn(),
    }

    const props1 = {
        userRating: 0,
        userLikes: { islike: false },
        isBooking: false,
        trip: {},
        snackbarMessage: { message: 'You have not booked that accomodation', type: 'warning' },
        roomTypes: [],
        accommodations: [],
        accommodation: {},
        city: "Nairobi",
        accommodationId: 32,
        tripId: "3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2",
        isLoading: false,
        getAvailableAccommodationsAction: jest.fn(),
        getAccommodationDetailsAction: jest.fn(),
        getUserRatingsAccommodationAction: jest.fn(),
        getAccommodationRoomTypeAction: jest.fn(),
        getUserLikeStatusAccommodationAction: jest.fn(),
        rateAccommodationAction: jest.fn(),
        updateRateAccommodationAction: jest.fn(),
        likeAccommodationAction: jest.fn(),
    }

    const middlewares = [thunk];
    const testStore = state => {
        const createStoreWithMiddleware = applyMiddleware(...middlewares)(
            createStore,
        );
        return createStoreWithMiddleware(reducer, state);
    };

    const store = testStore({});

    const theme = createMuiTheme({ props: { MuiWithWidth: { initialWidth: 'xs' } } })
    const theme1 = createMuiTheme({ props: { MuiWithWidth: { initialWidth: 'lg' } } })
    const bookingView = shallow(
        <Booking {...props} history={{ push: jest.fn() }} />
    );

    createMount()(
        <MuiThemeProvider theme={theme}>
            <Booking {...props1} history={{ push: jest.fn() }} />
        </MuiThemeProvider>
    );
    const wrapper = createMount()(
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <Booking {...props} history={{ push: jest.fn() }} />
            </Provider>
        </MuiThemeProvider>
    );

    const wrapper1 = createMount()(
        <MuiThemeProvider theme={theme1}>
            <Provider store={store}>
                <Booking {...props} history={{ push: jest.fn() }} />
            </Provider>
        </MuiThemeProvider>
    );

    props.userRating = 0;

    const wrapper0 = createMount()(
        <MuiThemeProvider theme={theme1}>
            <Provider store={store}>
                <Booking {...props} history={{ push: jest.fn() }} />
            </Provider>
        </MuiThemeProvider>
    );

    props.userRating = 0;

    const bookingView1 = shallow(
        <Booking {...props} history={{ push: jest.fn() }} />
    );

    it('should render GridListTile successfully', () => {
        const gridListTile1 = wrapper1.find('WithStyles(ForwardRef(GridListTile))');
        gridListTile1.props().onClick();
        const gridListTile = wrapper.find('WithStyles(ForwardRef(GridListTile))');
        gridListTile.props().onClick();
    });

    it('should rate an accommodation successfully', () => {
        const rating = wrapper1.find('WithStyles(ForwardRef(Rating))').at(1);
        rating.props().onChange('', 2);
        expect(rating.props().value).toEqual(2);
    });

    it('should rate an accommodation successfully', () => {
        const rating = wrapper0.find('WithStyles(ForwardRef(Rating))').at(1);
        rating.props().onChange('', 0);
        expect(rating.props().value).toEqual(0);
    });

    it('should likes clicks', () => {
        const thumb1 = wrapper1.find('WithStyles(ForwardRef(SvgIcon))').at(1);
        thumb1.props().onClick();
        const thumb2 = wrapper1.find('WithStyles(ForwardRef(SvgIcon))').at(0);
        thumb2.props().onClick();

        const thumb3 = bookingView1.dive().find('ThumbUpAltOutlinedIcon').at(1);
        thumb3.props().onClick();
        const thumb4 = bookingView1.dive().find('ThumbDownOutlinedIcon').at(1);
        thumb4.props().onClick();
    });

    it('should modals clicks', () => {
        const modelPop2 = wrapper1.find('#modelPop2');
        modelPop2.props().onClose();
        const bookingBtn = wrapper1.find('#bookingBtn').at(1);
        bookingBtn.props().onClick();
        modelPop2.props().open = true;
        bookingView.dive().find('#rating1').props().onChange({}, 2);
        bookingView1.dive().find('#rating1').props().onChange({}, 2);
        bookingView1.dive().find('#bookingBtn').at(1).props().onClick();
        bookingView1.dive().find('#closeBtn').props().onClick();
        bookingView1.dive().find('#submitBtn').props().onClick();
        bookingView1.dive().find('WithStyles(ForwardRef(Snackbar))').props().onClose();
        bookingView1.dive().find('PickerWithState').at(0).props().onChange();
        bookingView1.dive().find('PickerWithState').at(1).props().onChange();
        bookingView1.dive().find('SelectField').props().onChange({ target: { value: 1 } });
        bookingView1.dive().find('SelectField').props().onChange({ target: { value: null } });
    });

    it('should return state', () => {
        const state = {
            accommodationsReducer: {
                availableAccommodations: [],
                accommodation: {},
                snackbarMessage: {},
                userRating: 0,
                roomTypes: [],
                isBooking: false,
                userLikes: {},
                tripInfo: {},
                destination: '',
                accommodationId: 9,
            },
            appReducer: {
                isLoading: false
            }
        }
        expect(mapStateToProps(state)).toEqual({
            accommodations: [],
            accommodation: {},
            snackbarMessage: {},
            userRating: 0,
            roomTypes: [],
            isBooking: false,
            userLikes: {},
            trip: {},
            city: undefined,
            accommodationId: undefined,
            isLoading: false
        });
    })

});
