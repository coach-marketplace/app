import React from "react";
import { Menu } from "evergreen-ui";
import PropTypes from "prop-types";

const AuthMenu = ({ logout }) => {
  return (
    <Menu>
      <Menu.Group>
        <Menu.Item>Account</Menu.Item>
        <Menu.Item>Setting</Menu.Item>
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

AuthMenu.displayName = "AuthMenu";

AuthMenu.propTypes = {
  logout: PropTypes.func.isRequired
};

export default AuthMenu;
