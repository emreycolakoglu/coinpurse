import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import View from "../components/view/view";
import TableCard from "../components/cards/tableCard";
import Content from "../components/view/content";
import store from "../store";
import ActionCard from "../components/cards/actionCard";
import BalanceWidget from "../components/widgets/balanceWidget";

const Dashboard = (props) => {
  let history = useHistory();

  useEffect(() => {
    store.dispatch({ type: "GET_CURRENCIES" });
  }, []);
  return (
    <View>
      <Navbar />
      <Content>
        <div className="row">
          <div className="col-2">
            <ActionCard
              bg="success"
              header="Add New Income"
              actionIcon="fa-plus"
              onClickCallback={(e) => {
                e.preventDefault();
                history.push("/income/create");
              }}
            ></ActionCard>
          </div>
          <div className="col-2">
            <ActionCard
              bg="danger"
              header="Add New Expense"
              actionIcon="fa-plus"
              onClickCallback={(e) => {
                e.preventDefault();
                history.push("/expense/create");
              }}
            ></ActionCard>
          </div>
          <div className="col-2">
            <BalanceWidget />
          </div>
          <div className="col-8">
            <TableCard
              header="Currencies"
              data={props.currencies.data}
              loading={props.currencies.loading}
            />
          </div>
        </div>
      </Content>
    </View>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.currencies
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
