import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../../components/layout/main-page-layout/MainPageLayout'
import Header from '../../components/layout/header/Header'
import Chat from '../../components/chat/Chat'
import { retrieveOne as retrieveConversation } from '../../store/modules/conversation/actions'
import { retrieveAllConversationMessages } from '../../store/modules/message/actions'

class ConversationPage extends Component {
  state = {
    areMessagesLoaded: false,
  }

  componentDidMount() {
    const {
      match: {
        params: { id: conversationId },
      },
      fetchConversation,
      getConversation,
      fetchConversationMessages,
    } = this.props
    const { areMessagesLoaded } = this.state

    !getConversation(conversationId) && fetchConversation(conversationId)
    getConversation(conversationId) &&
      !areMessagesLoaded &&
      fetchConversationMessages(conversationId)
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id: conversationId },
      },
      getConversation,
      fetchConversationMessages,
    } = this.props

    if (
      !prevProps.getConversation(conversationId) &&
      getConversation(conversationId)
    ) {
      fetchConversationMessages(conversationId)
    }
  }

  render() {
    const {
      match: {
        params: { id: conversationId },
      },
      getConversation,
      getConversationMessages,
    } = this.props

    return (
      <Layout
        header={<Header />}
        main={
          <Chat
            conversation={getConversation(conversationId)}
            messages={getConversationMessages(conversationId)}
          />
        }
      />
    )
  }
}

const mapStateToProps = (state) => ({
  getConversation: (id) => state.conversation.list.find((c) => c._id === id),
  getConversationMessages: (conversationId) =>
    state.message.listByConversationId[conversationId],
})

const mapDispatchToProps = (dispatch) => ({
  fetchConversation: (conversationId) =>
    dispatch(retrieveConversation(conversationId)),
  fetchConversationMessages: (conversationId) =>
    dispatch(retrieveAllConversationMessages(conversationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConversationPage)
