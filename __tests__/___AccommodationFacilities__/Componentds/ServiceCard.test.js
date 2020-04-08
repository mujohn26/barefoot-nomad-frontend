import React from 'react';
import { shallow,mount} from 'enzyme';
import {ServiceCard} from '../../../src/components/Accommodations/servicesCard.jsx';
import {props} from '../../../__mockData__/accommodationFacility.mock';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createMount } from '@material-ui/core/test-utils';

describe('Render Services card component', () => {
    it('should display and delete service chip successfully successfully', () => {
		mount(<ServiceCard {...props} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'lg' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<ServiceCard  {...props} />
			</MuiThemeProvider>,
		);
		const create_service = wrapper.find('[data-test="service-chip"]');
	create_service
            .first()
            .props()
			.onDelete({}, {serviceName:'breakfast'});

    });
    it('should display and delete amenity chip successfully successfully', () => {
		mount(<ServiceCard {...props} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'lg' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<ServiceCard  {...props} />
			</MuiThemeProvider>,
		);
		const create_amenity = wrapper.find('[data-test="amenity-chip"]');

        create_amenity
            .first()
            .props()
			.onDelete({}, {amenityName:'breakfast'});

    });









    it('should display and delete service chip successfully successfully', () => {
		mount(<ServiceCard {...props} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'xs' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<ServiceCard  {...props} />
			</MuiThemeProvider>,
		);
		const create_service = wrapper.find('[data-test="service-chip-small"]');
	create_service
            .first()
            .props()
			.onDelete({}, {serviceName:'breakfast'});

    });

    it('should display and delete amenity chip successfully successfully', () => {
		mount(<ServiceCard {...props} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'xs' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<ServiceCard  {...props} />
			</MuiThemeProvider>,
		);
		const create_amenity = wrapper.find('[data-test="amenity-chip-small"]');
        create_amenity
            .first()
            .props()
			.onDelete({}, {amenityName:'breakfast'});

    });

   
})