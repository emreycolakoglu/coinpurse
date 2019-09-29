import React from "react";
import Card from "react-bootstrap/Card";

export default function ActionCard(props) {
  return (
    <Card
      bg={props.bg}
      text={props.fg}
      style={{ ...props.style, cursor: "pointer" }}
      onClick={props.onClickCallback}
    >
      {props.header ? <Card.Header>{props.header}</Card.Header> : null}
      <Card.Body>
        <Card.Text style={{ fontSize: 48, textAlign: "center" }}>
          <i className={`fa ${props.actionIcon}`} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

ActionCard.defaultProps = {
  bg: "primary",
  fg: "white",
  actionIcon: "fa-plus",
  style: {}
};
