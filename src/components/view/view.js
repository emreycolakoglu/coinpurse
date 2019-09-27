import React from "react";
import "./view.scss";

export default function View(props) {
  return <div className="view">{props.children}</div>;
}
