import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { signIn, history, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE } from '../../src/actions/signInAction'
import { logout } from '../../src/actions/logoutAction'
import moxios from 'moxios'
import axios from 'axios'
import expect from 'expect' 
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('Sign In  actions', () => {
  beforeEach(() => {
        moxios.install(axios);
      })
  afterEach(() => {
    moxios.uninstall(axios);
  })
  it('should login the user when email is registered and password is correct', async() => {
    moxios.wait(()=>{
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response:{
                status: 200, 
                message: "user has logged in successfully", 
                data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…2OTl9.qXCLeAzSBOBN3AYa0x6t-Ncisbo2qX3me6lZquJWHfM"
            }})
    });
    const expectedActions = [
      { type: USER_SIGNIN_SUCCESS,
        user: {
            status: 200, 
            message: "user has logged in successfully", 
            data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…2OTl9.qXCLeAzSBOBN3AYa0x6t-Ncisbo2qX3me6lZquJWHfM"
        }},
    ]
    const store = mockStore({})
     return store.dispatch(signIn('jajabenit@gmail.com', '0788787273')).then(() => {
      expect(store.getActions())
    })

  });
  it('should not login the user when password is wrong', async() => {
    moxios.wait(()=>{
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 404,
            response:{ 
                status: 404, 
                error: "Email or password does not match"
            }})
    });
    const expectedActions = [
      { type: USER_SIGNIN_FAILURE,
        error: {status: 404, 
            error: "Email or password does not match"}},
    ]
    const store = mockStore({})
     return store.dispatch(signIn('jajabenit@gmail.com', '078878727333')).catch(() => {
      expect(store.getActions())
    })
  });
  it('should logout the user', async() => {
    const store = mockStore({})
     return store.dispatch(logout())
    })
})