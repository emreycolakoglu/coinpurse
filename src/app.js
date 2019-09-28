import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import i18n from "./i18n";
import Loading from "./components/loading/loading";


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
          <Route path="/login" component={Login} />
          <Route path="/assets/list" component={AssetList} />
          <Route path="/assets/create" component={AssetCreate} />
          <Route path="/debts/list" component={DebtList} />
          <Route path="/debts/create" component={DebtCreate} />
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

const Login = lazy(() =>
  import(
    /* webpackChunkName: "login" */ "./views/auth/login"
  )
);

const AssetList = lazy(() =>
  import(
    /* webpackChunkName: "asset.list" */ "./views/assets/assetList"
  )
);
const AssetCreate = lazy(() =>
  import(
    /* webpackChunkName: "asset.create" */ "./views/assets/assetCreate"
  )
);

const DebtList = lazy(() =>
  import(
    /* webpackChunkName: "debt.list" */ "./views/debts/debtList"
  )
);
const DebtCreate = lazy(() =>
  import(
    /* webpackChunkName: "debt.create" */ "./views/debts/debtCreate"
  )
);

const renderLoader = () => <Loading />;