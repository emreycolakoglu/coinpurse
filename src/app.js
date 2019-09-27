import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import i18n from "./i18n";


export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Suspense fallback={renderLoader()}>
        <BrowserRouter>
          <Helmet>
            <html lang={i18n.language} />
          </Helmet>

          <Route exact path="/" component={Dashboard} />
        </BrowserRouter>
      </Suspense>
    );
  }
}

const Dashboard = lazy(() =>
  import(
    /* webpackChunkName: "dashboard" */ "./views/dashboard"
  )
);

const renderLoader = () => <div>loading...</div>;