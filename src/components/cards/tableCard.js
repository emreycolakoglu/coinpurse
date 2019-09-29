import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

export default function TableCard(props) {
  const keyArray = props.data[0] ? Object.keys(props.data[0]) : [];
  return (
    <Card bg={props.bg} text={props.fg} style={props.style}>
      {props.header ? <Card.Header>{props.header}</Card.Header> : null}
      <Card.Body>
        {props.loading ? (
          <div>
            <i className="fa fa-cog fa-spin"></i>
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                {keyArray.map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.data.map((row, i) => {
                const valArray = Object.values(row);
                return (
                  <tr key={i}>
                    {valArray.map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}

TableCard.defaultProps = {
  bg: "white",
  fg: "black",
  style: {},
  loading: false,
  data: []
};
