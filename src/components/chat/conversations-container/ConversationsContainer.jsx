import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import ConversationCard from "../conversation-card/ConversationCard";

class ConversationsContainer extends Component {
  static propTypes = {
    conversations: PropTypes.array,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    conversations: [],
    isLoading: false,
  };

  goToConversationPage = (id) => {
    const { history } = this.props;
    history.push(`/conversation/${id}`);
  };

  render() {
    const { conversations } = this.props;

    return (
      <div>
        {conversations.map((conversation) => (
          <ConversationCard
            key={conversation._id}
            conversation={conversation}
            onClick={() => this.goToConversationPage(conversation._id)}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(ConversationsContainer);
