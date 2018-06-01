import React from "react";
import "./Grocerytron.css"

const Grocerytron = ({ children }) => (
  <div style={{ height: 300, clear: "both" }} className="grocerytron">
    {children}
  </div>
);

export default Grocerytron;
