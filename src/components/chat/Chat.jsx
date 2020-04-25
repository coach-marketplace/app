import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ChatContainer, ChatHeader, ChatForm } from "./style.js";
import MessagesContainer from "./messages-container/MessageContainer";
import Text from "../ui/text/Text";
import Spinner from "../ui/loader/Spinner";
import Input from "../ui/form/input/Input";
import Button from "../ui/button/Button";
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
    if (!conversation) {
      return;
    }

    !channel && setChannel(new Conversation(conversation));
  }, [conversation, channel]);

  if (!channel) {
    return <Spinner />;
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <Text>{channel.getParticipantsNames(user._id)}</Text>
      </ChatHeader>
      <MessagesContainer currentUser={user} messages={messages} />
      <ChatForm
        onSubmit={(event) => {
          event.preventDefault();
          postMessage(channel.getId(), {
            text: message,
          });
        }}
      >
        <Input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button>Send</Button>
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
  postMessage: (conversationId, data) =>
    dispatch(postMessage(conversationId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
