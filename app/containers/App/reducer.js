/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';
import { ADD_TO_CART } from '../SwaggerHome/constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  order: {
    orderId: 'INC',
    clientType: 'woocommerce',
    totals: {
      subtotal: 0,
      subtotal_tax: 0,
      shipping_total: 0,
      shipping_tax: 0,
      discount_total: 0,
      discount_tax: 0,
      cart_contents_total: 0,
      cart_contents_tax: 0,
      fee_total: 0,
      fee_tax: 0,
      total: 0,
      total_tax: 0,
    },
    currency: 'USD',
  },
  cartItems: [],
});

function appReducer(state = initialState, action) {
  const total = [];
  let totalFinal;

  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case ADD_TO_CART: {
      let cartItems = state.get('cartItems');

      cartItems = [...cartItems, action.payload];
      cartItems.map(priceEach => total.push(priceEach.price));

      if (total.length >= 0) {
        totalFinal = total.reduce((a, b) => a + b);
      }

      return state
        .set('cartItems', cartItems)
        .setIn(['order', 'totals', 'total'], totalFinal)
        .setIn(['order', 'totals', 'subtotal'], totalFinal);
    }
    default:
      return state;
  }
}

export default appReducer;
