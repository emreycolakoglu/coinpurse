import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import View from "../../components/view/view";
import Content from "../../components/view/content";
import Table from "react-bootstrap/Table";
import store from "../../store";
import Button from "react-bootstrap/Button";

const AssetList = (props) => {
  const history = useHistory();
  useEffect(() => {
    store.dispatch({ type: "GET_ASSETS" });
    store.dispatch({ type: "GET_CURRENCIES" });
  }, []);

  function deleteAsset(id) {
    store.dispatch({ type: "DELETE_ASSET", id });
  }

  return (
    <View>
      <Navbar />
      <Content>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <Link to="/assets/create" className="btn btn-primary btn-sm">
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
              {props.assets &&
                props.assets.data &&
                props.assets.data.map((a, i) => {
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
                            history.push(`/assets/detail/${a.id}`);
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
                            history.push(`/assets/edit/${a.id}`);
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
                            deleteAsset(a.id);
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
        </div>
      </Content>
    </View>
  );
};

const mapStateToProps = (state) => ({
  assets: state.assets,
  currencies: state.currencies
});

export default connect(
  mapStateToProps,
  {}
)(AssetList);
