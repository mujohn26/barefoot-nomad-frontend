import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from '../../src/views/signin.view';
import { props } from '../../__mockData__/signin-mock-data';

describe('Login component tests', () => {
    it('should render Login view page successfully', () => {
        const wrapper = shallow(<SignIn {...props}/>);
        expect(wrapper.find('div').length).toBe(1);
    })
})