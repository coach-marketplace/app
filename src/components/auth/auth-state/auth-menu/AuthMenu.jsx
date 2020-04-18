import React from "react";
import { Menu } from "evergreen-ui";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const AuthMenu = ({ logout }) => {
  const history = useHistory();

  return (
    <Menu>
      <Menu.Group>
        <Menu.Item onSelect={() => history.push("account/profile")}>
          Account
        </Menu.Item>
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
  logout: PropTypes.func.isRequired,
};

export default AuthMenu;
