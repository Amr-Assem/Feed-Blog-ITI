import React, { forwardRef } from "react";

const Input = forwardRef(({ type, title, id, placeholder, defaultValue }, ref) => {
  return (
    <div className="mt-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {title}
      </label>

      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        ref={ref}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
});

export function InputDisplay({ title, info }) {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {title}
      </label>
      <div
        className="bg-gray-50 border border-gray-300
            text-gray-900 text-sm rounded-lg block w-full p-2.5"
      >
        {info}
      </div>
    </>
  );
}

export default Input;
