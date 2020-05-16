import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  ChatContainer,
  ChatHeader,
  ChatForm,
  ChatMessagesContainer,
  InputWrapper,
} from "./style.js";
import MessagesContainer from "./messages-container/MessageContainer";
import { Text, Spinner, Input, Button, Avatar } from "../ui";
import { postMessage } from "../../store/modules/message/actions";
import Conversation from "../../services/domains/Conversation";

/**
 * The chat is represented by a Channel who represent the conversation itself,
 * and conversation is the conversation data from the DB
 */
const Chat = ({ conversation, messages, user, postMessage }) => {
  const [channel, setChannel] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!conversation) return;

    !channel && setChannel(new Conversation(conversation));
  }, [conversation, channel]);

  if (!channel) return <Spinner />;

  return (
    <ChatContainer>
      <ChatHeader>
        {channel.getParticipantsNamesArray(user._id).map((name, index) => (
          <Avatar key={index} name={name} size={32} />
        ))}
        <Text marginLeft={10}>{channel.getParticipantsNames(user._id)}</Text>
      </ChatHeader>
      <ChatMessagesContainer>
        <MessagesContainer currentUser={user} messages={messages} />
      </ChatMessagesContainer>
      <ChatForm
        onSubmit={(event) => {
          event.preventDefault();
          postMessage(
            channel._id,
            {
              text: message,
            },
            () => setMessage("")
          );
        }}
      >
        <InputWrapper>
          <Input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={`Send a message`}
          />
        </InputWrapper>
        <Button appearance="minimal">Send</Button>
      </ChatForm>
    </ChatContainer>
  );
};

Chat.propTypes = {
  conversation: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  user: state.user.current,
});

const mapDispatchToProps = (dispatch) => ({
  postMessage: (conversationId, data, callback) =>
    dispatch(postMessage(conversationId, data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
