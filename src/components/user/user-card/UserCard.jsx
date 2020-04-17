import React from "react";
import PropTypes from "prop-types";

import Pane from "../../ui/pane/Pane";
import Text from "../../ui/text/Text";
import Avatar from "../../ui/avatar/Avatar";

const UserCard = ({ email, onClick, firstName, lastName, avatarUrl }) => {
  return (
    <Pane
      elevation={1}
      width={200}
      display="flex"
      alignItems="center"
      flexDirection="column"
      padding={20}
      margin={10}
      onClick={onClick}
    >
      <Avatar name={`${firstName} ${lastName}`} src={avatarUrl} />
      <Text marginTop={25}>{email}</Text>
    </Pane>
  );
};

UserCard.propTypes = {
  email: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  fistName: PropTypes.string,
  lastName: PropTypes.string,
  onClick: PropTypes.func,
};

UserCard.defaultProps = {
  firstName: "?",
  lastName: "",
  avatarUrl: "",
};

export default UserCard;
