import React from "react";
import PropTypes from "prop-types";

import { MessageContainer, MessageWrapper } from "./style";
import Text from "../../ui/text/Text";

const MessageCard = ({ messageText, date, isReceiver }) => {
  /**
   * isLeft should be true if is not the receiver
   */
  return (
    <MessageContainer isLeft={!isReceiver}>
      <MessageWrapper isLeft={!isReceiver}>
        <Text>{messageText}</Text>
      </MessageWrapper>
    </MessageContainer>
  );
};

MessageCard.propTypes = {
  messageText: PropTypes.string.isRequired,
};

MessageCard.defaultProps = {};

export default MessageCard;
