import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  ChatContainer,
  ChatHeader,
  ChatMessagesContainer,
  ChatForm,
} from "./style.js";
import Text from "../ui/text/Text";
import Spinner from "../ui/loader/Spinner";
import Input from "../ui/form/input/Input";
import Button from "../ui/button/Button";
import { retrieveAllConversationMessages } from "../../store/modules/message/actions";
import Conversation from "../../services/domains/Conversation";

/**
 * The chat is represented by a Channel who represent the conversation itself,
 * and conversation is the conversation data from the DB
 */
const Chat = ({
  conversation,
  getMessages,
  user,
  fetchConversationMessages,
}) => {
  const [channel, setChannel] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!conversation) {
      return;
    }
    // TODO: Fetch messages at the beginning
    !channel && setChannel(new Conversation(conversation));

    const msgs = getMessages(conversation._id);
    if (!msgs || !msgs.length) {
      // fetchConversationMessages(channel._id);
      console.log(channel);
      return;
    }
    console.log("has message?", !!msgs.length);

    setMessages(msgs);
  }, [channel, conversation, fetchConversationMessages, getMessages]);

  if (!channel) {
    return <Spinner />;
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <Text>{channel.getParticipantsNames(user._id)}</Text>
      </ChatHeader>
      <ChatMessagesContainer>
        {!conversation ? "loading..." : conversation._id}
        {messages && JSON.stringify(messages)}
      </ChatMessagesContainer>
      <ChatForm
        onSubmit={(event) => {
          event.preventDefault();
          console.log("tok", message);
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
  getMessages: (conversationId) =>
    state.message.listByConversationId[conversationId],
});

const mapDispatchToProps = (dispatch) => ({
  fetchConversationMessages: (conversationId) =>
    dispatch(retrieveAllConversationMessages(conversationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
