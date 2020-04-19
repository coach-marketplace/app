import React, { Component } from "react";
import { connect } from "react-redux";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
// import Title from "../../components/ui/typography/Title";
import ConversationsContainer from "../../components/chat/conversations-container/ConversationsContainer";
import { retrieveAll as retrieveConversations } from "../../store/modules/conversation/actions";

class ConversationPage extends Component {
  componentDidMount() {
    const { conversations, fetchConversations } = this.props;

    !conversations.length && fetchConversations();
  }

  render() {
    const { isFetchConversationsLoading, conversations } = this.props;
    return (
      <Layout
        header={<Header />}
        main={
          <>
            {/* <ConversationsContainer
              isLoading={isFetchConversationsLoading}
              conversations={conversations}
            /> */}
          </>
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  // conversation: state.conversation.list,
  // isFetchConversationsLoading: state.conversation.actions.getAll.loading,
  // isFetchConversationsSuccess: state.conversation.actions.getAll.success,
  // isFetchConversationsError: state.conversation.actions.getAll.error,
});

const mapDispatchToProps = (dispatch) => ({
  // fetchConversations: () => dispatch(retrieveConversations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationPage);
