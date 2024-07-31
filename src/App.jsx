import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Navbar from "./components/Navbar";
import NotFound from "./pages/error/NotFound";
import PrivateRoute from "./helpers/PrivateRoute";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Profile from "./pages/auth/Profile";
import ForgotPassword from "./pages/auth/ForgotPassword";

import Home from "./pages/Home";
import Article from "./pages/Article";
import ArticleUpdate from "./pages/ArticleUpdate";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <br />
        <br />
        <br />
        <Routes>
          <Route path="*" element={<NotFound />} />

          {/* ------ Account Routes: Login -> SignUp -> ForgotPassword -> Profile ------ */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* ----------- Main Routes: Home -> Article --> Update --> Delete -----------  */}
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route
            path="/article-update"
            element={
              <PrivateRoute>
                <ArticleUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path="/article-update/:id"
            element={
              <PrivateRoute>
                <ArticleUpdate />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
