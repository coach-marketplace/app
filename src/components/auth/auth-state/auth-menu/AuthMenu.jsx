import React from "react";
import { Menu } from "evergreen-ui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthMenu = ({ logout }) => {
  return (
    <Menu>
      <Menu.Group>
        <Link to="/account/profile">
          <Menu.Item>Account</Menu.Item>
        </Link>
      </Menu.Group>
      <Menu.Divider />
      <Menu.Group>
        <Menu.Item intent="danger" onSelect={() => logout()}>
          Logout
        </Menu.Item>
      </Menu.Group>
    </Menu>
  );
};

AuthMenu.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default AuthMenu;
