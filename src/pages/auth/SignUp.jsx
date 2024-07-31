import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";

export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Handle Sign Up
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      navigate("/");
    } catch (error) {
      setError("Account could not be created. Please try again later.");
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
        Create an account
      </h2>

      {/* Name Input */}
      <Input
        type="text"
        title="Your name"
        id="name"
        placeholder="Hamada Doe"
        ref={nameRef}
      />

      {/* Email Input */}
      <Input
        type="email"
        title="Your email"
        id="email"
        placeholder="example@mail.com"
        ref={emailRef}
      />

      {/* Password Input */}
      <Input
        type="password"
        title="Your password"
        id="password"
        placeholder="************"
        ref={passwordRef}
      />

      {/* Password Confirm Input */}
      <Input
        type="password"
        title="Confirm your password"
        id="passwordConfirm"
        placeholder="************"
        ref={passwordConfirmRef}
      />

      {/* Error Message */}
      {error && <Error message={error} />}
      
      {/* Submit --> Sign up */}
      <button
        type="submit"
        className="mt-6 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        disabled={loading}
      >
        Sign Up
      </button>

      {/* Login */}
      <div className="mx-auto">
        Already have an account?{" "}
        <Link className=" text-blue-700 hover:text-blue-800" to="/login">
          Login
        </Link>
      </div>
    </form>
  );
}
