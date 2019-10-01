import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import i18n from "./i18n";
import Loading from "./components/loading/loading";
import { CurrencyService } from "./sources/db/currencyService";
import store from "./store";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.initialize();
  }

  async initialize() {
    await this.checkAndSeed();
  }
  async checkAndSeed() {
    const _service = new CurrencyService();
    const currencies = await _service.getCurrencies();
    if (currencies.length == 0) {
      store.dispatch({ type: "PARSE_CURRENCIES" });
    }
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

          <Route path="/paymentAccounts/list" component={PaymentAccountList} />
          <Route
            path="/paymentAccounts/create"
            component={PaymentAccountCreate}
          />
          <Route path="/paymentAccounts/edit/:id" component={PaymentAccountEdit} />
          <Route path="/cards/list" component={CardList} />
          <Route path="/cards/create" component={CardCreate} />
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
  import(/* webpackChunkName: "dashboard" */ "./views/dashboard")
);

const Login = lazy(() =>
  import(/* webpackChunkName: "login" */ "./views/auth/login")
);

const PaymentAccountList = lazy(() =>
  import(
    /* webpackChunkName: "paymentAccount.list" */ "./views/paymentAccounts/paymentAccountList"
  )
);
const PaymentAccountCreate = lazy(() =>
  import(
    /* webpackChunkName: "paymentAccount.create" */ "./views/paymentAccounts/paymentAccountCreate"
  )
);
const PaymentAccountEdit = lazy(() =>
  import(
    /* webpackChunkName: "paymentAccount.edit" */ "./views/paymentAccounts/paymentAccountEdit"
  )
);

const CardList = lazy(() =>
  import(/* webpackChunkName: "card.list" */ "./views/cards/cardList")
);
const CardCreate = lazy(() =>
  import(/* webpackChunkName: "card.create" */ "./views/cards/cardCreate")
);

const AssetList = lazy(() =>
  import(/* webpackChunkName: "asset.list" */ "./views/assets/assetList")
);
const AssetCreate = lazy(() =>
  import(/* webpackChunkName: "asset.create" */ "./views/assets/assetCreate")
);

const DebtList = lazy(() =>
  import(/* webpackChunkName: "debt.list" */ "./views/debts/debtList")
);
const DebtCreate = lazy(() =>
  import(/* webpackChunkName: "debt.create" */ "./views/debts/debtCreate")
);

const renderLoader = () => <Loading />;
