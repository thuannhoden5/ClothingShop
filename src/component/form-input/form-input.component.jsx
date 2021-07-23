import "./form-input.styles.scss";
import React from "react";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  console.log({ ...otherProps });
  return (
    <div className="group">
      {label ? <label className="form-label">{label}</label> : null}
      <input className="form-input" onChange={handleChange} {...otherProps} />
    </div>
  );
};
export default FormInput;
