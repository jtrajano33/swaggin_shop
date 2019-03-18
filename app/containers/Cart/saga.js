import { takeEvery, call, put, select } from 'redux-saga/effects';
import { post } from 'utils/api';
import qs from 'qs';
import { PROCEED_TO_CHECKOUT } from './constants';
import { makeSelectOrder } from '../App/selectors';
import {
  requestAccessToken,
  clientAccessToken,
  clientCredentials,
  getOrderDetails,
} from './actions';
import {
  makeSelectAccessToken,
  makeSelectClientAccessToken,
  makeSelectClientId,
  makeSelectClientSecret,
} from './selectors';
import history from '../../utils/history';

function* callProceedToCheckout() {
  // 1. Get access_token from oauth_token
  const payloadPasswordGrant = {
    grant_type: 'password',
    client_id: 'partners',
    client_secret: 'secret',
    username: 'justintra@cloudstaff.com',
    password: 'justin',
  };

  const passwordGrantOauth = 'https://dev-api.intimate.partners/oauth/token';

  try {
    const passWordGrant = yield call(
      post,
      passwordGrantOauth,
      qs.stringify(payloadPasswordGrant),
      { headers: { 'Content-type': 'application/x-www-form-urlencoded' } },
    );

    yield put(clientAccessToken(passWordGrant.data));
  } catch (e) {
    console.log(e);
  }

  // 2. After getting the clientToken, proceed with the network request on /clients using the token in the request header

  const clientToken = yield select(makeSelectClientAccessToken());
  const clientUrl = 'https://dev-api.intimate.partners/clients';
  const headerClient = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${clientToken}`,
    },
  };

  const clientPayload = {
    client_id: 'partners',
    client_secret: 'secret',
  };

  try {
    const clientData = yield call(post, clientUrl, clientPayload, headerClient);
    yield put(clientCredentials(clientData.data));
  } catch (e) {
    console.log(e);
  }

  // 3. Get Accesstoken on oauth/token
  const client_id = yield select(makeSelectClientId());
  const client_secret = yield select(makeSelectClientSecret());

  const payload = {
    grant_type: 'client_credentials',
    client_id,
    client_secret,
  };

  const urlOauth = 'https://dev-api.intimate.partners/oauth/token';

  try {
    const accessToken = yield call(post, urlOauth, qs.stringify(payload), {
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    });
    yield put(requestAccessToken(accessToken.data));
  } catch (e) {
    console.log(e);
  }

  // 4. After getting the accessToken, proceed with the post queue using the accessToken in the request header

  const access_token = yield select(makeSelectAccessToken());
  const order = yield select(makeSelectOrder());
  const url = 'https://dev-api.intimate.partners/transactions/queue';

  const headerPostQueue = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const orderData = yield call(post, url, order, headerPostQueue);
    yield put(getOrderDetails(orderData.data));
    yield call(history.push, `/checkout`);
  } catch (e) {
    console.log(e);
  }
}

// Individual exports for testing
export default function* cartSaga() {
  yield takeEvery(PROCEED_TO_CHECKOUT, callProceedToCheckout);
}
