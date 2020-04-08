import React from 'react';
import { mount } from 'enzyme';
import { countryToFlag } from '../../../../src/components/templates/CountrySelect';
import CountrySelector from '../../../../src/components/templates/CountrySelect';
describe('Country component', () => {
	it('should render country selector component', () => {
		countryToFlag('AD');
		expect(countryToFlag(undefined)).toBe(undefined);
		const wrapper = mount(<CountrySelector handleChange={jest.fn()} />);
		const country_select = wrapper.find('#country_select');
		country_select
			.first()
			.props()
			.onChange({});
		country_select
			.first()
			.props()
			.onChange({}, { label: 'Rwanda' });
		country_select
			.first()
			.props()
			.getOptionLabel(v => (v.label = 'jhhfhf'));
		country_select
			.first()
			.props()
			.renderOption(v => (v = { code: 'AD', label: 'Andorra', phone: '376' }));
	});
});
