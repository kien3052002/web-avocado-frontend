import React from "react";

const Error = ({ err, msg }) => {
  return (
    <div className="error">
      <h1>{err}</h1>
      <p>{msg}</p>
    </div>
  );
};

export default Error;
