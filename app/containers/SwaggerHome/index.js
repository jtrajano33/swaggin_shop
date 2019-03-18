/**
 *
 * SwaggerHome
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
// import { toast } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import makeSelectSwaggerHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import phone from '../../images/phone';
import { makeSelectOrder } from '../App/selectors';
import { addToCart as _addToCart } from './actions';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable react/prefer-stateless-function */
export class SwaggerHome extends React.Component {
  state = {
    products: [
      { id: 1, item: 'iPhone', price: 7, image: phone.Iphone, tag: 'mobile' },
      { id: 2, item: 'Samsung', price: 5, image: phone.Samsung, tag: 'mobile' },
      { id: 3, item: 'Asus', price: 3, image: phone.Asus, tag: 'mobile' },
      {
        id: 4,
        item: 'Slightly Used Phone',
        price: 8,
        image: phone.SlightlyUsed,
        tag: 'mobile',
      },
      {
        id: 5,
        item: 'Apple Laptop',
        price: 10,
        image: phone.AppleLaptop1,
        tag: 'laptop',
      },
      {
        id: 6,
        item: 'Apple Laptop v2',
        price: 8,
        image: phone.AppleLaptop2,
        tag: 'laptop',
      },
      {
        id: 7,
        item: 'Acer Laptop',
        price: 9,
        image: phone.AcerLaptop,
        tag: 'laptop',
      },
      {
        id: 8,
        item: 'MacBook Air',
        price: 11,
        image: phone.MacBook,
        tag: 'laptop',
      },
    ],
    categories: 'ALL',
  };

  handleCategories = category => {
    this.setState({ categories: category });
  };

  render() {
    const { addToCart } = this.props;

    const { products, categories } = this.state;

    const allProducts = products.map((product, index) => (
      <div className="column is-3" key={index}>
        <form
          className="box selectedItem"
          onSubmit={e => {
            e.preventDefault();
            addToCart(product.item, product.price);
            toast.success(`${product.item} hs been added to the cart!`);
          }}
        >
          <div className="image image is-4by3 box">
            <img src={product.image} width="100%" alt={product.item} />
          </div>
          <div style={{ padding: '20px 0px' }}>
            <div
              className="has-text-centered"
              style={{ paddingBottom: '20px' }}
            >
              <strong>{product.item}</strong>
            </div>
            <div className="has-text-centered">${product.price.toFixed(2)}</div>
          </div>
          <button
            type="submit"
            className="button is-success selectedButton"
            style={{ width: '100%' }}
          >
            ADD TO CART
          </button>
        </form>
      </div>
    ));

    const mobile = products.map((product, index) => {
      if (product.tag === 'mobile') {
        return (
          <div className="column is-3" key={index}>
            <form
              className="box selectedItem"
              onSubmit={e => {
                e.preventDefault();
                addToCart(product.item, product.price);
                toast.success(`${product.item} hs been added to the cart!`);
              }}
            >
              <div className="image image is-4by3 box">
                <img src={product.image} width="100%" alt={product.item} />
              </div>
              <div style={{ padding: '20px 0px' }}>
                <div
                  className="has-text-centered"
                  style={{ paddingBottom: '20px' }}
                >
                  <strong>{product.item}</strong>
                </div>
                <div className="has-text-centered">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              <button
                type="submit"
                className="button is-success selectedButton"
                style={{ width: '100%' }}
              >
                ADD TO CART
              </button>
            </form>
          </div>
        );
      }
    });

    const laptop = products.map((product, index) => {
      if (product.tag === 'laptop') {
        return (
          <div className="column is-3" key={index}>
            <form
              className="box selectedItem"
              onSubmit={e => {
                e.preventDefault();
                addToCart(product.item, product.price);
                toast.success(`${product.item} hs been added to the cart!`);
              }}
            >
              <div className="image image is-4by3 box">
                <img src={product.image} width="100%" alt={product.item} />
              </div>
              <div style={{ padding: '20px 0px' }}>
                <div
                  className="has-text-centered"
                  style={{ paddingBottom: '20px' }}
                >
                  <strong>{product.item}</strong>
                </div>
                <div className="has-text-centered">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              <button
                type="submit"
                className="button is-success selectedButton"
                style={{ width: '100%' }}
              >
                ADD TO CART
              </button>
            </form>
          </div>
        );
      }
    });

    const specificCategory =
      categories === 'MOBILE'
        ? mobile
        : categories === 'LAPTOP'
          ? laptop
          : allProducts;

    return (
      <div>
        <Helmet>
          <title>Catalog</title>
          <meta name="description" content="Description of SwaggerHome" />
        </Helmet>

        <Navbar />

        <div className="columns">
          <div className="column is-2">
            <div className="" style={{ margin: '20px 20px' }}>
              <div className=" box has-text-centered">
                <h3>
                  <strong>CATEGORIES</strong>
                </h3>
              </div>
              <div className="box" style={{ marginTop: '20px', height: '95%' }}>
                <button
                  className="button is-info selectAll"
                  style={{ width: '100%', marginBottom: '10px' }}
                  onClick={() => this.handleCategories('ALL')}
                >
                  All
                </button>
                <button
                  className="button is-info selectMobile"
                  style={{ width: '100%', marginBottom: '10px' }}
                  onClick={() => this.handleCategories('MOBILE')}
                >
                  Phone
                </button>
                <button
                  className="button is-info selectLaptop"
                  style={{ width: '100%', marginBottom: '10px' }}
                  onClick={() => this.handleCategories('LAPTOP')}
                >
                  Laptop
                </button>
              </div>
            </div>
          </div>

          <div className="column is-10">
            <div
              className="columns is-multiline"
              style={{ padding: '20px', marginBottom: '100px' }}
            >
              {specificCategory}
            </div>
          </div>
        </div>

        <div style={{ position: 'fixed', bottom: '0px', width: '100%' }}>
          <Footer />
          <ToastContainer hideProgressBar />
        </div>
      </div>
    );
  }
}

SwaggerHome.propTypes = {
  addToCart: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  swaggerHome: makeSelectSwaggerHome(),
  order: makeSelectOrder(),
});

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (item, price) => {
      dispatch(_addToCart(item, price));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'swaggerHome', reducer });
const withSaga = injectSaga({ key: 'swaggerHome', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SwaggerHome);
