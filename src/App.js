import "./Components/WordList";
import Navbar from "./Components/Navbar";
import "./App.css";
import Footer from "./Components/Footer";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./Search";
import Login from "./Login";
import Signup from "./Signup";
import { createContext, useEffect, useReducer, useState } from "react";
import Profile from "./Profile";

export const AuthContext = createContext();

const initialState =
  localStorage.getItem("user") != null
    ? {
        isAuthenticated: true,
        username: JSON.parse(localStorage.getItem("user")).username,
        token: JSON.parse(localStorage.getItem("user")).access_token,
      }
    : {
        isAuthenticated: false,
        username: null,
        token: null,
      };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "user",
        JSON.stringify({
          access_token: action.payload.token,
          username: action.payload.user,
        })
      );
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        token: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <BrowserRouter>
        <div className="page">
          <Navbar />
          <Routes>
            <Route path="/bahnar/monolingual-dictionary" element={<Home />} />
            <Route path="/bahnar/monolingual-dictionary/search" element={<Search />} />
            <Route path="/bahnar/monolingual-dictionary/login" element={<Login />} />
            <Route path="/bahnar/monolingual-dictionary/signup" element={<Signup />} />
            <Route path="/bahnar/monolingual-dictionary/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
