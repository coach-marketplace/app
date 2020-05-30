import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Text, Pane } from "../../ui";
import Conversation from "../../../services/domains/Conversation";

const ConversationCard = ({ conversation, onClick, user }) => {
  const [conv, setConv] = useState(null);

  useEffect(() => {
    !conv && setConv(new Conversation(conversation));
  }, [conv, conversation]);

  return (
    <Pane
      elevation={1}
      hoverElevation={2}
      display="flex"
      justifyContent="flexStart"
      alignItems="center"
      padding={20}
      marginTop={10}
      onClick={onClick}
      background="white"
    >
      <Text>{conv && conv.getParticipantsNames(user._id)}</Text>
    </Pane>
  );
};

ConversationCard.propTypes = {
  conversation: PropTypes.object,
  onClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user.current,
});

export default connect(mapStateToProps)(ConversationCard);
