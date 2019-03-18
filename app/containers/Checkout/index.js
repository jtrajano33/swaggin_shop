/**
 *
 * Checkout
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
import Select from 'react-select';
import makeSelectCheckout from './selectors';
import reducer from './reducer';
import saga from './saga';
import Navbar from '../SwaggerHome/components/Navbar';
import Footer from '../SwaggerHome/components/Footer';
import { makeSelectOrderDetails } from '../Cart/selectors';
import { transactionCurrency } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Checkout extends React.Component {
  render() {
    const { orderDetails, handleCurrency } = this.props;
    // console.log('ORDER DETAILS ******************', orderDetails)

    const orderItemsRow =
      orderDetails.size === 0 ? (
        ''
      ) : (
        <tr>
          <th>{orderDetails.blockNumber}</th>
          <td>${orderDetails.totals.total.toFixed(2)} USD</td>
          <td>{orderDetails.amount} ITM</td>
          <td>{orderDetails.orderId}</td>
        </tr>
      );

    const currencyOptions = orderDetails.totalAmounts
      ? orderDetails.totalAmounts.map(crypto => ({
          value: crypto.id,
          label: `${crypto.amount} ${crypto.symbol}`,
        }))
      : '';

    const orderList =
      orderDetails.size === 0 ? (
        <tr>
          <th colSpan="4">
            No existing order.. <Link to="/">Go to Shop</Link>
          </th>
        </tr>
      ) : (
        orderItemsRow
      );
    return (
      <div>
        <Helmet>
          <title>Checkout</title>
          <meta name="description" content="Description of Checkout" />
        </Helmet>
        <Navbar />

        <div className="columns" style={{ padding: ' 20px 0px' }}>
          <div className="column is-8 is-offset-2">
            <h1>
              {' '}
              <i className="fas fa-shipping-fast" /> ORDER DETAILS
            </h1>
            <form onSubmit={e => e.preventDefault()}>
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>ORDER NO.</th>
                    <th>IN USD</th>
                    <th>IN ITM</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>{orderList}</tbody>
              </table>
            </form>
          </div>
        </div>

        {orderDetails.size !== 0 && (
          <div className="columns">
            <div className="column is-5 is-offset-2">
              <div className="box">
                {/* <p style={{marginTop: '20px',marginBottom: '10px'}}>Wallet Address  : </p>
                    <input value={orderDetails.walletAddress} disabled className="input is-info" /> */}

                <div>
                  <p style={{ marginTop: '20px', marginBottom: '10px' }}>
                    Select Mode payment:
                  </p>

                  <div>
                    <Select
                      placeholder="Select Payment"
                      options={currencyOptions}
                      onChange={e => handleCurrency(e.value, orderDetails.id)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="column is-3">
              <div className="box" style={{ height: '100%' }}>
                <strong>Note:</strong> Please select mode of payment to proceed
              </div>
            </div>
          </div>
        )}

        <div style={{ position: 'fixed', bottom: '0px', width: '100%' }}>
          <Footer />
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  orderDetails: PropTypes.object,
  handleCurrency: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  checkout: makeSelectCheckout(),
  orderDetails: makeSelectOrderDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleCurrency: (currency, queuedId) => {
      dispatch(transactionCurrency(currency, queuedId));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'checkout', reducer });
const withSaga = injectSaga({ key: 'checkout', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Checkout);
