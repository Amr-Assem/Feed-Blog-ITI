import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input, { InputDisplay } from "../../components/Input";

export default function Profile() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const navigate = useNavigate();
  const { updateEmail, updatePassword, currentUser, logout } = useAuth();

  // Handle Update
  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return;
    }

    const promises = [];
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setUpdateMode(false);
        setLoading(false);
      });
  }
  /* -------------------------------------------------------------------------- */

  // Handle Logout
  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {}
  }
  /* -------------------------------------------------------------------------- */

  // console.log(currentUser);

  return (
    <>
      <form
        className="flex flex-col max-w-sm mx-auto my-2 p-8 bg-white border border-gray-200 rounded-3xl shadow"
        onSubmit={handleSubmit}
      >
        {/* Form Header */}
        <h2 className="text-center text-2xl mb-2 font-medium tracking-tight text-gray-900">
          Your Profile
        </h2>

        {/* Name Input */}
        {updateMode ? (
          <Input
            type="text"
            title="Your name"
            id="name"
            defaultValue={currentUser.displayName}
            ref={nameRef}
          />
        ) : (
          <InputDisplay title="Your name" info={currentUser.displayName} />
        )}

        {/* Email Input */}
        {updateMode ? (
          <Input
            type="email"
            title="Your email"
            id="email"
            defaultValue={currentUser.email}
            ref={emailRef}
          />
        ) : (
          <InputDisplay title="Your email" info={currentUser.email} />
        )}

        {/* Password Input */}
        {updateMode ? (
          <>
            <Input
              type="password"
              title="Your password"
              id="password"
              placeholder="Enter password to confirm changes"
              ref={passwordRef}
            />

            <Input
              type="password"
              title="Confirm your password"
              id="passwordConfirm"
              placeholder="Enter password to confirm changes"
              ref={passwordConfirmRef}
            />
          </>
        ) : null}

        {/* Error Message */}
        {error && <Error message={error} />}

        {/* Submit --> Update Profile */}
        {updateMode ? (
          <button
            type="submit"
            className="mt-6 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={loading}
          >
            Save Updates
          </button>
        ) : (
          <button
            className="mt-6 mb-4 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={() => {
              setUpdateMode(true);
            }}
          >
            Update Profile
          </button>
        )}

        {/* Logout */}
        <div className="mx-auto">
          {updateMode ? (
            <button
              className=" text-red-700 hover:text-red-800"
              onClick={() => {
                setUpdateMode(false);
              }}
            >
              Cancel Edit
            </button>
          ) : (
            <button
              className=" text-red-700 hover:text-red-800"
              onClick={handleLogout}
            >
              Log Out
            </button>
          )}
        </div>
      </form>
    </>
  );
}
