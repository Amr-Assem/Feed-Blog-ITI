import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="error">
      <img src="" />
      <div className="errorText">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>Sorry, we couldn’t find the page you’re looking for.</p>
        <div>
          <br />
          <Link to="/">
            <span
              aria-hidden="true"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              ← Back to home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
