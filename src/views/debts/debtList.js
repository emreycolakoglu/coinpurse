import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import View from "../../components/view/view";
import Content from "../../components/view/content";
import Table from "react-bootstrap/Table";
import store from "../../store";

const DebtList = (props) => {
  useEffect(() => {
    store.dispatch({ type: "GET_DEBTS" });
  }, []);
  return (
    <View>
      <Navbar />
      <Content>
        <div>
          <Link to="/debts/create" className="btn btn-primary">
            Create
          </Link>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {props.debts &&
                props.debts.data &&
                props.debts.data.map((a, i) => {
                  return (
                    <tr key={i}>
                      <td>{a.id}</td>
                      <td>{a.name}</td>
                      <td>{a.balance}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Content>
    </View>
  );
};
const mapStateToProps = (state) => ({
  debts: state.debts
});

export default connect(
  mapStateToProps,
  {}
)(DebtList);
