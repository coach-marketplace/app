import React from "react";
import PropTypes from "prop-types";

import { Container } from "./style";
import MessageCard from "../message-card/MessageCard";

const MessageContainer = ({ messages, currentUser }) => {
  return (
    <Container>
      {messages.map((message) => {
        return (
          <MessageCard
            key={message._id}
            messageText={message.text}
            date={message.createdAt}
            isReceiver={message.user === currentUser._id}
          />
        );
      })}
    </Container>
  );
};

MessageContainer.propTypes = {
  currentUser: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      text: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ).isRequired,
};

MessageContainer.defaultProps = {
  messages: [],
};

export default MessageContainer;
