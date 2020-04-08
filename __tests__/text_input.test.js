import React from 'react';
import { mount } from 'enzyme';
import TextInput from '../src/components/common/TextInput.component';

describe('Render signup view', () => {
    it('should render signup view successfully', () => {
        const wrapper = mount(<TextInput required={undefined}/>);
    });
});