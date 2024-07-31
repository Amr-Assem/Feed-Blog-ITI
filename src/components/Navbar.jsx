import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="flex flex-row items-center justify-between mx-auto p-4">
        <span className="self-center text-xl font-semibold whitespace-nowrap">
          <Link
            to="/"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
            aria-current="page"
          >
            Home
          </Link>
        </span>
        {currentUser ? (
          <div className="flex order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link
              to="/profile"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Profile
            </Link>
          </div>
        ) : (
          <div className="flex order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link
              to="/login"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
