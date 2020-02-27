import React from "react";
import { Menu } from "evergreen-ui";

const AuthMenu = props => {
  return (
    <Menu>
      <Menu.Group>
        <Menu.Item>Account</Menu.Item>
        <Menu.Item>Setting</Menu.Item>
      </Menu.Group>
      <Menu.Divider />
      <Menu.Group>
        <Menu.Item intent="danger">Logout</Menu.Item>
      </Menu.Group>
    </Menu>
  );
};

export default AuthMenu;

AuthMenu.displayName = "AuthMenu";
