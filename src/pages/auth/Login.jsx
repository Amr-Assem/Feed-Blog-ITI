import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Error from "../../components/Error";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle Login
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Something went wrong. Make sure you create an account first");
    }

    setLoading(false);
  }
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <form
        className="flex flex-col max-w-sm mx-auto my-2 p-8 bg-white border border-gray-200 rounded-3xl shadow"
        onSubmit={handleSubmit}
      >
        {/* Form Header */}
        <h2 className="text-center text-2xl mb-2 font-medium tracking-tight text-gray-900">
          Login
        </h2>
        {/* Email Input */}
        <Input
          type="email"
          title="Email"
          id="email"
          placeholder="example@mail.com"
          ref={emailRef}
        />
        {/* Password Input */}
        <Input
          type="password"
          title="Password"
          id="password"
          placeholder="************"
          ref={passwordRef}
        />
        {/* Forgot Password? */}
        <Link
          className="mt-2 text-red-700 hover:text-red-800"
          to="/forgot-password"
        >
          Forgot Password?
        </Link>
        {/* Error Message */}
        {error && <Error message={error} />}

        {/* Submit --> Login */}
        <button
          type="submit"
          className="mt-6 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          disabled={loading}
        >
          Login
        </button>
        {/* Create an Account */}
        <div className="mx-auto">
          New User?{" "}
          <Link className="text-blue-700 hover:text-blue-800" to="/signup">
            Create an account
          </Link>
        </div>
      </form>
    </>
  );
}
