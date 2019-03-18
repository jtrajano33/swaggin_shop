import { fromJS } from 'immutable';
import thankYouPageReducer from '../reducer';

describe('thankYouPageReducer', () => {
  it('returns the initial state', () => {
    expect(thankYouPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
