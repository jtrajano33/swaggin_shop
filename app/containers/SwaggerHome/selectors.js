import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the swaggerHome state domain
 */

const selectSwaggerHomeDomain = state => state.get('swaggerHome', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SwaggerHome
 */

const makeSelectSwaggerHome = () =>
  createSelector(selectSwaggerHomeDomain, substate => substate.toJS());

export default makeSelectSwaggerHome;
export { selectSwaggerHomeDomain };
