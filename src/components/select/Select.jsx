import React, { useState } from "react";

export default function Select({ options, value, onChangeValue }) {
  const [hidden, setHidden] = useState(true);

  const handleClick = (e) => {
    onChangeValue(e.target.dataset.value);
    setHidden(!hidden);
  };

  return (
    <div className="select">
      <span
        className={"choose " + (!hidden ? "active" : "")}
        onClick={() => setHidden(!hidden)}
      >
        {value}
        <span className={"choose-arrow " + (!hidden ? "active" : "")}></span>
      </span>

      <ul hidden={hidden} className="drop">
        {options.map((option) => (
          <li data-value={option} key={option} onClick={handleClick}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
