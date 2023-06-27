import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = { ...login(inputs) };
    if (data.err == null) navigate(data.nav);
    else setErr(data.err);
  };

  return (
    <div className="auth">
      <form>
        <div>LOGIN</div>
        <div className="form-container">
          <input
            required
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Login</button>
          {err && <p>{err}</p>}
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
