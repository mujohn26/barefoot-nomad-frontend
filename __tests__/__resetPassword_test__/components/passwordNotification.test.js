import React from 'react';
import { shallow} from 'enzyme';
import ResetNofitication from '../../../src/components/password/passwordNotification';
import  {ResetNofiticationSucess} from '../../../src/components/password/passwordNotification';

describe('Render welcome app component', () => {
    it('should render the  redux component successfully', () => {
        const wrapper = shallow(<ResetNofitication />); 
        expect(wrapper.find('div').length).toBe(1); 

    })
    it('should render the  reset notification successfully component successfully', () => {
        const wrapper = shallow(<ResetNofiticationSucess />); 
        expect(wrapper.find('div').length).toBe(1); 

    })
})