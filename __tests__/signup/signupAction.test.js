import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import signupAction, { setErrorAction } from "../../src/actions/signupAction";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe("Signup Actions tests", () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it("should create a new user", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: "User created successfully"
        }
      });
    });
    await store
      .dispatch(
        signupAction({
          values: {
            firstName: "firstName",
            lastName: "lastName",
            email: "ertyiouytr@gmail.com",
            country: "country",
            password: "password"
          }
        })
      )
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual([
          { type: "LOADING", payload: true },
          { type: "SIGNUP_ERROR", payload: "" },
          { type: "LOADING", payload: false },
          { type: "SIGNUP_SUCCESS", payload: true }
        ]);
      });
  });

  it("should catch error", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: {
          message: "Provided email is already registered"
        }
      });
    });
    await store
      .dispatch(
        signupAction({
          values: {
            firstName: "firstName",
            lastName: "lastName",
            email: "ertyiouytr@gmail.com",
            country: "country",
            password: "password"
          }
        })
      )
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual([
          { type: "LOADING", payload: true },
          { type: "SIGNUP_ERROR", payload: undefined },
          { type: "LOADING", payload: false }
        ]);
      });
  });
  it("should set error to true", async () => {
    await store.dispatch(setErrorAction(true));
    const calledActions = store.getActions();
    expect(calledActions).toEqual([{ type: "SIGNUP_ERROR", payload: true }]);
  });
});
