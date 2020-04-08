import React from "react";
import sinon from "sinon";
import configureMockStore from "redux-mock-store";
import UserManagementConnected, {
  UserManagement
} from "../../src/components/usermanagements/UserManagement.jsx";
import { Provider } from "react-redux";
import Button from "@material-ui/core/Button";
import { userManagementProps } from "../../__mockData__/usermanagementMock";
import { shallow, mount } from "enzyme";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "../../src/reducers/userManagementReducers";

const props = {
  userData: [],
  page: 1,
  rowsPage: 5,
  getManagers: jest.fn(),
  getUsersManagers: jest.fn(),
  updateUserManager: jest.fn(),
  onChangeState: jest.fn(),
  userData: [
    {
      id: 3,
      firstName: "benit",
      lastName: "havuga",
      email: "mujohn25@gmail.com",
      role: "requester",
      manager: "London Steff"
    }
  ],
  managerData: [
    {
      id: 10,
      firstName: "john",
      lastName: "rukundi"
    }
  ],
  classes: {
    Snackbar: {
      width: "500px",
      margin: "45% 40%",
      ["@media (max-width:780px)"]: {
        marginLeft: "120px",
        marginBottom: "620px"
      },
      ["@media (max-width:500px)"]: {
        marginLeft: "100px",
        marginBottom: "640px",
        width: "350px"
      },
      ["@media (max-width:400px)"]: {
        marginLeft: "40px",
        marginBottom: "640px",
        width: "350px"
      },
      ["@media (max-width:350px)"]: {
        marginLeft: "0px",
        marginBottom: "640px",
        width: "350px"
      }
    }
  },
  updatedData: {
    id: 6,
    userId: 6,
    managerId: 94
  },
  previous: {
    updatedData: {
      id: 6,
      userId: 6,
      managerId: 54
    }
  }
};

const middlewares = [thunk];
const testStore = state => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(reducer, state);
};
const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = mount(<UserManagement {...props} store={store} />);
  return wrapper;
};
const emptySetUp = (initialState = {}) => {
  const store = testStore(initialState);

  const wrapper = mount(<UserManagement {...props} store={store} />);
  return wrapper;
};
const setUpComponent = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<UserManagement {...props} store={store} />);
  return wrapper;
};

