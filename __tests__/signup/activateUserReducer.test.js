import activateUserReducer from '../../src/reducers/activateUserReducer';

describe('Activate user reducer tests', () => {
    it('shoult activate user', () => {
        const result = activateUserReducer({ isActivated: false, activateMessage: '', activationFailed: false, hasRequestMade: false }, {type: "ACTIVATE_MESSAGE", payload: 'User activated successfully'});
        expect(result).toEqual({
            isActivated: false,
            activateMessage: 'User activated successfully',
            activationFailed: false,
            hasRequestMade: false
          });
        const result1 = activateUserReducer({isActivated: false, activateMessage: '', activationFailed: false, hasRequestMade: false }, {type: "ACTIVATED_SUCCESS", payload: true});
          expect(result1).toEqual({
            isActivated: true,
            activateMessage: '',
            activationFailed: false,
            hasRequestMade: false
          });
          const result2 = activateUserReducer({isActivated: false, activateMessage: '', activationFailed: false, hasRequestMade: false }, {type: "ACTIVATION_ERROR", payload: true});
          expect(result2).toEqual({
            isActivated: false,
            activateMessage: '',
            activationFailed: true,
            hasRequestMade: false
          });
          const result3 = activateUserReducer({isActivated: false, activateMessage: '', activationFailed: false, hasRequestMade: false }, {type: "MAKEREQUEST", payload: true});
          expect(result3).toEqual({
            isActivated: false,
            activateMessage: '',
            activationFailed: false,
            hasRequestMade: true
          });
    })
})
