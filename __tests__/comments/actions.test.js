import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { deleteTripRequestCommentAction, getTripRequestCommentsAction, saveTripRequestCommentAction, getMoreTripRequestCommentsAction } from '../../src/actions/requests/commentsAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Trip request comments actions tests', () => {
    beforeEach(() => {
        moxios.install();
        store.clearActions();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    it('should get all trip request comments', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: [
                        {
                            "id": 126,
                            "subjectId": "3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2",
                            "subjectType": "trip request",
                            "commentorId": 94,
                            "comment": "Good evening!",
                            "createdAt": "2020-02-27T21:48:43.142Z",
                            "updatedAt": "2020-02-27T21:48:43.142Z",
                            "user": {
                                "firstName": "Nsengimana",
                                "lastName": "Dominique",
                                "email": "nsengimanavedadom@gmail.com",
                                "profileImage": "https://lh3.googleusercontent.com/a-/AAuE7mDhdixQDLxzUVhrT7iqdBN4bwYI6WzjgAyyAS-5"
                            }
                        }
                    ]
                },
            });
        });
        await store.dispatch(getTripRequestCommentsAction('kjkjkkjk'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions[0]).toEqual({ "payload": true, "type": "LOADING" });
            });
    });
    it('should get more trip request comments on scroll', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: [
                        {
                            "id": 126,
                            "subjectId": "3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2",
                            "subjectType": "trip request",
                            "commentorId": 94,
                            "comment": "Good evening!",
                            "createdAt": "2020-02-27T21:48:43.142Z",
                            "updatedAt": "2020-02-27T21:48:43.142Z",
                            "user": {
                                "firstName": "Nsengimana",
                                "lastName": "Dominique",
                                "email": "nsengimanavedadom@gmail.com",
                                "profileImage": "https://lh3.googleusercontent.com/a-/AAuE7mDhdixQDLxzUVhrT7iqdBN4bwYI6WzjgAyyAS-5"
                            }
                        }
                    ]
                },
            });
        });
        await store.dispatch(getMoreTripRequestCommentsAction('kjkjkkjk'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions[0]).toEqual({ "payload": true, "type": "LOADING" });
            });
    });
    it('should catch error when it failed to get all trip request comments', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {
                    data: { message: 'Failed!' }
                },
            });
        });
        await store.dispatch(getTripRequestCommentsAction('jkjkjkjkjk'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions[0]).toEqual({ "payload": true, "type": "LOADING" });
            });
    });
    it('should catch error when it failed to get nore trip request comments on scroll', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {
                    data: { message: 'Failed!' }
                },
            });
        });
        await store.dispatch(getMoreTripRequestCommentsAction('jkjkjkjkjk'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions[0]).toEqual({ "payload": true, "type": "LOADING" });
            });
    });
    it('should save trip request comment', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: { message: 'Saved' }
                },
            });
        });
        await store.dispatch(saveTripRequestCommentAction({ comment: 'kjkjkkjk' }))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions[0]).toEqual({ "payload": true, "type": "LOADING" });
            });
    });
    it('should catch error when it failed to save request comments', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {
                    data: { message: 'Failed!' }
                },
            });
        });
        await store.dispatch(saveTripRequestCommentAction('jkjkjkjkjk'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions[0]).toEqual({ "payload": true, "type": "LOADING" });
            });
    });
    it('should delete trip request comment', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: { message: 'Saved' }
                },
            });
        });
        await store.dispatch(deleteTripRequestCommentAction(123))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions[0]).toEqual({ "payload": true, "type": "LOADING" });
            });
    });
    it('should catch error when it failed to save request comments', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {
                    data: { message: 'Failed!' }
                },
            });
        });
        await store.dispatch(deleteTripRequestCommentAction('jkjkjkjkjk'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions[0]).toEqual({ "payload": true, "type": "LOADING" });
            });
    });
});