import React, { useState } from "react";

const FloatInput = (props) => {
  const [focus, setFocus] = useState(false);
  let { label, value, placeholder, type, required, maxLength } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? "float-input-label as-label" : "float-input-label as-placeholder";

  const requiredMark = required ? <span className="text-danger">*</span> : null;
  
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.oninput = () => {
      if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
    }
  })

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <input onChange={props.onChange} type={type} value={value} maxlength={maxLength} size="large" className="float-input" />
      <label className={labelClass}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
};

export default FloatInput;