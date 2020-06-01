import React, { Component } from "react";
import { connect } from "react-redux";

import { Section } from "./style";
import { Title, Text, Pane, Image } from "../../ui";
import ChangePasswordForm from "../../profile/password-form/PasswordForm";
import { User } from "../../../services/domains/User";
import { USER_ACCOUNT_TYPE } from "../../../helper/constants";
import googleIcon from "../../../assets/images/icons/icon-google.png";

class SecuritySection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: new User(props.user),
    };
  }

  renderLocalAccountSection = () => {
    const { user } = this.state;
    const hasLocalAccount = user.accounts.find(
      (account) => account.type === USER_ACCOUNT_TYPE.LOCAL
    );

    return (
      <Section>
        <Title h={2} size={600}>
          Login
        </Title>
        {hasLocalAccount ? (
          <ChangePasswordForm />
        ) : (
          <Text>No local account</Text>
        )}
      </Section>
    );
  };

  renderSocialAccountSection = () => {
    const { user } = this.state;
    const hasGoogleAccount = user.accounts.find(
      (account) => account.type === USER_ACCOUNT_TYPE.GOOGLE
    );

    return (
      <Section withBorderTop>
        <Title h={2} size={600}>
          Social accounts
        </Title>
        <Pane display="flex">
          <Image
            src={googleIcon}
            alt="Google icon"
            width="20px"
            style={{ marginRight: "5px" }}
          />
          <Text>Google</Text>
        </Pane>
        <Text size={300} marginTop={10}>
          {hasGoogleAccount ? "Connected" : "Not connected"}
        </Text>
      </Section>
    );
  };

  render() {
    return (
      <>
        <Title>Your accounts</Title>
        {this.renderLocalAccountSection()}
        {this.renderSocialAccountSection()}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.current,
});

export default connect(mapStateToProps)(SecuritySection);
