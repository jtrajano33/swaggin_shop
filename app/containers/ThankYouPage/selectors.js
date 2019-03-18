import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the thankYouPage state domain
 */

const selectThankYouPageDomain = state =>
  state.get('thankYouPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ThankYouPage
 */

const makeSelectThankYouPage = () =>
  createSelector(selectThankYouPageDomain, substate => substate.toJS());

export default makeSelectThankYouPage;
export { selectThankYouPageDomain };
