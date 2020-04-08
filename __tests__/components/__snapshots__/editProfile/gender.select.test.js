import React from 'react';
import { mount } from 'enzyme';
import { countryToFlag } from '../../../../src/components/templates/CountrySelect';
import GenderSelect from '../../../../src/components/templates/GenderSelect';
describe('Render gender component', () => {
	it('should render gender selector component', () => {
		countryToFlag('AD');
		expect(countryToFlag(undefined)).toBe(undefined);
		const wrapper = mount(<GenderSelect handleChange={jest.fn()} />);
		const gender_select = wrapper.find('#gender_select');
		gender_select
			.first()
			.props()
			.onChange({});
		gender_select
			.first()
			.props()
			.onChange({}, { label: 'Rwanda' });
		gender_select
			.first()
			.props()
			.getOptionLabel(v => (v.label = 'jhhfhf'));
		gender_select
			.first()
			.props()
			.renderInput(v => (v = { label: 'Andorra' }));
	});
});
