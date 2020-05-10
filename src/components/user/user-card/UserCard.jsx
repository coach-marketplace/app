import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Pane, Text, Avatar, Button } from "../../ui";
import { User } from "../../../services/domains/User";

const UserCard = ({ userData, onClick, onMessageClick }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    userData && setUser(new User(userData));
  }, [userData]);

  return (
    <Pane
      elevation={1}
      hoverElevation={2}
      width="100%"
      display="flex"
      alignContent="center"
      padding={20}
      margin={10}
      onClick={onClick}
      background="white"
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
