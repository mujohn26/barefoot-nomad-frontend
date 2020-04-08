import React from 'react';
import {
	Profile,
	mapStateToProps,
} from '../../../../src/components/profile/Profile';

import { props } from '../../../../__mockData__/redux-mock-data';

import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../../../../src/reducers/user.profile.reducer';
const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
const setUp = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = mount(<Profile {...props} store={store} />);
	return wrapper;
};
const setUpComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = shallow(<Profile {...props} store={store} />);
	return wrapper;
};

describe('Update user profile components', () => {
	it('should handle handleChange successfully', () => {
		const initState = {
			userProfileReducer: { UpdateduserProfileInfo: '' },
		};
		expect(mapStateToProps(initState)).toBeDefined();
	});
	it('should handle on change event of firstName textfield', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
		component.find('#firstName').simulate('change', { target: { value: '' } });
		expect(handleChangeSpy).toBeDefined();
		component
			.find('#firstName')
			.simulate('change', { target: { value: 'shema' } });
		expect(handleChangeSpy).toBeDefined();
		expect(handleChangeSpy).toHaveBeenCalled();
	});

	it('should handle on change event of lastName textfield', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
		component
			.find('#lastName')
			.simulate('change', { target: { value: 'shema' } });
		expect(handleChangeSpy).toBeDefined();
		component.find('#lastName').simulate('change', { target: { value: '' } });
		expect(handleChangeSpy).toBeDefined();
		expect(handleChangeSpy).toHaveBeenCalled();
	});
	it('should handle on change event of department textfield', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
		component
			.find('#department')
			.simulate('change', { target: { value: 'shema' } });
		expect(handleChangeSpy).toBeDefined();
		expect(handleChangeSpy).toHaveBeenCalled();
	});
	it('should handle on change event of birthdate textfield', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
		component
			.find('#birthdate')
			.simulate('change', { target: { value: 'shema' } });
		expect(handleChangeSpy).toBeDefined();
		expect(handleChangeSpy).toHaveBeenCalled();
	});
	it('should handle on change event of place textfield', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
		component
			.find('#place')
			.simulate('change', { target: { value: 'Rwanda' } });
		expect(handleChangeSpy).toBeDefined();
		expect(handleChangeSpy).toHaveBeenCalled();
	});
	it('should handle on change event of preferred currency textfield', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
		component
			.find('#preferredcurrency')
			.simulate('change', { target: { value: 'RWF' } });
		expect(handleChangeSpy).toBeDefined();
		expect(handleChangeSpy).toHaveBeenCalled();
	});
	it('should handle on change event of autocomplete(country) component', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'autoCompliteHandleChange',
		);
		handleChangeSpy({}, { label: 'country' }, 'country');
	});
	it('should handle on change event of autocomplete(languge) component', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'autoCompliteHandleChange',
		);
		component.setState({ firstName: true });
		handleChangeSpy({}, { label: 'language' }, 'kinyarwanda');
	});

	it('should handle on change event of app notification and email notification switch', () => {
		const component = setUp();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'switchHandleChange',
		);

		component
			.find('#appNotification')
			.at(4)
			.simulate('change', 'appNotification');
		expect(handleChangeSpy).toBeDefined();
		expect(handleChangeSpy).toHaveBeenCalled();
	});

	it('should upload Image', () => {
		const component = setUp();
		const handleChangeSpy = jest.spyOn(component.instance(), 'uploadUserImage');
		const e = {
			target: {
				files: [
					{
						name: 'Screen Shot 2020-02-12 at 21.46.06.png',
						lastModified: 1581536771644,
						webkitRelativePath: '',
						size: 167933,
						type: 'image/png',
					},
				],
			},
		};
		component.find('[data-test="upload-btn"]').simulate('change', e);
		expect(handleChangeSpy).toBeDefined();
	});
	it('should fail to upload an Image', () => {
		const component = setUp();
		const handleChangeSpy = jest.spyOn(component.instance(), 'uploadUserImage');
		const e = {};
		component.setProps({ UpdateduserProfileInfo: { errorMessage: true } });
		component.find('[data-test="upload-btn"]').simulate('change', e);
		expect(handleChangeSpy).toBeDefined();
	});

	it('should handle cancel event  successfully', () => {
		const component = setUpComponent();
		const cancelBtn = component.find('#cancel');
		cancelBtn.simulate('click');
		const buttonState = component.state().buttonState;
		expect(buttonState).toBe(true);
	});
	it('should handle update event successfully', () => {
		const component = setUpComponent();
		const updateBtn = component.find('#update');
		updateBtn.simulate('click');
		component.setProps({ UpdateduserProfileInfo: { updateStatus: true } });
		const buttonState = component.state().buttonState;
		expect(buttonState).toBe(true);
	});
});
