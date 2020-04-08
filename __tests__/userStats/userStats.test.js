import React from "react";
import sinon from "sinon";
import configureMockStore from "redux-mock-store";
import UserStatistics, {
  mapThroughTripTypes
} from "../../src/components/UserStatistics.jsx";
import { Provider } from "react-redux";
import Button from "@material-ui/core/Button";
import { shallow, mount } from "enzyme";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "../../src/reducers/tripStatisticsReducer";

const props = {
  handleDateChange: jest.fn()
};

const middlewares = [thunk];
const testStore = state => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(reducer, state);
};

const setUpComponent = (
  initialState = {
    tripStatisticsReducer: {
      statistics: {}
    }
  }
) => {
  const store = testStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <UserStatistics />
    </Provider>
  );
  return wrapper;
};
const setUp = (
  initialState = {
    tripStatisticsReducer: {
      statistics: {
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
            count: 5
          }
        ]
      }
    }
  }
) => {
  const store = testStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <UserStatistics {...props} />
    </Provider>
  );
  return wrapper;
};

describe("User management component tests", () => {
  beforeEach(() => {});

  const store = configureMockStore([thunk])({
    userManagementReducer: {
      statistics: {}
    }
  });

  it("should mount <UserStatistics /> with all data and without errors", () => {
    const component = setUp();
    expect(component.find("ForwardRef(Grid)").length).toBeGreaterThan(1);
  });
  it("should mount <UserStatistics /> without all data and without errors", () => {
    const component = setUpComponent();
    expect(component.find("ForwardRef(Grid)").length).toBeGreaterThan(1);
  });
  it("should map through the details to get all trip types", () => {
    const mockedDetails = [
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
    ];
    const returnedDetails = mapThroughTripTypes(mockedDetails);
    expect(returnedDetails).toBe(mockedDetails);
  });
  it("should map through the details to get all trip types and return 0 if no trips", () => {
    const mockedEmptyDetails = [];
    const returnedEmptyDetails = mapThroughTripTypes(mockedEmptyDetails);
    expect(returnedEmptyDetails).toBe(mockedEmptyDetails);
  });

  it("should set the password value on change event with trim", () => {
    const component = setUpComponent();
    component
      .find("PickerWithState")
      .at(0)
      .props()
      .onChange(new Date());
    expect(
      component
        .find("PickerWithState")
        .at(0)
        .props("value").value
    ).toEqual("2020-03-13");
  });
});
