import React from 'react';
import { shallow, mount } from 'enzyme';
import SocialAuth from '../../src/components/auth/SocialLogin';

describe('Social Login component tests', () => {
	it('should render SocialLogin component successfully', () => {
		const wrapper = mount(<SocialAuth />);
		expect(wrapper.find('div').length).toBe(6);
	});
});
