import React from "react";
import classNames from "classnames";
import "./content.scss";

export default function Content(props) {
  return (
    <div
      className={classNames("container-fluid", "content", props.className)}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
