import { takeEvery, call, select } from 'redux-saga/effects';
import { put as putRequest } from 'utils/api';
import { TRANSACTION_CURRENCY } from './constants';

import { makeSelectTransactionPut } from './selectors';
import { makeSelectAccessToken } from '../Cart/selectors';
import history from '../../utils/history';

function* confirmTransactionPut() {
  const data = yield select(makeSelectTransactionPut());
  const currency = { currency: data.currency };
  const url = `https://dev-api.intimate.partners/transactions/queue/${
    data.queuedId
  }`;

  const access_token = yield select(makeSelectAccessToken());

  const headerPostQueue = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    yield call(putRequest, url, currency, headerPostQueue);
    yield call(history.push, `/thankyou`);
  } catch (e) {
    console.log(e);
  }
}

// Individual exports for testing
export default function* checkoutSaga() {
  yield takeEvery(TRANSACTION_CURRENCY, confirmTransactionPut);
}
