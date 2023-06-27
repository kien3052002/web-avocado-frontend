import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    navigate("/login");
  };

  return (
    <div className="auth">
      <form>
        <div>REGISTER</div>
        <div className="form-container">
          <input
            required
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
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
          <button onClick={handleSubmit}>Register</button>
          {err && <p>{err}</p>}
          <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
