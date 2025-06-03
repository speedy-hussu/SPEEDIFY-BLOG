import React, { useId } from "react";
import "./Input.css";
function Input(
  {
    label,
    type = "text",
    className = "", // custom input styles
    wrapperClassName = "", // custom wrapper styles
    labelClassName = "", // custom label styles
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className={`input-div ${wrapperClassName}`}>
      <div className={`label-div ${labelClassName}`}>
        {label && <label htmlFor={id}>{label}</label>}
      </div>
      <input
        id={id}
        type={type}
        ref={ref}
        className={`input-element ${className}`}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(Input);
