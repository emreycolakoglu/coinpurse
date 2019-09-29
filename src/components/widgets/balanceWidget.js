import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SingleValueCard from "../cards/singleValueCard";
import store from "../../store";

const BalanceWidget = (props) => {
  const [result, setResult] = useState(0);
  useEffect(() => {
    store.dispatch({ type: "GET_ASSETS" });
    store.dispatch({ type: "GET_DEBTS" });
  }, []);

  useEffect(() => {
    let rx = 0;
    props.assets.data.map((a) => {
      rx += a.balance;
    });

    props.debts.data.map((d) => {
      rx -= d.balance;
    });
    setResult(rx);
  }, [props.assets.data, props.debts.data]);

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
  }
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  assets: state.assets,
  debts: state.debts
});

export default connect(
  mapStateToProps,
  {}
)(BalanceWidget);
