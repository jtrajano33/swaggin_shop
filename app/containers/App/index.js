/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

// import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { ToastContainer } from 'react-toastify';
import SwaggerHome from '../SwaggerHome';
import Cart from '../Cart';
import Checkout from '../Checkout';
import ThankYouPage from '../ThankYouPage';

import GlobalStyle from '../../global-styles';
import 'react-toastify/dist/ReactToastify.css';

const AppWrapper = styled.div`
  //max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  //padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - The Swaggin' Shop"
        defaultTitle="The Swaggin' Shop"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={SwaggerHome} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/thankyou" component={ThankYouPage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
        <ToastContainer hideProgressBar />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
