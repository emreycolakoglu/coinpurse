import React from "react";
import Card from "react-bootstrap/Card";

export default function SingleValueCard(props) {
  return (
    <Card bg={props.bg} text={props.fg} style={props.style}>
      {props.header ? <Card.Header>{props.header}</Card.Header> : null}
      <Card.Body>
        {props.title ? <Card.Title>{props.title}</Card.Title> : null}
        <Card.Text style={{fontSize: 48}}>
          {props.value} {props.unit}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

SingleValueCard.defaultProps = {
  bg: "primary",
  fg: "white",
  style: {},
  unit: undefined
}