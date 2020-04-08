import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import expect from "expect";
import * as actions from "../../src/actions/tripStatsActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("User trip statistics actions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it("should fetch the number of trip created by a user", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            data: {
              totalTrips: 56,
              details: [
                {
                  tripType: "multi-city",
                  count: 1
                },
                {
                  tripType: "one way",
                  count: 50
                },
                {
                  tripType: "round trip",
                  count: "5"
                }
              ]
            }
          }
        }
      });
    });
    const expectedActions = [
      {
        type: "GET_STATS",
        payload: {
          data: {
            totalTrips: 56,
            details: [
              {
                tripType: "multi-city",
                count: 1
              },
              {
                tripType: "one way",
                count: 50
              },
              {
                tripType: "round trip",
                count: "5"
              }
            ]
          }
        }
      }
    ];
    const store = mockStore({ statistics: {} });
    return store.dispatch(actions.getStats("2020-3-13")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
