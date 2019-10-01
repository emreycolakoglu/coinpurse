import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import View from "../../components/view/view";
import Content from "../../components/view/content";
import Table from "react-bootstrap/Table";
import store from "../../store";
import Button from "react-bootstrap/Button";
import { PaymentAccountService } from "../../sources/db/paymentAccountService";
import { IncomeService } from "../../sources/db/incomeService";
import { incomeCategory } from "../../sources/static/categoryService";

const PaymentAccountDetail = (props) => {
  const [paymentAccount, setPaymentAction] = useState({});
  const [incomes, setIncomes] = useState([]);
  const history = useHistory();
  useEffect(() => {
    store.dispatch({ type: "GET_PAYMENT_ACCOUNTS" });
    store.dispatch({ type: "GET_CURRENCIES" });
    getData();
  }, []);

  async function getData() {
    const _incomeService = new IncomeService();
    const _paymentAccountService = new PaymentAccountService();
    const _incomes = await _incomeService.findIncomes({
      paymentAccountId: parseInt(props.match.params.id)
    });
    const _pa = await _paymentAccountService.getPaymentAccountById(
      parseInt(props.match.params.id)
    );
    setPaymentAction(_pa[0]);
    setIncomes(_incomes);
  }

  function deleteIncome(id) {
    //store.dispatch({ type: "DELETE_INCOME", id });
  }

  return (
    <View>
      <Navbar />
      <Content>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {incomes &&
              incomes.map((a, i) => {
                return (
                  <tr key={i}>
                    <td>{a.id}</td>
                    <td>{a.name}</td>
                    <td>{a.amount}</td>
                    <td>
                      {incomeCategory.length > 0 &&
                        incomeCategory.find((c) => {
                          return c.id == a.incomeCategoryId;
                        }).name}
                    </td>
                    <td>{a.date.toString()}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`/paymentAccounts/edit/${a.id}`);
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
                          deleteIncome(a.id);
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
  currencies: state.currencies
});

export default connect(
  mapStateToProps,
  {}
)(PaymentAccountDetail);
