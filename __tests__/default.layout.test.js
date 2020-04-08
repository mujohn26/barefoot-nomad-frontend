import React from 'react';
import { mount } from 'enzyme';
import DefaultLayout from '../src/layouts/default.layout.jsx';

describe('Render default layout', () => {
        it('should render default layout successfully', () => {
                const wrapper = mount(<DefaultLayout />);
        })
})
