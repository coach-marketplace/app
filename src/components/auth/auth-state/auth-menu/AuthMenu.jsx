import React from "react";
import { Menu } from "evergreen-ui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AuthMenu = ({ logout, user }) => {
  return (
    <Menu>
      <Menu.Group title={user.email}>
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

const mapStateToProps = (state) => ({
  user: state.user.current,
});

export default connect(mapStateToProps)(AuthMenu);
