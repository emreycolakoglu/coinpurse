import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SingleValueCard from "../cards/singleValueCard";
import store from "../../store";

const BalanceWidget = (props) => {
  const [result, setResult] = useState(0);
  useEffect(() => {
    store.dispatch({ type: "GET_ASSETS" });
    store.dispatch({ type: "GET_DEBTS" });
    store.dispatch({ type: "GET_CARDS" });
    store.dispatch({ type: "GET_PAYMENT_ACCOUNTS" });
  }, []);

  useEffect(() => {
    let rx = 0;
    props.assets.data.map((a) => {
      rx += a.balance;
    });
    props.paymentAccounts.data.map((a) => {
      rx += a.balance;
    });

    props.debts.data.map((d) => {
      rx -= d.balance;
    });
    props.cards.data.map((d) => {
      rx -= d.balance;
    });
    setResult(rx);
  }, [
    props.assets.data,
    props.debts.data,
    props.paymentAccounts.data,
    props.cards.data
  ]);

  return (
    <SingleValueCard
      value={result}
      unit={props.profile.defaultCurrency}
      header="Balance"
    />
  );
};

BalanceWidget.defaultProps = {
  assets: {
    data: []
  },
  debts: {
    data: []
  },
  paymentAccounts: {
    data: []
  },
  cards: {
    data: []
  }
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  paymentAccounts: state.paymentAccounts,
  cards: state.cards,
  assets: state.assets,
  debts: state.debts
});

export default connect(
  mapStateToProps,
  {}
)(BalanceWidget);
