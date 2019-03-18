import { fromJS } from 'immutable';
import swaggerHomeReducer from '../reducer';

describe('swaggerHomeReducer', () => {
  it('returns the initial state', () => {
    expect(swaggerHomeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
