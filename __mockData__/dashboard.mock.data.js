
export const props = {
	locations: 
			  [
				{
                    country: "Congo",
                    city: "Kinshasa",
                    travelledTimes: "7"
				},
             ],
             classes: {
                TypographyTitle: '',
            },
            isLoading:false,
getMostTraveledDestinations: jest.fn(),
useSelector:jest.fn()

};

export const getMostTraveledDestinations = {
	type: 'GET_MOST_TRAVELED_DESTINATION',
	payload: [
		{
            country: "Congo",
            city: "Kinshasa",
            travelledTimes: "7"
		},
	]
  };


 