/*
 *
 * Cart reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  REQUEST_ACCESS_TOKEN,
  CLIENT_ACCESS_TOKEN,
  CLIENT_CREDENTIALS,
  GET_ORDER_DETAILS,
} from './constants';

export const initialState = fromJS({
  accessToken: '',
  clientToken: '',
  client_id: '',
  client_secret: '',
  order_details: [],
  isLoading: false,
});

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case REQUEST_ACCESS_TOKEN:
      return state.set('accessToken', action.payload.access_token);
    case CLIENT_ACCESS_TOKEN:
      return state
        .set('clientToken', action.payload.access_token)
        .set('isLoading', true);
    case CLIENT_CREDENTIALS:
      return state
        .set('client_id', action.payload.clientId)
        .set('client_secret', action.payload.clientSecret);
    case GET_ORDER_DETAILS:
      // let order_details = state.get('order_details');
      // order_details = [...order_details, action.payload];
      return state.set('order_details', action.payload).set('isLoading', false);
    default:
      return state;
  }
}

export default cartReducer;
