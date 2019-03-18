/**
 *
 * Cart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import makeSelectCart, { makeSelectIsLoadingData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Navbar from '../SwaggerHome/components/Navbar';
import Footer from '../SwaggerHome/components/Footer';
import { makeSelectOrder, makeSelectCartItems } from '../App/selectors';
import {
  proceedToCheckout as _proceedToCheckout,
  requestAccessToken as _requestAccessToken,
} from './actions';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable react/prefer-stateless-function */
export class Cart extends React.Component {
  render() {
    const {
      order,
      cartItems,
      proceedToCheckout,
      requestAccessToken,
      isLoading,
    } = this.props;

    const button = !isLoading ? (
      <button
        type="submit"
        className="button is-success"
        style={{ width: '100%', height: '50px' }}
        onClick={proceedToCheckout}
      >
        PROCEED TO CHECKOUT
      </button>
    ) : (
      <button
        type="submit"
        className="button is-success is-loading"
        style={{ width: '100%', height: '50px' }}
      >
        Loading..
      </button>
    );

    const cartItemsRow = cartItems.map((item, index) => (
      <tr key={index}>
        <th>{item.item}</th>
        <td>${item.price.toFixed(2)}</td>
        <td>1</td>
        <td>${item.price.toFixed(2)}</td>
      </tr>
    ));

    const cartList =
      cartItems.size === 0 ? (
        <tr>
          <th colSpan="4">
            No Items on cart... <Link to="/">Go to Shop</Link>
          </th>
        </tr>
      ) : (
        cartItemsRow
      );

    return (
      <div>
        <Helmet>
          <title>Cart</title>
          <meta name="description" content="Description of Cart" />
        </Helmet>
        <Navbar />

        <div className="columns" style={{ padding: ' 20px 0px' }}>
          <div className="column is-8 is-offset-2">
            <h1>
              {' '}
              <i className="fas fa-shopping-cart" /> CART{' '}
            </h1>
            <form onSubmit={e => e.preventDefault()}>
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>{cartList}</tbody>
                <tfoot>
                  <tr>
                    <th />
                    <th />
                    <th />
                    <th>
                      <button
                        type="submit"
                        className="button is-success"
                        onClick={requestAccessToken}
                        disabled
                      >
                        Update Cart
                      </button>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </form>
          </div>
        </div>

        {order.totals.total && (
          <div className="columns" style={{ paddingBottom: '100px' }}>
            <div className="column is-8 is-offset-2">
              <h1>Cart Totals</h1>
              <form onSubmit={e => e.preventDefault()}>
                <table className="table is-fullwidth is-bordered">
                  <tbody>
                    <tr>
                      <th width="50%">Subtotal</th>
                      <td>${order.totals.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>${order.totals.total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </form>
              {button}
            </div>
          </div>
        )}

        <div style={{ position: 'fixed', bottom: '0px', width: '100%' }}>
          <Footer />
          <ToastContainer hideProgressBar />
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  order: PropTypes.object,
  cartItems: PropTypes.array,
  proceedToCheckout: PropTypes.func,
  requestAccessToken: PropTypes.func,
  isLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  cart: makeSelectCart(),
  order: makeSelectOrder(),
  cartItems: makeSelectCartItems(),
  isLoading: makeSelectIsLoadingData(),
});

function mapDispatchToProps(dispatch) {
  return {
    proceedToCheckout: () => {
      dispatch(_proceedToCheckout());
    },
    requestAccessToken: () => {
      dispatch(_requestAccessToken());
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'cart', reducer });
const withSaga = injectSaga({ key: 'cart', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Cart);
