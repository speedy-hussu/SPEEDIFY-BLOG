import React from "react";
import "./ImgInput.css";

const ImageInputComponent = React.forwardRef(
  (
    {
      id,
      label,
      className = "",
      labelClassName = "",
      wrapperClassName = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`image-input-div ${wrapperClassName}`}>
        <label htmlFor={id} className={`image-label ${labelClassName}`}>
          {label}
        </label>
        <input
          id={id}
          type="file"
          accept="image/*"
          ref={ref}
          className={`image-input-element ${className}`}
          {...props}
        />
      </div>
    );
  }
);

export default ImageInputComponent;
