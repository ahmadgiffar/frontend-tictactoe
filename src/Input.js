import React from "react";

function Input({ label, type, value, onChange }) {
  return (
    <div>
      <div className="form-group">
        <label>{label}</label>
        <input
          onChange={onChange}
          type={type}
          className="form-control"
          value={value}
        />
      </div>
    </div>
  );
}

export default Input;
