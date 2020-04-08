import React from 'react';
import { shallow,mount} from 'enzyme';
import {RoomCard} from '../../../src/components/Accommodations/RoomCard.jsx';
import {props} from '../../../__mockData__/accommodationFacility.mock';

describe('Render Room card component', () => {
    it('should delete room card  successfully', () => {
        const wrapper = mount(<RoomCard  {...props}/>); 
        const delete_card = wrapper.find('[data-test="detele-icon"]');
		delete_card
			.first()
			.props()
			.onClick({}, {index:1});

    })
    it('should provide number Of Rooms  successfully', () => {
        const wrapper = mount(<RoomCard  {...props}/>); 
        const numberOfRoom = wrapper.find('[data-test="numberOfRoom-field"]');
		numberOfRoom
			.first()
			.props()
            .onChange({}, {index:1});
            

    })
    it('should provide room type successfully', () => {
        const wrapper = mount(<RoomCard  {...props}/>); 
        const room_type = wrapper.find('[data-test="roomType-field"]');
		room_type 
			.first()
			.props()
            .onChange({}, {roomTyppe:1});
            room_type 
			.first()
			.props()
            .getOptionLabel(option => (option.name = 'one bed'));

    })
    it('should provide room price successfully', () => {
        const wrapper = mount(<RoomCard  {...props}/>); 
        const room_price = wrapper.find('[data-test="price-field"]');
		room_price
			.first()
			.props()
			.onChange({}, {pricce:100});

    })
    it('should provide currency successfully', () => {
        const wrapper = mount(<RoomCard  {...props}/>); 
        const currency = wrapper.find('[data-test="currency-field"]');
		currency
			.first()
			.props()
            .onChange({}, {currency:'USD'});
            currency
			.first()
			.props()
            .getOptionLabel(option => (option.name = '200'));

    })


	it('should handle change blur on rooms  successfully', () => {
		const wrapper = mount(<RoomCard {...props} />);
		wrapper.setState({
            isRoomValid:true,
			isPriceValid:true
		});

		const event = {
			target: {
				value: 23,
                name: 'numberOfRoom',
                
			},
		};

		wrapper.instance().handleBlur(event);
    });
    
    it('should handle change blur on price  successfully', () => {
		const wrapper = mount(<RoomCard {...props} />);
		wrapper.setState({
            isRoomValid:true,
			isPriceValid:true
		});

		const event = {
			target: {
				value: 23,
				name: 'price',
			},
		};

		wrapper.instance().handleBlur(event);
    });
    it('should display error when price is not a number', () => {
		const wrapper = mount(<RoomCard {...props} />);
		wrapper.setState({
            isRoomValid:true,
			isPriceValid:true
		});

		const event = {
			target: {
				value: '23john',
				name: 'price',
			},
		};

		wrapper.instance().handleBlur(event);
    });
    
	it('should display error when number of room is not a number', () => {
		const wrapper = mount(<RoomCard {...props} />);
		wrapper.setState({
            isRoomValid:true,
			isPriceValid:true
		});

		const event = {
			target: {
				value: '23hotel',
                name: 'numberOfRoom',
                
			},
		};

		wrapper.instance().handleBlur(event);
	});

	it('should display and delete room image chip successfully ', () => {
		const wrapper = mount(<RoomCard {...props} />);

		const image_chip = wrapper.find('[data-test="room-image-chip"]');
		image_chip
			.first()
			.props()
			.onDelete({}, {cardId:1});

	});
})