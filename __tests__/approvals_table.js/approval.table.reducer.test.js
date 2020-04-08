import ApprovalTable from '../../src/reducers/approval.table.reducer';
import {
	makeOpenModelToFalse,
	editTripRequestStatusFail,
	editTripRequestStatusSuccess,
	setSelectedTripRequest,
	getTripRequestsFail,
	getTripRequestsSuccess,
} from '../../__mockData__/approval.table';

describe('approvals table test', () => {
	it('Should get all make Open Model False', () => {
		const getState = ApprovalTable({}, makeOpenModelToFalse);
		expect(getState).toEqual({
			successMessage: makeOpenModelToFalse.successMessage,
			errorMessage: makeOpenModelToFalse.errorMessage,
			message: makeOpenModelToFalse.message,
		});
	});
	it('Should fail to edit trip request status', () => {
		const getState = ApprovalTable({}, editTripRequestStatusFail);
		expect(getState).toEqual({
			errorMessage: editTripRequestStatusFail.errorMessage,
			message: editTripRequestStatusFail.message,
		});
	});
	it('Should  edit trip request status', () => {
		const getState = ApprovalTable({}, editTripRequestStatusSuccess);
		expect(getState).toEqual({
			successMessage: editTripRequestStatusSuccess.successMessage,
			message: editTripRequestStatusSuccess.message,
		});
	});
	it('Should  set trip request', () => {
		const getState = ApprovalTable({}, setSelectedTripRequest);
		expect(getState).toEqual({
			trip: setSelectedTripRequest.payload,
		});
	});
	it('Should fail to get trip request', () => {
		const getState = ApprovalTable({}, getTripRequestsFail);
		expect(getState).toEqual({
			tripRequestsError: getTripRequestsFail.tripRequestsError,
		});
	});
	it('Should  get trip request', () => {
		const getState = ApprovalTable(
			{ tripRequests: [] },
			getTripRequestsSuccess,
		);
		expect(getState).toEqual({
			tripRequests: [[], []],
			tripRequestsError: '',
			count: undefined,
			searchError: false,
		});
	});
	it('search should fail to get trip request', () => {
		const getState = ApprovalTable(
			{ tripRequests: [], searchError: false },
			{ type: 'SEARCH_TRIP_REQUESTS_FAIL', searchError: true },
		);
		expect(getState).toEqual({ tripRequests: [], searchError: true });
	});
	it('should get default value', () => {
		const getState = ApprovalTable({ tripRequests: [] }, {});
		expect(getState).toEqual({ tripRequests: [] });
	});
});
