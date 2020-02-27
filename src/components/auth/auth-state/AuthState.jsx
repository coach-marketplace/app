import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Popover, Position, Button } from "evergreen-ui";

import Avatar from "../../ui/avatar/Avatar";
import AuthMenu from "./auth-menu/AuthMenu";

const Container = styled.div`
  display: flex;
`;

const AuthState = props => {
  const { authUser } = props;

  let content;

  if (props.authUser) {
    content = (
      <Popover position={Position.TOP_RIGHT} content={AuthMenu}>
        <Button appearance="minimal" height={48} iconAfter="caret-down">
          <Avatar name={`${authUser.first_name} ${authUser.last_name}`} />
        </Button>
      </Popover>
    );
  } else {
    content = <Link to="/login">Login</Link>;
  }

  return <Container className="auth-state">{content}</Container>;
};

const mapStateToProps = state => {
  return {
    authUser: state.auth.authUser
  };
};

export default connect(mapStateToProps)(AuthState);