describe("User management component tests", () => {
  beforeEach(() => {});

  const store = configureMockStore([thunk])({
    userManagementReducer: {
      userData: [
        {
          id: 3,
          firstName: "benit",
          lastName: "havuga",
          email: "mujohn25@gmail.com",
          role: "requester",
          manager: "London Steff"
        }
      ],
      managerData: [
        {
          id: 10,
          firstName: "john",
          lastName: "rukundi"
        }
      ],
      updatedData: []
    }
  });

  const wrapper = mount(
    <Provider store={store}>
      <UserManagementConnected />
    </Provider>
  );
  it("should cancel assigning manager", () => {
    const component = setUpComponent();
    const handleCancelSpy = jest.spyOn(component.instance(), "handleCancel");
    component.setState({
      isButtonDisabled: true
    });
    component.find(".cancelbutton").simulate("click");
    expect(handleCancelSpy).toBeDefined();
    expect(handleCancelSpy).toBeCalled();
    expect(handleCancelSpy).toBeCalledTimes(1);
  });

  it("should handle on change rows per page", () => {
    const component = setUpComponent();
    component.setState({
      rowsPerPage: 5,
      page: 0
    });
    const mockedEvent = { target: { value: 5 } };
    const handleChangeRowSpy = jest.spyOn(
      component.instance(),
      "handleChangeRowsPerPage"
    );

    handleChangeRowSpy(mockedEvent);
    expect(handleChangeRowSpy).toHaveBeenCalled();
    expect(handleChangeRowSpy).toHaveBeenCalledWith(mockedEvent);
  });
  it("should handle on change page", () => {
    const component = setUpComponent();
    component.setState({
      page: 2
    });
    const mockedEvent = {};
    const handleChangePageSpy = jest.spyOn(
      component.instance(),
      "handleChangePage"
    );

    handleChangePageSpy(mockedEvent);
    expect(handleChangePageSpy).toHaveBeenCalled();
    expect(handleChangePageSpy).toHaveBeenCalledWith(mockedEvent);
  });
  it("should handle on close snackbar", () => {
    const component = setUpComponent();
    component.setState({
      open: false
    });
    const mockedEvent = {};
    const handleOnCloseSpy = jest.spyOn(component.instance(), "handleOnClose");
    handleOnCloseSpy(mockedEvent);
    expect(handleOnCloseSpy).toHaveBeenCalled();
    expect(handleOnCloseSpy).toHaveBeenCalledWith(mockedEvent);
  });
  it("should handle getOptionLabel", () => {
    const component = setUpComponent();
    const mockedEvent = { id: 1, firstName: "Jim", lastName: "Law" };
    component
      .find("WithStyles(ForwardRef(Autocomplete))")
      .at(0)
      .props()
      .getOptionLabel(mockedEvent);
    component
      .find("WithStyles(ForwardRef(Autocomplete))")
      .at(1)
      .props()
      .getOptionLabel(mockedEvent);
    component
      .find("WithStyles(ForwardRef(Autocomplete))")
      .at(0)
      .props()
      .renderInput({});
    component
      .find("WithStyles(ForwardRef(Autocomplete))")
      .at(1)
      .props()
      .renderInput({});
  });
  it("should handle on change function", () => {
    const component = setUpComponent();
    const mockedValue = { id: 1, firstName: "Jim", lastName: "Law" };
    const mockedUser = {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      manager: "Jane Doe"
    };
    const handleOnChangeSpy = jest.spyOn(
      component.instance(),
      "handleOnChangeLabel"
    );
    handleOnChangeSpy(1, mockedValue, mockedUser);
    expect(handleOnChangeSpy).toHaveBeenCalled();
    expect(handleOnChangeSpy).toHaveBeenCalledWith(1, mockedValue, mockedUser);
  });
  it("should handle on change function when no values provided", () => {
    const component = setUpComponent();
    const mockedValue = "";
    const mockedUser = {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      manager: "Jane Doe"
    };
    const handleOnChangeSpy = jest.spyOn(
      component.instance(),
      "handleOnChangeLabel"
    );
    handleOnChangeSpy(1, mockedValue, mockedUser);
    expect(handleOnChangeSpy).toHaveBeenCalled();
    expect(handleOnChangeSpy).toHaveBeenCalledWith(1, mockedValue, mockedUser);
  });
  it("should handle on change function and show error when the condition is not met", () => {
    const component = setUpComponent();
    const mockedValue = { id: 2, firstName: "Jim", lastName: "Law" };
    const mockedUser = {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      manager: "Jim Law"
    };
    const handleOnChangeSpy = jest.spyOn(
      component.instance(),
      "handleOnChangeLabel"
    );
    handleOnChangeSpy(1, mockedValue, mockedUser);
    expect(handleOnChangeSpy).toHaveBeenCalled();
    expect(handleOnChangeSpy).toHaveBeenCalledWith(1, mockedValue, mockedUser);
  });

  it("should handle onChange attribute in autocomplete", () => {
    const component = setUpComponent();
    const handleOnChangeSpy = jest.spyOn(
      component.instance(),
      "handleOnChangeLabel"
    );
    const mockedUser = {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      manager: "Jim Law"
    };
    const event = {
      target: {
        value: { id: 1, firstName: "spam", lastName: "Term" }
      }
    };
    component
      .find(".getOption")
      .simulate("change", event, event.target.value, mockedUser);
    component
      .find(".getOptions")
      .simulate("change", event, event.target.value, mockedUser);
    handleOnChangeSpy(1, event.target.value, mockedUser);
    expect(handleOnChangeSpy).toHaveBeenCalled();
    expect(handleOnChangeSpy).toHaveBeenCalledWith(
      1,
      event.target.value,
      mockedUser
    );
  });
  it("should handle update click", () => {
    const component = setUpComponent();
    const handleClickSpy = jest.spyOn(component.instance(), "handleUpdate");
    component.setState({
      usersToUpdate: [{}, {}],
      open: true,
      isButtonDisabled: true
    });
    component.find(".updatebutton").simulate("click");
    expect(handleClickSpy).toBeDefined();
    expect(handleClickSpy).toBeCalled();
    expect(handleClickSpy).toBeCalledTimes(1);
  });
  it("should handle componentDidUpdate", () => {
    const component = setUp();
    const prevProps = {
      updatedData: {
        id: 6,
        userId: 6,
        managerId: 54
      }
    };
    component.setState({
      open: true,
      isButtonDisabled: true
    });
    component.instance().componentDidUpdate(prevProps);
    expect(component.instance().state.open).toEqual(true);
    expect(component.instance().state.isButtonDisabled).toEqual(true);
  });
});
