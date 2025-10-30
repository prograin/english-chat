import React from "react";

export default function Input({ value, onChange, name, type = "text", className = "", min = 0, max = 99, noLeadingZero = true, returnNull = true }) {
  const handleChange = (e) => {
    let val = e.target.value;

    if (type === "number") {
      if (noLeadingZero && val.startsWith("0")) {
        val = val.replace(/^0+/, "");
      }

      if (val === "") {
        val = returnNull ? null : String(min);
      }

      if (val !== "") {
        const num = Number(val);
        if (min !== undefined && num < min) val = String(min);
        if (max !== undefined && num > max) val = String(max);
      }
    }

    onChange({ target: { name, value: val, type: e.target.type } });
  };

  return <input name={name} type={type} value={value} onChange={handleChange} className={className} min={min} max={max} />;
}
