import React, { Component } from "react";
import { connect } from "react-redux";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import Chat from "../../components/chat/Chat";
import { retrieveOne as retrieveConversation } from "../../store/modules/conversation/actions";

class ConversationPage extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id: conversationId },
      },
      fetchConversation,
      getConversation,
    } = this.props;

    !getConversation(conversationId) && fetchConversation(conversationId);
  }

  componentDidUpdate() {
    console.log("ConversationPage updated");
  }

  render() {
    const {
      match: {
        params: { id: conversationId },
      },
      getConversation,
    } = this.props;

    const conversation = getConversation(conversationId);

    return (
      <Layout header={<Header />} main={<Chat conversation={conversation} />} />
    );
  }
}

const mapStateToProps = (state) => ({
  getConversation: (id) => state.conversation.list.find((c) => c._id === id),
});

const mapDispatchToProps = (dispatch) => ({
  fetchConversation: (conversationId) =>
    dispatch(retrieveConversation(conversationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationPage);
