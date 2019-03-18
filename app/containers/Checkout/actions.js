/*
 *
 * Checkout actions
 *
 */

import {
  TRANSACTION_CURRENCY,
  CONFIRM_TRANSACTION,
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function transactionCurrency(currency, queuedId) {
  return {
    type: TRANSACTION_CURRENCY,
    payload: {
      currency,
      queuedId,
    },
  };
}

export function confirmTransaction() {
  return {
    type: CONFIRM_TRANSACTION,
  };
}
