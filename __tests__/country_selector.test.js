import React from 'react';
import { mount } from 'enzyme';
import CountrySelector, { countryToFlag } from '../src/components/common/CountrySelector.component';

describe('Render signup view', () => {
    it('should render signup view successfully', () => {
        countryToFlag('AD');
        const wrapper = mount(<CountrySelector onChange={jest.fn()}/>);
        const autocomplete = wrapper.find('#autocomplete');
        autocomplete.first().props().onChange({});
        autocomplete.first().props().onChange({}, { label: 'Rwanda' });
        autocomplete.first().props().getOptionLabel(v => v.label = "jhhfhf");
        autocomplete.first().props().renderOption(v => v = { code: 'AD', label: 'Andorra', phone: '376' });
    });
});