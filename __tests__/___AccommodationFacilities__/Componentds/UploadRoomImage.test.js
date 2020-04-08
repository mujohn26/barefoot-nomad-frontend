import React from 'react';
import { shallow,mount } from 'enzyme';
import UploadImage from '../../../src/components/Accommodations/UploadImage.jsx';
import {UploadRoomImage} from '../../../src/components/Accommodations/UploadRoomImage.jsx';

describe('upload images', () => {
	it('should upload accommodation image on cloud', () => {
		const wrapper = shallow(<UploadImage uploadAccommodationImage={jest.fn()} />);
		expect(wrapper).toMatchSnapshot();
    });
    it('should upload room image on cloud', () => {
		const wrapper2 = shallow(<UploadRoomImage HandleUploadRoomImage={jest.fn()} />);
		expect(wrapper2).toMatchSnapshot();
    });
    it('should upload room image on cloud', () => {
        const wrapper2 = mount(<UploadRoomImage HandleUploadRoomImage={jest.fn()}  cardClicked={jest.fn()} />);
        const upload_image = wrapper2.find('[data-test="upload-btn"]');
		upload_image
			.first()
			.props()
			.onChange({}, {});

    })
    it('should upload accommodation image on cloud', () => {
        const wrapper2 = mount(<UploadImage uploadAccommodationImage={jest.fn()}  />);
        const upload_image = wrapper2.find('[data-test="upload-btn"]');
		upload_image
			.first()
			.props()
			.onChange({}, {});

    })

	// });
});
