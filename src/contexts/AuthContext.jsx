import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurentUser] = useState();
  const [loading, setLoading] = useState(true);
  // set loading to true by default, until Firebase verifies that there is a user

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function signup(email, password, displayName) {
    return auth.createUserWithEmailAndPassword(email, password).then(() => {
      updateProfile(auth.currentUser, { displayName: displayName });
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
