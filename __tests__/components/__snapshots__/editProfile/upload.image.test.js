import React from 'react';
import { shallow } from 'enzyme';
import UploadImage from '../../../../src/components/templates/UploadImage';
describe('upload image', () => {
	it('should upload image on cloude', () => {
		const wrapper = shallow(<UploadImage uploadImage={jest.fn()} />);
		expect(wrapper).toMatchSnapshot();
	});
});
