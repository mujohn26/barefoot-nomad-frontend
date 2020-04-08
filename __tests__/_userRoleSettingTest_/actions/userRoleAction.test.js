import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  GET_USERS,
  SETTING_ROLES_SUCESS,
  updateUserRole,
  getUsers,
  updateOneUser
} from "../../../src/actions/UserRoleSettingAction";
import moxios from "moxios";
import axios from "axios";
import expect from "expect";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("User role setting  actions", () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  it("should update role to users ", async () => {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjZAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjQsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE1ODI2MzgxOTIsImV4cCI6MTU4MjcyNDU5Mn0.mRSCy6s7kM4a93VOiJKx5voW70pScyUzDwqbP10QBo4"
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "User Role successfully updated",
          data: {
            data: {
              role: "manager"
            }
          }
        }
      });
    });

    const expectedActions = [
      {
        type: "LOADING",
        payload: true
      },
      {
        type: SETTING_ROLES_SUCESS,
        role: [
          {
            role: undefined,
            userId: 92
          }
        ]
      },
      {
        type: "LOADING",
        payload: false
      }
    ];

    const store = mockStore({});
    await store
      .dispatch(updateUserRole({ userId: 92, role: "Manager" }))
      .then(async () => {
        const result = store.getActions();

        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it("should display error when role is not supported", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 401,
        response: {
          data: {
            status: 401,
            error: "We dont support that role"
          }
        }
      });
    });
    const expectedActions = [
      {
        payload: true,
        type: "LOADING"
      },
      {
        updateErrorMessage: "We dont support that role",
        type: "SETTING_FAILURE"
      },
      {
        payload: false,
        type: "LOADING"
      }
    ];

    const store = mockStore({});
    await store
      .dispatch(updateUserRole({ userId: 3, role: "admin123454" }))
      .then(async () => {
        const result = store.getActions();
        expect(result).toEqual(expectedActions);
      });
  });

  it("should send get users", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        users: {
          userId: 1
        },
        response: {
          status: 200,
          message: "Users",
          data: {
            data: {
              role: [
                {
                  id: 6,
                  firstName: "murengezi",
                  lastName: "pierre",
                  email: "ericshema14@gmail.com",
                  role: "requester",
                  createdAt: "2020-01-28T10:46:00.472Z",
                  updatedAt: "2020-02-19T21:12:35.403Z"
                }
              ]
            }
          }
        }
      });
    });
    const expectedActions = [
      {
        payload: true,
        type: "LOADING_DATA"
      },
      {
        payload: [
          {
            id: 6,
            firstName: "murengezi",
            lastName: "pierre",
            email: "ericshema14@gmail.com",
            role: "requester",
            createdAt: "2020-01-28T10:46:00.472Z",
            updatedAt: "2020-02-19T21:12:35.403Z"
          }
        ],
        type: "GET_USERS"
      },
      {
        payload: false,
        type: "LOADING_DATA"
      }
    ];
    const store = mockStore({});
    await store.dispatch(getUsers()).then(async () => {
      const result = store.getActions();
      expect(result[0]).toEqual({ type: "LOADING_DATA", payload: true });
    });
  });
  it("should get one user", async () => {
    const expectedActions = [
      {
        updatedUsers: [
          { id: 3, role: "manager" },
          { id: 5, role: "requester" },
          { id: 15, role: "admin" }
        ],
        type: "GET_ONE_UPDATE"
      }
    ];
    const allUsers = [
      { id: 3, role: "manager" },
      { id: 5, role: "requester" },
      { id: 15, role: "admin" }
    ];
    const userInfo = [{ id: 3, role: "manager" }];
    const store = mockStore({});
    await store.dispatch(updateOneUser(userInfo, allUsers));
    const result = store.getActions();

    expect(result).toEqual(expectedActions);
  });
  it("should get one user with the same data", async () => {
    const expectedActions = [
      {
        updatedUsers: [{ id: 3, role: "manager" }],
        type: "GET_ONE_UPDATE"
      }
    ];
    const allUsers = [{ id: 3, role: "manager" }];
    const userInfo = { id: 3, role: "manager" };
    const store = mockStore({});
    await store.dispatch(updateOneUser(userInfo, allUsers));
    const result = store.getActions();
    expect(result).toEqual(expectedActions);
  });
});
