import React from "react";
import PropTypes from "prop-types";

import Pane from "../../ui/pane/Pane";
import Text from "../../ui/text/Text";

const ConversationCard = ({ message, onClick, participantNames }) => {
  return (
    <Pane
      elevation={1}
      display="flex"
      justifyContent="flexStart"
      alignItems="center"
      padding={20}
      marginTop={10}
      onClick={onClick}
    >
      <Text>{message}</Text>
    </Pane>
  );
};

ConversationCard.propTypes = {
  message: PropTypes.string.isRequired,
  participantNames: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isRead: PropTypes.bool,
  onClick: PropTypes.func,
};

ConversationCard.defaultProps = {
  isRead: false,
};

export default ConversationCard;
