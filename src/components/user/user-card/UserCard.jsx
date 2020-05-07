import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Pane from "../../ui/pane/Pane";
import Text from "../../ui/text/Text";
import Avatar from "../../ui/avatar/Avatar";
import Button from "../../ui/button/Button";
import { User } from "../../../services/domains/User";

const UserCard = ({ userData, onClick, onMessageClick }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // console.log("useEffect", userData);
    userData && setUser(new User(userData));
  }, [userData]);

  return (
    <Pane
      elevation={1}
      width="100%"
      display="flex"
      alignContent="center"
      padding={20}
      margin={10}
      onClick={onClick}
    >
      <Avatar name={user.fullName} src={user.avatar} />
      <Pane display="flex" flexDirection="column" flexGrow="1" paddingLeft={20}>
        <Text>{user.fullName}</Text>
        <Text size={300}>{user.email}</Text>
      </Pane>
      <Button onClick={onMessageClick} appearance="minimal">
        Message
      </Button>
    </Pane>
  );
};

UserCard.propTypes = {
  userData: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onMessageClick: PropTypes.func,
};

export default UserCard;
