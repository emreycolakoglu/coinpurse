import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import View from "../../components/view/view";
import Content from "../../components/view/content";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import store from "../../store";

const AssetCreate = (props) => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  async function createAsset() {
    store.dispatch({ type: "CREATE_ASSET", asset: { name, balance } });
  }

  return (
    <View>
      <Navbar />
      <Content>
        <Row>
          <Col xs={12} md={4}></Col>
          <Col xs={12} md={4}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(name, balance);
                createAsset();
              }}
            >
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                <Form.Text className="text-muted">
                  Enter the name of new asset.
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

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col xs={12} md={4}></Col>
        </Row>
      </Content>
    </View>
  );
};

const mapStateToProps = (state) => ({
  assets: state.assets
});

export default connect(
  mapStateToProps,
  {}
)(AssetCreate);
