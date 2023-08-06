import React from "react";
import "./Countdown.scss";

const Countdown = (props) => {
  const { timer } = props;

  return (
    <div className="countdownWrapper">
      <div className="minutes">{timer}</div>
    </div>
  );
};

export { Countdown };
