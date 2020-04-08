import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import activateUserAction from '../../src/actions/activateUserAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Signup Actions tests', () => {
    beforeEach(() => {
        moxios.install();
        store.clearActions();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    it('should activate a new user', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: {
                        message: 'User activated successfully',
                    }
                },
            });
        });
        await store.dispatch(activateUserAction('tryhjkfhjlfdshjavbnms'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'MAKEREQUEST', payload: true },
                    { type: 'LOADING', payload: true },
                    { type: 'ACTIVATED_SUCCESS', payload: true },
                    { type: 'ACTIVATE_MESSAGE', payload: 'User activated successfully' },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });

    it('should catch error', async () => {
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
        await store.dispatch(activateUserAction('guhkjlbhgkzxbhjc'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'MAKEREQUEST', payload: true },
                    { type: 'LOADING', payload: true },
                    { type: 'ACTIVATION_ERROR', payload: true },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });
    it('should set error to true', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: {
                    data: {
                        message: 'User activated successfully',
                    }
                },
            });
        });
        await store.dispatch(activateUserAction('guhkjlbhgkzxbhjc'))
            .then(async () => {
                const calledActions = store.getActions();
                expect(calledActions).toEqual([
                    { type: 'MAKEREQUEST', payload: true },
                    { type: 'LOADING', payload: true },
                    { type: 'ACTIVATE_MESSAGE', payload: 'User activated successfully' },
                    { type: 'ACTIVATED_SUCCESS', payload: false },
                    { type: 'LOADING', payload: false }
                ]);
            });
    });
});