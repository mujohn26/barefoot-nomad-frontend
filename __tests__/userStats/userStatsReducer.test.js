import reducer from '../../src/reducers/tripStatisticsReducer';
import * as types from '../../src/actions/userManagementAction';
import expect from 'expect';

describe('user trip statistics reducers tests', () => {
   it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({
         statistics: {}
      });
   });
   it('should handle GET_STATS action', () => {
      const userAction = {
         type: 'GET_STATS',
      };
      expect(reducer({}, userAction)).toEqual({});
   });
});
