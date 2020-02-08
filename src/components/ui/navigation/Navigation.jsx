import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <ul className="navigation">
      <li>
        <Link to="/customers">Customers</Link>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
};

export default Navigation;
