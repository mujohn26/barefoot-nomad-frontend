import React from 'react';
import { mount } from 'enzyme';
import SelectField from '../../src/components/common/Select.component.jsx';

describe('Render signup view', () => {
    it('should render signup view successfully', () => {
        const wrapper = mount(<SelectField options={["One", "Two"]} onChange={jest.fn()} value="One" />);
    });
});