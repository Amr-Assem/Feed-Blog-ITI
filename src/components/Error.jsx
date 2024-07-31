import React from "react";

export default function Error({ message }) {
  return (
    <div
      class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      {message}
    </div>
  );
}
