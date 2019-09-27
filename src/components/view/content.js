import React from "react";
import classNames from "classnames";

export default function Content(props) {
  return (
    <div className={classNames("container-fluid", props.className)} style={props.style}>
      {props.children}
    </div>
  );
}
