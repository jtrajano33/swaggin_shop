/*
 *
 * SwaggerHome actions
 *
 */

import { DEFAULT_ACTION, ADD_TO_CART } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addToCart(item, price) {
  // console.log('ACTION PAYLOAD -> ',item, price)
  return {
    type: ADD_TO_CART,
    payload: {
      item,
      price,
    },
  };
}
