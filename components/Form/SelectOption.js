import React from "react";

export default function SelectOption({
  label,
  value,
  onChange,
  optionsLabel,
  optionsValue,
  isRequired,
}) {
  return (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <select
        required={isRequired}
        name={value}
        onChange={(e) => {
          onChange(e);
        }}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      >
        <option value="" selected>
          {optionsLabel}
        </option>
        {optionsValue.data.map((option) => {
          return (
            <option value={option.attributes.nama}>
              {option.attributes.nama}
            </option>
          );
        })}
      </select>
    </div>
  );
}
