import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../src/components/common/footer';

describe('Render footer component', () => {
    it('should render the Footer component successfully', () => {
        const wrapper = shallow(<Footer/>);
        expect(wrapper.find('Footer').length).toBe(0);
    })
})
