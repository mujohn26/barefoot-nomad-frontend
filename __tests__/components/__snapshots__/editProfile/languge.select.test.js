import React from 'react';
import { mount } from 'enzyme';
import { countryToFlag } from '../../../../src/components/templates/CountrySelect';
import LanguageSelect from '../../../../src/components/templates/LangugeSelect';
describe('Render language select component', () => {
	it('should render LanguageSelect component', () => {
		countryToFlag('AD');
		expect(countryToFlag(undefined)).toBe(undefined);
		const wrapper = mount(<LanguageSelect handleChange={jest.fn()} />);
		const gender_select = wrapper.find('#languages_select');
		gender_select
			.first()
			.props()
			.onChange({});
		gender_select
			.first()
			.props()
			.onChange({}, { label: 'kinyarwanda' });
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
