/*
 *
 * Cart actions
 *
 */

import {
  DEFAULT_ACTION,
  PROCEED_TO_CHECKOUT,
  REQUEST_ACCESS_TOKEN,
  CLIENT_ACCESS_TOKEN,
  CLIENT_CREDENTIALS,
  GET_ORDER_DETAILS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function proceedToCheckout() {
  return {
    type: PROCEED_TO_CHECKOUT,
  };
}

export function requestAccessToken(payload) {
  return {
    type: REQUEST_ACCESS_TOKEN,
    payload,
  };
}

export function clientAccessToken(payload) {
  return {
    type: CLIENT_ACCESS_TOKEN,
    payload,
  };
}

export function clientCredentials(payload) {
  return {
    type: CLIENT_CREDENTIALS,
    payload,
  };
}

export function getOrderDetails(payload) {
  return {
    type: GET_ORDER_DETAILS,
    payload,
  };
}
