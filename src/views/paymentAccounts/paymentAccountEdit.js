import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import View from "../../components/view/view";
import Content from "../../components/view/content";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import store from "../../store";
import { paymentAccountTypes as ics } from "../../sources/static/iconService";
import { PaymentAccountService } from "../../sources/db/paymentAccountService";

const PaymentAccountEdit = (props) => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [currencyId, setCurrency] = useState("");
  const [icon, setIcon] = useState("");
  const [id, setId] = useState(0);
  const [icons, setIcons] = useState(ics);
  let history = useHistory();

  async function getPa() {
    const _service = new PaymentAccountService();
    const pa = await _service.getPaymentAccountById(
      parseInt(props.match.params.id)
    );
    if (pa && pa.length > 0) {
      setName(pa[0].name);
      setBalance(pa[0].balance);
      setCurrency(pa[0].currencyId);
      setIcon(pa[0].icon);
      setId(pa[0].id);
    }
  }

  useEffect(() => {
    store.dispatch({ type: "GET_PAYMENT_ACCOUNTS" });
    store.dispatch({ type: "GET_CURRENCIES" });
    getPa();
  }, []);

  async function editPaymentAccount() {
    store.dispatch({
      type: "EDIT_PAYMENT_ACCOUNT",
      id: id,
      paymentAccount: { name, balance, currencyId, icon }
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
              <Card.Header>Edit Payment Account</Card.Header>
              <Card.Body>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    editPaymentAccount();
                  }}
                >
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      autoFocus
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                    <Form.Text className="text-muted">
                      Enter the name of new payment account.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="balance">
                    <Form.Label>Balance</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={balance}
                      onChange={(e) => {
                        setBalance(parseInt(e.target.value));
                      }}
                      required
                    />
                    <Form.Text className="text-muted">
                      Enter starting balance.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="currency">
                    <Form.Label>Currency</Form.Label>
                    <Form.Control
                      as="select"
                      value={currencyId}
                      onChange={(e) => {
                        setCurrency(parseInt(e.target.value));
                      }}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {props.currencies.data.map((c, i) => {
                        return (
                          <option value={c.id} key={i}>
                            {c.name}
                          </option>
                        );
                      })}
                    </Form.Control>
                    <Form.Text className="text-muted">
                      Enter currency type.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="icon">
                    <Form.Label>Icon</Form.Label>
                    <Form.Control
                      as="select"
                      value={icon}
                      onChange={(e) => {
                        setIcon(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {icons.map((c, i) => {
                        return (
                          <option value={c.value} key={i}>
                            {c.key}
                          </option>
                        );
                      })}
                    </Form.Control>
                    <Form.Text className="text-muted">Enter icon.</Form.Text>
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

PaymentAccountEdit.defaultProps = {
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
)(PaymentAccountEdit);
