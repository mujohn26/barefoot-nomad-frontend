import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
    getAvailableAccommodationsAction,
    getAccommodationCommentsAction,
    rateAccommodationAction,
    getUserRatingsAccommodationAction,
    getUserLikeStatusAccommodationAction,
    likeAccommodationAction,
    getAccommodationRoomTypeAction,
    updateRateAccommodationAction,
    bookAccommodationAction,
    setSnackBarMessageAction,
    setOtherInfoAction,
    selectTripToBookAccommodationAction,
    getAccommodationDetailsAction,
    getAvailableAccommodationsOnDestinationAction
} from '../../src/actions/booking/accommodation.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Booking Actions tests', () => {
    beforeEach(() => {
        moxios.install();
        store.clearActions();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('should get an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: 'get an accommodation is done'
                },
            });
        });
        await store.dispatch(getAvailableAccommodationsAction({ accommodationId: 'tryhjkfhjlfdshjavbnms' }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'LOADING', payload: true },
                    { type: 'GET_AVAILABLE_ACCOMMODATIONS_FAILED', payload: true },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });

    it('should get available accommodations', async () => {
        moxios.wait(() => {
            const request1 = moxios.requests.mostRecent();
            request1.respondWith({
                status: 200,
                response: {
                    data: [{ id: 1 }, { id: 2 }]
                }
            })
        });
        await store.dispatch(getAvailableAccommodationsOnDestinationAction({
            data: {
                data: {
                    accommodations: [
                        {
                            id: 2,
                            name: "marriotte",
                            description: null,
                            locationId: 2,
                            category: null,
                            owner: null,
                            numberOfRooms: 2,
                            availableRooms: 2,
                            likes: 0,
                            unlikes: 0,
                            averageRate: 1,
                            createdAt: "2020-02-02T00:00:00.000Z",
                            updatedAt: "2020-02-02T00:00:00.000Z"
                        }
                    ],
                    accommodationImages: [
                        {
                            id: 1,
                            recordId: 5,
                            imageType: "accomodation",
                            imageUrl: "https://q-cf.bstatic.com/images/hotel/max1024x768/931/93100137.jpg",
                            createdAt: "2020 - 01 - 21T10: 13: 09.767Z",
                            updatedAt: "2020 - 01 - 21T10: 13: 09.767Z"
                        },
                        {
                            id: 2,
                            recordId: 5,
                            imageType: "accomodation",
                            imageUrl: "https://q-cf.bstatic.com/images/hotel/max1024x768/931/931001378.jpg",
                            createdAt: "2020 - 01 - 21T10: 13: 09.785Z",
                            updatedAt: "2020 - 01 - 21T10: 13: 09.785Z"
                        }
                    ],
                    accommodationRooms: [
                        {
                            id: 2,
                            accomodationId: 2,
                            typeId: 2,
                            price: null,
                            currency: null,
                            status: null,
                            createdAt: "2020-02-03T00:00:00.000Z",
                            updatedAt: "2020-02-03T00:00:00.000Z"
                        }
                    ],
                    accommodationServices: [],
                    accommodationAmenities: []
                }
            }
        }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    {
                        type: 'GET_AVAILABLE_ACCOMMODATIONS_SUCCESS',
                        payload: [{
                            id: 1,
                            availableRooms: 2,
                            averageRate: 1,
                            firstImage: "https://q-cf.bstatic.com/images/hotel/max1024x768/931/93100137.jpg",
                            id: 2,
                            name: "marriotte",
                        }, { id: 1 }]
                    },
                    { type: 'LOADING', payload: false },
                    { type: 'LOADING', payload: true },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });

    it('should get available accommodations', async () => {
        moxios.wait(() => {
            const request1 = moxios.requests.mostRecent();
            request1.respondWith({
                status: 200,
                response: {
                    data: [{ id: 1 }, { id: 2 }]
                }
            })
        });
        await store.dispatch(getAvailableAccommodationsOnDestinationAction({
            data: {
                data: {
                    accommodations: [
                        {
                            id: 2,
                            name: "marriotte",
                            description: null,
                            locationId: 2,
                            category: null,
                            owner: null,
                            numberOfRooms: 2,
                            availableRooms: 2,
                            likes: 0,
                            unlikes: 0,
                            averageRate: 1,
                            createdAt: "2020-02-02T00:00:00.000Z",
                            updatedAt: "2020-02-02T00:00:00.000Z"
                        }
                    ],
                    accommodationImages: [
                        {
                            id: 1,
                            recordId: 5,
                            imageType: "roomType",
                            imageUrl: "https://q-cf.bstatic.com/images/hotel/max1024x768/931/93100137.jpg",
                            createdAt: "2020 - 01 - 21T10: 13: 09.767Z",
                            updatedAt: "2020 - 01 - 21T10: 13: 09.767Z"
                        },
                        {
                            id: 2,
                            recordId: 5,
                            imageType: "roomType",
                            imageUrl: "https://q-cf.bstatic.com/images/hotel/max1024x768/931/931001378.jpg",
                            createdAt: "2020 - 01 - 21T10: 13: 09.785Z",
                            updatedAt: "2020 - 01 - 21T10: 13: 09.785Z"
                        }
                    ],
                    accommodationRooms: [
                        {
                            id: 2,
                            accomodationId: 2,
                            typeId: 2,
                            price: null,
                            currency: null,
                            status: null,
                            createdAt: "2020-02-03T00:00:00.000Z",
                            updatedAt: "2020-02-03T00:00:00.000Z"
                        }
                    ],
                    accommodationServices: [],
                    accommodationAmenities: []
                }
            }
        }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    {
                        type: 'GET_AVAILABLE_ACCOMMODATIONS_SUCCESS',
                        payload: [{
                            id: 1,
                            availableRooms: 2,
                            averageRate: 1,
                            firstImage: "",
                            id: 2,
                            name: "marriotte",
                        }, { id: 1 }]
                    },
                    { type: 'LOADING', payload: false },
                    { type: 'LOADING', payload: true },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });

    it('should get available accommodations', async () => {
        moxios.wait(() => {
            const request1 = moxios.requests.mostRecent();
            request1.respondWith({
                status: 200,
                response: {
                    data: [{ id: 67 }, { id: 87 }]
                }
            })
        });
        await store.dispatch(getAvailableAccommodationsOnDestinationAction({
            data: {
                data: {
                    accommodations: [
                        {
                            id: 2,
                            name: "marriotte",
                            description: null,
                            locationId: 2,
                            category: null,
                            owner: null,
                            numberOfRooms: 2,
                            availableRooms: 2,
                            likes: 0,
                            unlikes: 0,
                            averageRate: 1,
                            createdAt: "2020-02-02T00:00:00.000Z",
                            updatedAt: "2020-02-02T00:00:00.000Z"
                        }
                    ],
                    accommodationImages: [
                        {
                            id: 1,
                            recordId: 5,
                            imageType: "accomodation",
                            imageUrl: "https://q-cf.bstatic.com/images/hotel/max1024x768/931/93100137.jpg",
                            createdAt: "2020 - 01 - 21T10: 13: 09.767Z",
                            updatedAt: "2020 - 01 - 21T10: 13: 09.767Z"
                        },
                        {
                            id: 2,
                            recordId: 5,
                            imageType: "accomodation",
                            imageUrl: "https://q-cf.bstatic.com/images/hotel/max1024x768/931/931001378.jpg",
                            createdAt: "2020 - 01 - 21T10: 13: 09.785Z",
                            updatedAt: "2020 - 01 - 21T10: 13: 09.785Z"
                        }
                    ],
                    accommodationRooms: [
                        {
                            id: 2,
                            accomodationId: 2,
                            typeId: 2,
                            price: null,
                            currency: null,
                            status: null,
                            createdAt: "2020-02-03T00:00:00.000Z",
                            updatedAt: "2020-02-03T00:00:00.000Z"
                        }
                    ],
                    accommodationServices: [],
                    accommodationAmenities: []
                }
            }
        }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    {
                        type: 'GET_AVAILABLE_ACCOMMODATIONS_SUCCESS',
                        payload: [{ id: 67 }, { id: 87 }]
                    },
                    { type: 'LOADING', payload: false },
                    { type: 'LOADING', payload: true },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });

    it('should fail to get available accommodations', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    data: {
                        message: 'failed to get available accommodations',
                    }
                },
            });
        });
        await store.dispatch(getAvailableAccommodationsAction({
            booking: {}
        }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'LOADING', payload: true },
                    { type: 'GET_AVAILABLE_ACCOMMODATIONS_FAILED', payload: true },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });

    it('should get trip comments', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: {
                        count: 10,
                        rows: [
                            {
                                id: 212,
                                subjectId: "3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2",
                                subjectType: "trip request",
                                commentorId: 1,
                                comment: "you are late",
                                createdAt: "2020-03-17T12:56:35.310Z",
                                updatedAt: "2020-03-17T12:56:35.310Z",
                                user: {
                                    firstName: "shema",
                                    lastName: "Eric",
                                    email: "ricshamwa@gmail.com",
                                    profileImage: "https://res.cloudinary.com/dby88h516/image/upload/v1582186691/barefootnomad/xofw7tqgbrl9zyozry5h.jpg"
                                }
                            }
                        ]
                    }
                },
            });
        });
        await store.dispatch(getAccommodationCommentsAction('tryhjkfhjlfdshjavbnms'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'LOADING', payload: true },
                    {
                        type: 'GET_TRIP_REQUESTS_COMMENTS_SUCCESS',
                        payload: {
                            count: 10, rows: [
                                {
                                    id: 212,
                                    subjectId: "3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2",
                                    subjectType: "trip request",
                                    commentorId: 1,
                                    comment: "you are late",
                                    createdAt: "2020-03-17T12:56:35.310Z",
                                    updatedAt: "2020-03-17T12:56:35.310Z",
                                    user: {
                                        firstName: "shema",
                                        lastName: "Eric",
                                        email: "ricshamwa@gmail.com",
                                        profileImage: "https://res.cloudinary.com/dby88h516/image/upload/v1582186691/barefootnomad/xofw7tqgbrl9zyozry5h.jpg"
                                    }
                                }
                            ]
                        }
                    },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });

    it('should fail to get trip comments', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    data: {
                        message: 'User activated successfully',
                    }
                },
            });
        });
        await store.dispatch(getAccommodationCommentsAction('tryhjkfhjlfdshjavbnms'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'LOADING', payload: true },
                    { type: 'GET_ACCOMMODATION_FAILED', payload: true },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });

    it('should rate an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: {
                        message: 'rate is done'
                    }
                },
            });
        });
        await store.dispatch(rateAccommodationAction({ id: 'tryhjkfhjlfdshjavbnms', rate: 2 }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    {
                        type: 'RATE_ACCOMMODATION_SUCCESS',
                        payload: { message: 'rate is done' }
                    }
                ]);
            });
    });

    it('should fail to rate an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    data: {
                        message: 'failed to rate accommodation',
                    }
                },
            });
        });
        await store.dispatch(rateAccommodationAction({ id: 'tryhjkfhjlfdshjavbnms', rate: 2 }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    {
                        type: 'SHOW_SNACKBAR',
                        payload: {
                            message: 'You have not booked that accomodation',
                            type: 'warning'
                        }
                    }
                ]);
            });
    });

    it('should get user ratings of an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: {
                        message: 'rate is done'
                    }
                },
            });
        });
        await store.dispatch(getUserRatingsAccommodationAction('tryhjkfhjlfdshjavbnms'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([{ type: 'USER_RATING_ACCOMMODATION_SUCCESS', payload: undefined }]);
            });
    });

    it('should fail to get user ratings of an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    data: {
                        message: 'failed to rate accommodation',
                    }
                },
            });
        });
        await store.dispatch(getUserRatingsAccommodationAction('tryhjkfhjlfdshjavbnms'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([{ type: 'USER_RATING_ACCOMMODATION_SUCCESS', payload: 0 }]);
            });
    });

    it('should get user ratings of an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: {
                        message: 'like is done'
                    }
                },
            });
        });
        await store.dispatch(likeAccommodationAction({ id: 'tryhjkfhjlfdshjavbnms', isLike: true }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    {
                        type: 'LIKE_ACCOMMODATION_SUCCESS',
                        payload: { message: 'like is done' }
                    }
                ]);
            });
    });

    it('should fail to get user ratings of an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    data: {
                        message: 'failed to like accommodation',
                    }
                },
            });
        });
        await store.dispatch(likeAccommodationAction({ id: 'tryhjkfhjlfdshjavbnms', isLike: true }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'LIKE_ACCOMMODATION_FAILED', payload: true },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });

    it('should get user ratings of an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: {
                        message: 'get user likes of an accommodation',
                    }
                },
            });
        });
        await store.dispatch(getUserLikeStatusAccommodationAction('tryhjkfhjlfdshjavbnms'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    {
                        type: 'USER_LIKES_UNLIKES_ACCOMMODATION_SUCCESS',
                        payload: { islike: undefined }
                    }
                ]);
            });
    });

    it('should accommodation room types', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: {
                        message: 'get accommodation room types is done',
                    }
                },
            });
        });
        await store.dispatch(getAccommodationRoomTypeAction('tryhjkfhjlfdshjavbnms'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    {
                        type: 'ROOM_TYPES_SUCCESS',
                        payload: { message: 'get accommodation room types is done' }
                    }
                ]);
            });
    });

    it('should update rate of an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: {
                        message: 'update rate of an accommodation is done',
                    }
                },
            });
        });
        await store.dispatch(updateRateAccommodationAction({
            item: {
                id: 9
            },
            rate: 3
        }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    {
                        type: 'RATE_ACCOMMODATION_SUCCESS',
                        payload: { id: 9, averageRate: undefined }
                    },
                    { type: 'USER_RATING_ACCOMMODATION_SUCCESS', payload: 3 }
                ]);
            });
    });

    it('should fail to get user ratings of an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    data: {
                        message: 'failed to update rate of an accommodation',
                    }
                },
            });
        });
        await store.dispatch(updateRateAccommodationAction({
            item: {
                id: 9
            },
            rate: 3
        }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([{ type: 'RATE_ACCOMMODATION_FAILED', payload: true }]);
            });
    });

    it('should book an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: {
                        message: 'book an accommodation is done',
                    }
                },
            });
        });
        await store.dispatch(bookAccommodationAction({
            booking: {}
        }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'IS_BOOKING', payload: true },
                    {
                        type: 'UPDATE_TRIP_BOOKING_INFO',
                        payload: {
                            id: undefined,
                            accomodation: undefined,
                            roomid: undefined,
                            name: undefined
                        }
                    },
                    {
                        type: 'SHOW_SNACKBAR',
                        payload: { message: undefined, type: 'success' }
                    },
                    { type: 'IS_BOOKING', payload: false }
                ]);
            });
    });

    it('should fail to book an accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    data: {
                        message: 'failed to book an accommodation',
                    }
                },
            });
        });
        await store.dispatch(bookAccommodationAction({
            booking: {}
        }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'IS_BOOKING', payload: true },
                    {
                        type: 'SHOW_SNACKBAR',
                        payload: {
                            message: "There's no rooms available for accommodation facility provided.",
                            type: 'warning'
                        }
                    },
                    { type: 'IS_BOOKING', payload: false }
                ]);
            });
    });

    it('should get an accommodation details', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: {
                        message: 'get an accommodation details is done',
                    }
                },
            });
        });
        await store.dispatch(getAccommodationDetailsAction({
            booking: {}
        }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'LOADING', payload: true },
                    {
                        type: 'GET_ACCOMMODATION_SUCCESS',
                        payload: { message: 'get an accommodation details is done' }
                    },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });

    it('should fail to get an accommodation details', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 409,
                response: {
                    data: {
                        message: 'failed to get an accommodation details',
                    }
                },
            });
        });
        await store.dispatch(getAccommodationDetailsAction({
            booking: {}
        }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'LOADING', payload: true },
                    { type: 'GET_ACCOMMODATION_FAILED', payload: true },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });

    it('should set snackbar message', () => {
        store.dispatch(setSnackBarMessageAction('Message'));
        const calledActions = store.getActions();
        expect(calledActions).toEqual([{ type: 'SHOW_SNACKBAR', payload: 'Message' }]);

    });

    it('should set otherInfo', () => {
        store.dispatch(setOtherInfoAction('Message'));
        const calledActions = store.getActions();
        expect(calledActions).toEqual([{ type: 'SET_OTHER_INFO', payload: 'Message' }]);
    });

    it('should set otherInfo', () => {
        store.dispatch(selectTripToBookAccommodationAction('Message'));
        const calledActions = store.getActions();
        expect(calledActions).toEqual([{ type: 'SELECT_TRIP', payload: 'Message' }]);
    });
});