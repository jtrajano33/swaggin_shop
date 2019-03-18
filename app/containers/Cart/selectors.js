import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cart state domain
 */

const selectCartDomain = state => state.get('cart', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Cart
 */

const makeSelectCart = () =>
  createSelector(selectCartDomain, substate => substate.toJS());

const makeSelectAccessToken = () =>
  createSelector(selectCartDomain, substate => substate.get('accessToken'));

const makeSelectClientAccessToken = () =>
  createSelector(selectCartDomain, substate => substate.get('clientToken'));

const makeSelectClientId = () =>
  createSelector(selectCartDomain, substate => substate.get('client_id'));

const makeSelectClientSecret = () =>
  createSelector(selectCartDomain, substate => substate.get('client_secret'));

const makeSelectIsLoadingData = () =>
  createSelector(selectCartDomain, substate => substate.get('isLoading'));

const makeSelectOrderDetails = () =>
  createSelector(selectCartDomain, substate => substate.get('order_details'));

export default makeSelectCart;
export {
  selectCartDomain,
  makeSelectAccessToken,
  makeSelectClientAccessToken,
  makeSelectClientId,
  makeSelectClientSecret,
  makeSelectOrderDetails,
  makeSelectIsLoadingData,
};
