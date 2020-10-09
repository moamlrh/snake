import React from "react";

export default (props) => {
  return (
    <div>
      {props.dots.map((dot, i) => {
        return (
          <div
            className="snake-body"
            style={{ left: dot[0]+'%', top: dot[1]+'%'}}
            key={i}
          ></div>
        );
      })}
    </div>
  );
};
