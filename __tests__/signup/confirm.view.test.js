import React from 'react';
import { mount } from 'enzyme';
import Confirm from '../../src/views/signup/confirm.view.jsx';

describe('Render confirm view', () => {

    it('should render confirm view successfully', async () => {
        mount(<Confirm />);
    })
})
