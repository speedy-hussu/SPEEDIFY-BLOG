import React from "react";
import "./SelectInput.css";

const SelectComponent = React.forwardRef(
  (
    {
      id,
      options = [],
      label,
      className = "",
      labelClassName = "",
      wrapperClassName = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`select-div ${wrapperClassName}`}>
        <div className={`select-label ${labelClassName}`}>
          {label && <label htmlFor={id}>{label}</label>}
        </div>
        <select
          id={id}
          ref={ref}
          className={`select-element ${className}`}
          {...props}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SelectComponent;
