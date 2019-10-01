import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import View from "../../components/view/view";
import Content from "../../components/view/content";
import Table from "react-bootstrap/Table";
import store from "../../store";
import Button from "react-bootstrap/Button";

const CardList = (props) => {
  const history = useHistory();
  useEffect(() => {
    store.dispatch({ type: "GET_CARDS" });
    store.dispatch({ type: "GET_CURRENCIES" });
  }, []);

  function deleteCard(id) {
    store.dispatch({ type: "DELETE_CARD", id });
  }

  return (
    <View>
      <Navbar />
      <Content>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Link to="/cards/create" className="btn btn-primary btn-sm">
                  Create
                </Link>
              </th>
              <th>Name</th>
              <th>Balance</th>
              <th>Currency</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.cards &&
              props.cards.data &&
              props.cards.data.map((a, i) => {
                return (
                  <tr key={i}>
                    <td>{a.id}</td>
                    <td>{a.name}</td>
                    <td>{a.balance}</td>
                    <td>
                      {props.currencies.data.length > 0 &&
                        props.currencies.data.find((c) => {
                          return c.id == a.currencyId;
                        }).name}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`/cards/detail/${a.id}`);
                        }}
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </Button>
                      &nbsp;
                      <Button
                        variant="info"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`/cards/edit/${a.id}`);
                        }}
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </Button>
                      &nbsp;
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteCard(a.id);
                        }}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Content>
    </View>
  );
};

const mapStateToProps = (state) => ({
  cards: state.cards,
  currencies: state.currencies
});

export default connect(
  mapStateToProps,
  {}
)(CardList);
