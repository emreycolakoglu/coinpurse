import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import View from "../../components/view/view";
import Content from "../../components/view/content";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import store from "../../store";
import Button from "react-bootstrap/Button";
import dayjs from "dayjs";
import { incomeCategory } from "../../sources/static/categoryService";

const IncomeCreate = (props) => {
  const [request, setRequest] = useState({
    name: "",
    amount: 0,
    paymentAccountId: "",
    incomeCategoryId: "",
    date: new Date()
  });
  const history = useHistory();

  useEffect(() => {
    store.dispatch({ type: "GET_PAYMENT_ACCOUNTS" });
    store.dispatch({ type: "GET_CURRENCIES" });
  }, []);

  async function createIncome() {
    store.dispatch({
      type: "CREATE_INCOME",
      income: request
    });
    history.push("/paymentAccounts/list");
  }

  return (
    <View>
      <Navbar />
      <Content>
        <Row>
          <Col xs={12} md={4}>
            <Card>
              <Card.Header>Create a new Debt</Card.Header>
              <Card.Body>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createIncome();
                  }}
                >
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={request.name}
                      autoFocus
                      onChange={(e) => {
                        setRequest({ ...request, name: e.target.value });
                      }}
                      required
                    />
                    <Form.Text className="text-muted">
                      Enter the name of income.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="paymentAccountId">
                    <Form.Label>Payment Account</Form.Label>
                    <Form.Control
                      as="select"
                      value={request.paymentAccountId}
                      onChange={(e) => {
                        setRequest({
                          ...request,
                          paymentAccountId: parseInt(e.target.value)
                        });
                      }}
                      required
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {props.paymentAccounts.data.map((c, i) => {
                        return (
                          <option value={c.id} key={i}>
                            {c.name}
                          </option>
                        );
                      })}
                    </Form.Control>
                    <Form.Text className="text-muted">
                      Select payment account.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={request.amount}
                      onChange={(e) => {
                        setRequest({
                          ...request,
                          amount: parseFloat(e.target.value)
                        });
                      }}
                      required
                    />
                    <Form.Text className="text-muted">Enter amount.</Form.Text>
                  </Form.Group>

                  <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      onChange={(e) => {
                        setRequest({
                          ...request,
                          date: dayjs(e.target.value).toDate()
                        });
                      }}
                      required
                    />
                    <Form.Text className="text-muted">Enter date.</Form.Text>
                  </Form.Group>

                  <Form.Group controlId="incomeCategoryId">
                    <Form.Label>Income Category</Form.Label>
                    <Form.Control
                      as="select"
                      value={request.incomeCategoryId}
                      onChange={(e) => {
                        setRequest({
                          ...request,
                          incomeCategoryId: parseInt(e.target.value)
                        });
                      }}
                      required
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {incomeCategory.map((c, i) => {
                        return (
                          <option value={c.id} key={i}>
                            {c.name}
                          </option>
                        );
                      })}
                    </Form.Control>
                    <Form.Text className="text-muted">Enter icon.</Form.Text>
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter description"
                      value={request.description}
                      autoFocus
                      onChange={(e) => {
                        setRequest({ ...request, description: e.target.value });
                      }}
                    />
                    <Form.Text className="text-muted">
                      Enter the description of income.
                    </Form.Text>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}></Col>
        </Row>
      </Content>
    </View>
  );
};

IncomeCreate.defaultProps = {
  currencies: {
    data: [],
    loading: false
  }
};

const mapStateToProps = (state) => ({
  paymentAccounts: state.paymentAccounts,
  currencies: state.currencies
});

export default connect(
  mapStateToProps,
  {}
)(IncomeCreate);
