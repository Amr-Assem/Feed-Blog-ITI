import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Input from "../../components/Input";

export default function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  // Handle Password Reset
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setError("A reset link has been sent to your email. Check your inbox.");
    } catch (error) {
      setError("An error has occured. Make sure the email is registered");
    }

    setLoading(false);
  }
  /* -------------------------------------------------------------------------- */

  return (
    <form
      className="flex flex-col max-w-sm mx-auto my-2 p-8 bg-white border border-gray-200 rounded-3xl shadow"
      onSubmit={handleSubmit}
    >
      {/* Form Header */}
      <h2 className="text-center text-2xl mb-2 font-medium tracking-tight text-gray-900">
        Reset Password
      </h2>

      {/* Email Input */}
      <Input
        type="email"
        title="Email"
        id="email"
        placeholder="example@mail.com"
        ref={emailRef}
      />

      {/* Error Message */}
      {error && <Error message={error} />}

      {/* Submit --> Reset Password */}
      <button
        type="submit"
        className="mt-6 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        disabled={loading}
      >
        Send Reset Link
      </button>

      {/* Create an Account */}
      <div className="mx-auto">
        New User?{" "}
        <Link className="text-blue-700 hover:text-blue-800" to="/signup">
          Create an account
        </Link>
      </div>
    </form>
  );
}
