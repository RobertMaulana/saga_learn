import expect from 'expect';
import recordContainerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('recordContainerReducer', () => {
  it('returns the initial state', () => {
    expect(recordContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
