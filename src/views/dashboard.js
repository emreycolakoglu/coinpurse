import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../components/navbar/navbar";
import View from "../components/view/view";
import SingleValueCard from "../components/cards/singleValueCard";
import TableCard from "../components/cards/tableCard";
import Content from "../components/view/content";
import store from "../store";

const Dashboard = (props) => {
  useEffect(() => {
    store.dispatch({ type: "GET_CURRENCIES" });
  }, []);
  return (
    <View>
      <Navbar />
      <Content>
        <div className="row">
          <div className="col-8">
            <SingleValueCard
              value="25"
              unit="₺"
              header="Test Value"
              title="Today"
            />
          </div>
          <div className="col-8">
            <TableCard header="Currencies" data={props.currencies.data} />
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
