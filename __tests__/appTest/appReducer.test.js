import appReducer from '../../src/reducers/appReducer';

describe('App reducer tests', () => {
    it('shoult set isLoading to true', () => {
        const result = appReducer({isLoading: false}, {type: "LOADING", payload: true});
        expect(result).toEqual({isLoading: true});
    })
    it('shoult set isLoading to false', () => {
        appReducer(undefined, {type: "ACTIVE", payload: true});
        const result = appReducer({isLoading: false}, {type: "ACTIVE", payload: true});
        expect(result).toEqual({isLoading: false});
    })
})
