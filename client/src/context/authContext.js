import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { users } from "../data.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (inputs) => {
    var user = null;
    users.map((u) => {
      if (u.username == inputs.username) {
        user = { ...u };
        return 0;
      }
    });
    if (user == null) {
      return { err: "User not found", nav: null };
    } else if (user.password != inputs.password) {
      return { err: "Wrong password", nav: null };
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      setCurrUser(user);
      return { err: null, nav: "/" };
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    setCurrUser(null);
  };

  return (
    <AuthContext.Provider value={{ currUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
